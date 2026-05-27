import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, Heart } from 'lucide-react';

export default function StartHerePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container-calm">
          <div className="max-w-2xl">
            <span className="text-sm text-stone-500 uppercase tracking-wide mb-4 block">
              New Here?
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
              Begin here
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              LiveStoically is not a productivity platform. It's not self-help in the 
              modern sense. It's a quiet space for people who want to build inner 
              stability through practical philosophy.
            </p>
          </div>
        </div>
      </section>

      {/* What This Is */}
      <section className="py-16 md:py-24 border-y border-stone-200 bg-stone-50">
        <div className="container-calm">
          <div className="prose-container">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-8">
              What you'll find here
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                <strong className="text-stone-900">Stoicism made practical.</strong> Not ancient 
                quotes taken out of context. Not motivational posters. Real philosophy 
                applied to real problems: relationships, work, anxiety, self-worth, 
                mortality, and the quiet struggle of being human.
              </p>
              <p>
                <strong className="text-stone-900">Calm over chaos.</strong> The internet is loud. 
                Most content is designed to spike your cortisol. LiveStoically is 
                intentionally quiet. We write to steady you, not stimulate you.
              </p>
              <p>
                <strong className="text-stone-900">Depth over breadth.</strong> We'd rather you 
                read one article that changes how you see something than scroll 
                through fifty that disappear by tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Start */}
      <section className="py-20 md:py-28">
        <div className="container-calm">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-12 text-center">
            Where to begin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Option 1 */}
            <Link 
              to="/pillars"
              className="group p-8 border border-stone-200 rounded-sm hover:border-stone-300 hover:bg-white transition-all duration-300"
              data-testid="start-pillars"
            >
              <Compass size={28} className="text-stone-500 mb-4 group-hover:text-stone-700 transition-colors" strokeWidth={1.5} />
              <h3 className="font-serif text-xl text-stone-900 mb-3">
                The 9 Pillars
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                Our complete framework for Stoic living. Each pillar addresses 
                a different aspect of inner work.
              </p>
              <span className="inline-flex items-center text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                Explore pillars
                <ArrowRight size={14} className="ml-1" />
              </span>
            </Link>

            {/* Option 2 */}
            <Link 
              to="/articles"
              className="group p-8 border border-stone-200 rounded-sm hover:border-stone-300 hover:bg-white transition-all duration-300"
              data-testid="start-articles"
            >
              <BookOpen size={28} className="text-stone-500 mb-4 group-hover:text-stone-700 transition-colors" strokeWidth={1.5} />
              <h3 className="font-serif text-xl text-stone-900 mb-3">
                Read Articles
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                Browse our collection of essays on modern Stoic living. 
                Start with whatever speaks to your current situation.
              </p>
              <span className="inline-flex items-center text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                Browse articles
                <ArrowRight size={14} className="ml-1" />
              </span>
            </Link>

            {/* Option 3 */}
            <Link 
              to="/about"
              className="group p-8 border border-stone-200 rounded-sm hover:border-stone-300 hover:bg-white transition-all duration-300"
              data-testid="start-about"
            >
              <Heart size={28} className="text-stone-500 mb-4 group-hover:text-stone-700 transition-colors" strokeWidth={1.5} />
              <h3 className="font-serif text-xl text-stone-900 mb-3">
                Our Philosophy
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                Learn why we built this and what we believe about 
                living well in an overwhelming world.
              </p>
              <span className="inline-flex items-center text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                Read about us
                <ArrowRight size={14} className="ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 md:py-28 bg-stone-50">
        <div className="container-calm">
          <div className="prose-container">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-10">
              What we believe
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-lg text-stone-900 mb-2">
                  Clarity over comfort
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Growth rarely feels good. The truth often stings before it frees. 
                  We prioritize what's real over what's reassuring.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-stone-900 mb-2">
                  Discipline as self-respect
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Self-discipline isn't punishment. It's the daily practice of 
                  taking yourself seriously. Of showing up for your own life.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-stone-900 mb-2">
                  Detachment as maturity
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Letting go isn't giving up. It's the recognition that some things 
                  were never ours to control. This isn't coldness—it's freedom.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-stone-900 mb-2">
                  Calm is a skill
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Inner peace isn't a personality trait you're born with. 
                  It's a practice you build through daily choices and slow accumulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
