import { Link } from 'react-router-dom'

export default function HomePage() {
  const pillars = [
    { slug: 'how-you-think', name: 'How You Think', icon: '🧠' },
    { slug: 'control-letting-go', name: 'Control & Letting Go', icon: '⚖️' },
    { slug: 'self-discipline', name: 'Self-Discipline', icon: '💪' },
    { slug: 'work-purpose', name: 'Work & Purpose', icon: '🎯' },
    { slug: 'your-emotions', name: 'Your Emotions', icon: '❤️' },
    { slug: 'people-connection', name: 'People & Connection', icon: '🤝' },
    { slug: 'resilience-adversity', name: 'Resilience & Adversity', icon: '🪨' },
    { slug: 'happiness-meaning', name: 'Happiness & Meaning', icon: '✨' },
    { slug: 'death-impermanence', name: 'Death & Impermanence', icon: '🌙' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-display text-5xl font-bold mb-6 text-charcoal">
          Stoic Philosophy for Overthinkers
        </h1>
        <p className="text-xl text-muted mb-8 leading-relaxed">
          Practical wisdom. Plain English. One concept. One action.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/articles"
            className="px-6 py-3 bg-forest text-cream rounded-lg hover:bg-opacity-90 transition"
          >
            Explore Articles
          </Link>
          <Link
            to="/membership"
            className="px-6 py-3 border border-forest text-forest rounded-lg hover:bg-forest hover:text-cream transition"
          >
            Join Membership
          </Link>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="font-display text-3xl font-bold text-center mb-12">9 Pillars</h2>
        <div className="grid grid-cols-3 gap-6">
          {pillars.map(pillar => (
            <Link
              key={pillar.slug}
              to={`/pillars/${pillar.slug}`}
              className="p-6 border border-border rounded-lg hover:border-forest hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-2">{pillar.icon}</div>
              <h3 className="font-display text-lg font-bold">{pillar.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-charcoal text-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold mb-4">Weekly Wisdom</h2>
          <p className="mb-6 text-gray-300">Get one Stoic article in your inbox every week.</p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded text-charcoal"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-forest text-cream rounded hover:bg-opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
