import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

// Pages
import HomePage from './pages/HomePage'
import ArticlesPage from './pages/ArticlesPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import PillarPage from './pages/PillarPage'
import MembershipPage from './pages/MembershipPage'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-cream text-charcoal font-body">
        <Navigation />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticleDetailPage />} />
            <Route path="/pillars/:slug" element={<PillarPage />} />
            <Route path="/membership" element={<MembershipPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}
