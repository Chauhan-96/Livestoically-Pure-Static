import { useState } from 'react';
import { subscribe } from '@/lib/api';
import { ArrowRight, Check } from 'lucide-react';

export const NewsletterForm = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await subscribe(email);
      setStatus('success');
      setMessage('Thank you. You\'ll hear from us.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center space-x-2 text-stone-600">
        <Check size={18} className="text-green-600" />
        <span className="text-sm">{message}</span>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 bg-transparent border-b border-stone-300 focus:border-stone-900 py-2 text-sm outline-none transition-colors placeholder:text-stone-400"
          data-testid="newsletter-email-input"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="ml-3 p-2 text-stone-600 hover:text-stone-900 transition-colors disabled:opacity-50"
          data-testid="newsletter-submit-btn"
        >
          <ArrowRight size={18} />
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 bg-white border border-stone-200 rounded-sm text-sm focus:border-stone-400 outline-none transition-colors"
          data-testid="newsletter-email-input"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors disabled:opacity-50"
          data-testid="newsletter-submit-btn"
        >
          {status === 'loading' ? 'Joining...' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-2 text-red-600 text-sm">{message}</p>
      )}
      <p className="mt-3 text-stone-400 text-xs">
        No spam. Unsubscribe anytime. We respect your inbox.
      </p>
    </form>
  );
};
