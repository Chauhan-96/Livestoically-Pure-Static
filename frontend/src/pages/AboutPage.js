import { Layout } from '@/components/layout/Layout';
import { NewsletterForm } from '@/components/NewsletterForm';

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container-calm">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
              About LiveStoically
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              A calm space for building inner stability through practical Stoic philosophy.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 border-y border-stone-200 bg-stone-50">
        <div className="container-calm">
          <div className="prose-container">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-8">
              Why this exists
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                The modern world is loud. Social media optimizes for outrage. 
                News cycles thrive on anxiety. Self-help promises quick fixes 
                that never quite work.
              </p>
              <p>
                LiveStoically exists as a counterweight. A quiet corner of the 
                internet where you can think clearly, read slowly, and build 
                the kind of inner stability that actually lasts.
              </p>
              <p>
                We're not here to motivate you with hype or fix you with hacks. 
                We're here to offer ancient wisdom—tested across millennia—applied 
                thoughtfully to modern struggles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-28">
        <div className="container-calm">
          <div className="prose-container">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-10">
              What we believe
            </h2>
            <div className="space-y-10">
              <div>
                <h3 className="font-serif text-xl text-stone-900 mb-3">
                  Stoicism is practical, not theoretical
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  The Stoics weren't armchair philosophers. Marcus Aurelius ran an 
                  empire. Epictetus was born a slave. Seneca navigated political 
                  intrigue. Their philosophy was forged in real life, for real problems.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-stone-900 mb-3">
                  Calm is cultivated, not found
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Inner peace isn't a destination you arrive at. It's a skill you 
                  practice daily. Through small choices. Through how you respond to 
                  difficulty. Through the stories you tell yourself about what happens.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-stone-900 mb-3">
                  Less is more
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  We'd rather publish one article that changes how you see something 
                  than ten that you forget by tomorrow. Quality over quantity. Depth 
                  over breadth. Slow accumulation over quick consumption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 md:py-28 border-t border-stone-200 bg-stone-50">
        <div className="container-calm">
          <div className="prose-container">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-10">
              How we approach content
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                <strong className="text-stone-900">We write like we're speaking to one person at night.</strong> Not 
                to a crowd. Not to impress. Just honest conversation about 
                what it means to live well when life is hard.
              </p>
              <p>
                <strong className="text-stone-900">We use Stoic philosophy lightly.</strong> You won't find 
                endless quotes or name-dropping of ancient figures. We interpret 
                and apply. The ideas matter more than the attribution.
              </p>
              <p>
                <strong className="text-stone-900">We never tell you what to feel.</strong> Your experience is 
                yours. We offer frameworks and perspectives—what you do with 
                them is up to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 md:py-28">
        <div className="container-calm">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-4">
              Stay grounded
            </h2>
            <p className="text-stone-600 mb-8">
              Receive quiet essays on living with clarity. No spam, no noise.
            </p>
            <div className="flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
