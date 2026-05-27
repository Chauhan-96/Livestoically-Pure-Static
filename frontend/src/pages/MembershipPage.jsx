export default function MembershipPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold mb-4">Membership</h1>
        <p className="text-xl text-muted">Access exclusive content and join our community</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        <div className="border border-border rounded-lg p-8">
          <h3 className="font-display text-2xl font-bold mb-2">Monthly</h3>
          <p className="text-4xl font-bold text-forest mb-4">$12<span className="text-lg">/mo</span></p>
          <button className="w-full px-6 py-3 bg-forest text-cream rounded-lg hover:bg-opacity-90 transition">
            Subscribe Monthly
          </button>
        </div>

        <div className="border border-forest rounded-lg p-8 bg-cream">
          <h3 className="font-display text-2xl font-bold mb-2">Annual</h3>
          <p className="text-4xl font-bold text-forest mb-4">$99<span className="text-lg">/yr</span></p>
          <button className="w-full px-6 py-3 bg-forest text-cream rounded-lg hover:bg-opacity-90 transition">
            Subscribe Annually
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-bold">FAQ</h2>
        <div>
          <h3 className="font-bold mb-2">Can I cancel anytime?</h3>
          <p>Yes, cancel your subscription anytime with no questions asked.</p>
        </div>
      </div>
    </div>
  )
}
