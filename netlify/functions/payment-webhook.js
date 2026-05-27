/**
 * NETLIFY FUNCTION — Lemon Squeezy Payment Webhook
 * Handles subscription created/updated events
 * Triggered by: Lemon Squeezy webhook (production only)
 * Actions: Create member record, send welcome email, grant access
 */

const crypto = require('crypto');
const fetch = require('node-fetch');

// Verify Lemon Squeezy webhook signature
function verifyWebhookSignature(body, signature) {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret) return false;

  const hash = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('hex');

  return hash === signature;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    // Verify webhook signature
    const signature = event.headers['x-signature'] || event.headers['x-webhook-signature'];
    const body = event.body;

    if (!verifyWebhookSignature(body, signature)) {
      console.error('Invalid webhook signature');
      return { statusCode: 401, body: 'Unauthorized' };
    }

    const payload = JSON.parse(body);
    const { data, meta } = payload;

    // Handle subscription.created and subscription.updated events
    if (!['subscription.created', 'subscription.updated'].includes(meta.event_name)) {
      return { statusCode: 200, body: 'Event ignored' };
    }

    const subscription = data.attributes;
    const customData = subscription.custom_data || {};
    const email = subscription.customer_email;
    const status = subscription.status;

    console.log(`📧 Webhook: ${meta.event_name} | ${email} | ${status}`);

    // Only process active subscriptions
    if (status !== 'active' && status !== 'on_trial') {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Subscription not active' })
      };
    }

    // Get Supabase credentials
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;
    const convertKitApiKey = process.env.CONVERTKIT_API_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error('Supabase not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Database not configured' })
      };
    }

    // 1️⃣ Create/update member in Supabase
    const memberPayload = {
      email,
      plan: subscription.product_name.toLowerCase().includes('annual') ? 'annual' : 'monthly',
      lemon_squeezy_id: data.id,
      status: status === 'on_trial' ? 'trial' : 'active',
      started_at: subscription.created_at,
      expires_at: subscription.ends_at,
      custom_data: customData
    };

    const memberResponse = await fetch(`${supabaseUrl}/rest/v1/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(memberPayload)
    });

    if (!memberResponse.ok) {
      const error = await memberResponse.text();
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create member record' })
      };
    }

    console.log(`✅ Member created/updated: ${email}`);

    // 2️⃣ Send welcome email via ConvertKit (tag with membership)
    if (convertKitApiKey) {
      try {
        await fetch(`https://api.convertkit.com/v3/subscribers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            api_key: convertKitApiKey,
            tags: ['livestoically_member'],
            fields: {
              plan: memberPayload.plan
            }
          })
        });
        console.log(`📬 Welcome email queued: ${email}`);
      } catch (err) {
        console.error('ConvertKit error:', err.message);
        // Don't fail webhook if email service fails
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Webhook processed'
      })
    };

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
