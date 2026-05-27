import { useState, useEffect } from 'react';

const STOIC_QUOTES = [
  { text: "We suffer more in imagination than in reality.", author: "Seneca" },
  { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
  { text: "It is not things that disturb us, but our judgments about things.", author: "Epictetus" },
  { text: "No person has the power to have everything they want, but it is in their power not to want what they don't have.", author: "Seneca" },
  { text: "The best revenge is not to be like your enemy.", author: "Marcus Aurelius" },
  { text: "Wealth consists not in having great possessions, but in having few wants.", author: "Epictetus" },
  { text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca" },
  { text: "You have power over your mind—not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus" },
  { text: "It is not that we have a short time to live, but that we waste a lot of it.", author: "Seneca" },
  { text: "The soul becomes dyed with the color of its thoughts.", author: "Marcus Aurelius" },
  { text: "Don't explain your philosophy. Embody it.", author: "Epictetus" },
  { text: "Luck is what happens when preparation meets opportunity.", author: "Seneca" },
  { text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.", author: "Marcus Aurelius" },
  { text: "He who laughs at himself never runs out of things to laugh at.", author: "Epictetus" },
  { text: "As is a tale, so is life: not how long it is, but how good it is, is what matters.", author: "Seneca" },
  { text: "The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane.", author: "Marcus Aurelius" },
  { text: "There is only one way to happiness and that is to cease worrying about things which are beyond the power of our will.", author: "Epictetus" },
  { text: "Sometimes even to live is an act of courage.", author: "Seneca" },
  { text: "Accept the things to which fate binds you, and love the people with whom fate brings you together.", author: "Marcus Aurelius" },
  { text: "Man is not worried by real problems so much as by his imagined anxieties about real problems.", author: "Epictetus" },
  { text: "Hang on to your youthful enthusiasms—you'll be able to use them better when you're older.", author: "Seneca" },
  { text: "When you arise in the morning, think of what a precious privilege it is to be alive.", author: "Marcus Aurelius" },
  { text: "No man is free who is not master of himself.", author: "Epictetus" },
  { text: "True happiness is to enjoy the present, without anxious dependence upon the future.", author: "Seneca" },
  { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "If you want to improve, be content to be thought foolish and stupid.", author: "Epictetus" },
  { text: "Difficulties strengthen the mind, as labor does the body.", author: "Seneca" },
  { text: "Never esteem anything as of advantage to you that will make you break your word or lose your self-respect.", author: "Marcus Aurelius" },
  { text: "Make the best use of what is in your power, and take the rest as it happens.", author: "Epictetus" },
  { text: "Life is long if you know how to use it.", author: "Seneca" }
];

// Get a quote based on the day of year (consistent for the whole day)
const getDailyQuote = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return STOIC_QUOTES[dayOfYear % STOIC_QUOTES.length];
};

export const DailyQuote = () => {
  const [quote, setQuote] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setQuote(getDailyQuote());
    // Fade in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!quote) return null;

  return (
    <section className="py-16 md:py-24 border-y border-stone-200" data-testid="daily-quote">
      <div className="container-calm">
        <div className="text-center mb-6">
          <span className="text-xs text-stone-400 uppercase tracking-widest">
            Today's Reflection
          </span>
        </div>
        <blockquote 
          className={`max-w-2xl mx-auto text-center transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="font-serif text-2xl md:text-3xl text-stone-800 leading-relaxed italic">
            &ldquo;{quote.text}&rdquo;
          </p>
          <cite className="block mt-4 text-stone-500 text-sm not-italic">
            &mdash; {quote.author}
          </cite>
        </blockquote>
      </div>
    </section>
  );
};
