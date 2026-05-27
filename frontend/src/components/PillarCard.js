import { Link } from 'react-router-dom';
import { getPillarIcon } from '@/lib/icons';

export const PillarCard = ({ pillar, compact = false }) => {
  const Icon = getPillarIcon(pillar.icon);

  if (compact) {
    return (
      <Link 
        to={`/pillars/${pillar.slug}`}
        className="flex items-center space-x-3 p-4 border border-stone-200 rounded-sm hover:border-stone-300 hover:bg-white transition-all duration-300"
        data-testid={`pillar-compact-${pillar.slug}`}
      >
        <Icon size={20} className="text-stone-600" strokeWidth={1.5} />
        <span className="text-sm font-medium text-stone-700">{pillar.name}</span>
      </Link>
    );
  }

  return (
    <Link 
      to={`/pillars/${pillar.slug}`}
      className="pillar-card group"
      data-testid={`pillar-card-${pillar.slug}`}
    >
      <div className="mb-6">
        <Icon 
          size={32} 
          className="text-stone-500 group-hover:text-stone-700 transition-colors duration-300" 
          strokeWidth={1.5} 
        />
      </div>
      <h3 className="font-serif text-xl text-stone-900 mb-3">
        {pillar.name}
      </h3>
      <p className="text-stone-500 text-sm leading-relaxed">
        {pillar.description}
      </p>
    </Link>
  );
};
