import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PillarCard } from '@/components/PillarCard';
import { getPillars } from '@/lib/api';

export default function PillarsPage() {
  const [pillars, setPillars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPillars = async () => {
      try {
        const response = await getPillars();
        setPillars(Array.isArray(response) ? response : response.data);
      } catch (error) {
        console.error('Error fetching pillars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPillars();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container-calm">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
              The 9 Pillars
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              A complete framework for Stoic living. Each pillar addresses a 
              different aspect of the human experience—together, they form 
              the foundation for inner stability.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="pb-20 md:pb-28" data-testid="pillars-grid">
        <div className="container-calm">
          {loading ? (
            <div className="pillar-grid">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="pillar-card">
                  <div className="w-8 h-8 rounded-full skeleton mb-6 mx-auto" />
                  <div className="h-6 skeleton w-3/4 mx-auto mb-3" />
                  <div className="h-4 skeleton w-full mb-2" />
                  <div className="h-4 skeleton w-2/3 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="pillar-grid">
              {pillars.map((pillar) => (
                <PillarCard key={pillar.id} pillar={pillar} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 md:py-28 border-t border-stone-200 bg-stone-50">
        <div className="container-calm">
          <div className="prose-container">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-8">
              How to approach the pillars
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                <strong className="text-stone-900">Start where you hurt.</strong> If 
                you're struggling with relationships, begin there. If work feels 
                meaningless, explore that pillar first. The system meets you 
                where you are.
              </p>
              <p>
                <strong className="text-stone-900">Go slowly.</strong> These aren't 
                productivity tips to check off. Each pillar contains ideas that 
                might take months or years to fully integrate. Read once, 
                then return.
              </p>
              <p>
                <strong className="text-stone-900">Practice, don't just read.</strong> Philosophy 
                that stays in the head helps no one. Each pillar includes 
                practical applications. Use them.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
