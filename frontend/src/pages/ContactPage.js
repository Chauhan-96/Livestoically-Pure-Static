import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Mail, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('success');
    // In a real app, you'd send this to your backend
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container-calm">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
              Contact
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Have a question, feedback, or just want to say hello?&nbsp;
              We read every message.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-20 md:pb-28">
        <div className="container-calm">
          <div className="max-w-xl">
            {status === 'success' ? (
              <div className="p-8 bg-stone-50 rounded-sm text-center">
                <Mail size={32} className="text-stone-500 mx-auto mb-4" />
                <h2 className="font-serif text-xl text-stone-900 mb-2">
                  Message received
                </h2>
                <p className="text-stone-600">
                  Thank you for reaching out. We'll respond when we can.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors"
                    placeholder="Your name"
                    required
                    data-testid="contact-name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors"
                    placeholder="you@example.com"
                    required
                    data-testid="contact-email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors resize-none"
                    placeholder="What's on your mind?"
                    required
                    data-testid="contact-message"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-4 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors"
                  data-testid="contact-submit"
                >
                  Send Message
                  <Send size={16} className="ml-2" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-16 md:py-20 border-t border-stone-200 bg-stone-50">
        <div className="container-calm">
          <div className="max-w-xl">
            <h2 className="font-serif text-xl text-stone-900 mb-4">
              Prefer email?
            </h2>
            <p className="text-stone-600">
              You can reach us directly at{' '}
              <a 
                href="mailto:hello@livestoically.com" 
                className="text-stone-900 hover:underline"
              >
                hello@livestoically.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
