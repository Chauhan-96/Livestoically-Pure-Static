import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-stone-200 bg-[#FDFBF7]">
      <div className="container-calm py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="font-serif text-xl text-stone-900">
              LiveStoically
            </Link>
            <p className="mt-4 text-stone-500 text-sm leading-relaxed max-w-sm">
              A calm, premium platform for modern Stoicism. 
              Building inner stability through practical philosophy.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium text-stone-900 mb-4">Navigate</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/start-here" className="footer-link text-sm">
                  Start Here
                </Link>
              </li>
              <li>
                <Link to="/pillars" className="footer-link text-sm">
                  The 9 Pillars
                </Link>
              </li>
              <li>
                <Link to="/articles" className="footer-link text-sm">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium text-stone-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="footer-link text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-stone-200">
          <p className="text-stone-400 text-sm">
            © {new Date().getFullYear()} LiveStoically. Clarity over comfort.
          </p>
        </div>
      </div>
    </footer>
  );
};
