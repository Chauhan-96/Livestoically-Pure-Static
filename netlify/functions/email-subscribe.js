/**
 * NETLIFY FUNCTION — Email Subscribe
 * Handles email signup → ConvertKit integration
 * Triggered by: frontend email signup form
 * Returns: success/error response
 */

const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, pillar } = JSON.parse(event.body);

    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    // Get ConvertKit API key from environment
    const convertKitApiKey = process.env.CONVERTKIT_API_KEY;
    const convertKitFormId = process.env.VITE_CONVERTKIT_FORM_ID;

    if (!convertKitApiKey || !convertKitFormId) {
      console.error('ConvertKit credentials missing');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Email service not configured' })
      };
    }

    // Subscribe to ConvertKit form
    const response = await fetch(`https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        api_key: convertKitApiKey,
        tags: [pillar || 'general'].map(tag => tag.replace(/[^a-z0-9_]/g, '_').toLowerCase()),
        // Store pillar preference in first_name for segmentation
        first_name: `[${pillar || 'general'}]`
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('ConvertKit error:', result);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Failed to subscribe' })
      };
    }

    // Log successful subscription
    console.log(`✅ New subscriber: ${email} (pillar: ${pillar})`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Check your email for the welcome guide!'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

  } catch (error) {
    console.error('Email subscribe error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error: ' + error.message })
    };
  }
};
