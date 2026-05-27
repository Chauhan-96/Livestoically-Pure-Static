import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ArticlesPage() {
  const [selectedPillar, setSelectedPillar] = useState(null)

  const pillars = ['how-you-think', 'control-letting-go', 'self-discipline', 'work-purpose', 'your-emotions', 'people-connection', 'resilience-adversity', 'happiness-meaning', 'death-impermanence']

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-4xl font-bold mb-8">All Articles</h1>

      {/* Filters */}
      <div className="mb-8">
        <h2 className="font-bold mb-4">Filter by Pillar</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedPillar(null)}
            className={`px-4 py-2 rounded-lg border transition ${
              selectedPillar === null
                ? 'bg-forest text-cream border-forest'
                : 'border-border hover:border-forest'
            }`}
          >
            All
          </button>
          {pillars.map(pillar => (
            <button
              key={pillar}
              onClick={() => setSelectedPillar(pillar)}
              className={`px-4 py-2 rounded-lg border transition capitalize ${
                selectedPillar === pillar
                  ? 'bg-forest text-cream border-forest'
                  : 'border-border hover:border-forest'
              }`}
            >
              {pillar.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="font-display text-xl font-bold mb-2">Article Placeholder</h3>
          <p className="text-muted mb-4">Articles will appear here once published</p>
          <Link to="#" className="text-forest font-bold hover:underline">Read more →</Link>
        </div>
      </div>
    </div>
  )
}
