import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="bg-cream border-b border-border sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-display text-2xl font-bold text-forest">
            Livestoically
          </Link>

          <ul className="flex gap-6">
            <li><Link to="/articles" className="hover:text-forest transition">Articles</Link></li>
            <li><Link to="/membership" className="hover:text-forest transition">Membership</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
