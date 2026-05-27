import { Layout } from '@/components/layout/Layout';

export default function PrivacyPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container-calm">
          <div className="prose-container">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-stone-500 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 md:pb-28">
        <div className="container-calm">
          <div className="prose-container space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-4">
                Our approach to privacy
              </h2>
              <p className="text-stone-600 leading-relaxed">
                LiveStoically is built on principles of restraint and respect. 
                This extends to how we handle your data. We collect only what's 
                necessary and never sell your information.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-4">
                What we collect
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  <strong className="text-stone-900">Email addresses:</strong> If you 
                  subscribe to our newsletter, we store your email address to send 
                  you updates. You can unsubscribe at any time.
                </p>
                <p>
                  <strong className="text-stone-900">Contact form submissions:</strong> When 
                  you contact us, we keep your name, email, and message to respond 
                  to your inquiry.
                </p>
                <p>
                  <strong className="text-stone-900">Basic analytics:</strong> We may use 
                  privacy-respecting analytics to understand which content resonates. 
                  This data is aggregated and anonymized.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-4">
                What we don't do
              </h2>
              <ul className="space-y-2 text-stone-600">
                <li>• Sell your data to third parties</li>
                <li>• Use invasive tracking or fingerprinting</li>
                <li>• Send spam or share your email with advertisers</li>
                <li>• Store unnecessary personal information</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-4">
                Cookies
              </h2>
              <p className="text-stone-600 leading-relaxed">
                We use minimal, functional cookies to ensure the website works 
                properly. We don't use advertising cookies or cross-site tracking.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-4">
                Your rights
              </h2>
              <p className="text-stone-600 leading-relaxed">
                You can request access to, correction of, or deletion of your 
                personal data at any time. Contact us at{' '}
                <a 
                  href="mailto:privacy@livestoically.com" 
                  className="text-stone-900 hover:underline"
                >
                  privacy@livestoically.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-4">
                Changes to this policy
              </h2>
              <p className="text-stone-600 leading-relaxed">
                We may update this policy occasionally. Significant changes will 
                be communicated through the website. Your continued use of 
                LiveStoically constitutes acceptance of the current policy.
              </p>
            </div>

            <div className="pt-8 border-t border-stone-200">
              <p className="text-stone-500 text-sm">
                Questions about privacy? Email{' '}
                <a 
                  href="mailto:privacy@livestoically.com" 
                  className="text-stone-700 hover:underline"
                >
                  privacy@livestoically.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
