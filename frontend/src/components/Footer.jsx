import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-12 mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-lg mb-4">Livestoically</h3>
            <p className="text-sm text-gray-300">Stoic philosophy for overthinkers.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Pages</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-forest transition">Home</Link></li>
              <li><Link to="/articles" className="hover:text-forest transition">Articles</Link></li>
              <li><Link to="/membership" className="hover:text-forest transition">Membership</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-forest transition">Privacy</a></li>
              <li><a href="#" className="hover:text-forest transition">Terms</a></li>
              <li><a href="#" className="hover:text-forest transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2026 Livestoically. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
