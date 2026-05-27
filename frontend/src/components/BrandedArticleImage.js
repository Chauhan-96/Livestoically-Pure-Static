/**
 * BrandedArticleImage - Auto-generates typographic header images
 * Matches Livestoically design system:
 * - No stock photos, faces, or landscapes
 * - Branded typographic only
 * - Uses brand colors + fonts
 */

const PILLAR_COLORS = {
  'self-discipline':           { bg: '#2D3436', accent: '#4A7C59' },
  'emotional-regulation':      { bg: '#34495E', accent: '#6C8EAD' },
  'relationships-boundaries':  { bg: '#4A3728', accent: '#C4956A' },
  'work-purpose':              { bg: '#2C3E50', accent: '#E67E22' },
  'mortality-time':            { bg: '#1C1C1A', accent: '#8E8E8A' },
  'detachment-letting-go':     { bg: '#3D5A4C', accent: '#A8C5B8' },
  'judgment-perception':       { bg: '#3B3152', accent: '#9B85B4' },
  'resilience-adversity':      { bg: '#5D3A1A', accent: '#D4A76A' },
  'inner-peace':               { bg: '#2C4A3E', accent: '#7EB8A2' },
};

const DEFAULT_COLORS = { bg: '#1C1C1A', accent: '#4A7C59' };

function wrapText(text, maxCharsPerLine = 28) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + ' ' + word).trim().length > maxCharsPerLine) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    }
  });
  if (currentLine) lines.push(currentLine.trim());
  return lines.slice(0, 4); // Max 4 lines
}

export const BrandedArticleImage = ({ title, pillarSlug, pillarName, className = '' }) => {
  const colors = PILLAR_COLORS[pillarSlug] || DEFAULT_COLORS;
  const lines = wrapText(title);
  const lineHeight = 52;
  const startY = 315 - ((lines.length - 1) * lineHeight) / 2;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <!-- Background -->
      <rect width="1200" height="630" fill="${colors.bg}"/>

      <!-- Subtle pattern -->
      <line x1="0" y1="0" x2="1200" y2="630" stroke="${colors.accent}" stroke-width="0.3" opacity="0.15"/>
      <line x1="400" y1="0" x2="1200" y2="530" stroke="${colors.accent}" stroke-width="0.3" opacity="0.1"/>
      <line x1="0" y1="100" x2="800" y2="630" stroke="${colors.accent}" stroke-width="0.3" opacity="0.1"/>

      <!-- Accent bar -->
      <rect x="80" y="140" width="4" height="80" fill="${colors.accent}" rx="2"/>

      <!-- Brand name -->
      <text x="100" y="175" font-family="Georgia, 'Times New Roman', serif" font-size="16" fill="${colors.accent}" letter-spacing="3" text-transform="uppercase">LIVESTOICALLY</text>

      <!-- Pillar label -->
      ${pillarName ? `<text x="100" y="205" font-family="Arial, sans-serif" font-size="13" fill="${colors.accent}" opacity="0.7" letter-spacing="1">${pillarName.toUpperCase()}</text>` : ''}

      <!-- Title -->
      ${lines.map((line, i) =>
        `<text x="100" y="${startY + i * lineHeight}" font-family="Georgia, 'Times New Roman', serif" font-size="44" fill="#F7F5F0" font-weight="400" letter-spacing="-0.5">${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>`
      ).join('\n      ')}

      <!-- Bottom line -->
      <line x1="80" y1="560" x2="1120" y2="560" stroke="${colors.accent}" stroke-width="0.5" opacity="0.3"/>
      <text x="100" y="590" font-family="Arial, sans-serif" font-size="12" fill="#F7F5F0" opacity="0.4" letter-spacing="1">livestoically.com</text>
    </svg>
  `.trim();

  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;

  return (
    <div className={`aspect-[16/9] overflow-hidden rounded-sm bg-stone-900 ${className}`}>
      <img
        src={dataUrl}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

/**
 * Generate a data URL for an article image (for saving to DB)
 */
export const generateArticleImageUrl = (title, pillarSlug) => {
  const colors = PILLAR_COLORS[pillarSlug] || DEFAULT_COLORS;
  const lines = wrapText(title);
  const lineHeight = 52;
  const startY = 315 - ((lines.length - 1) * lineHeight) / 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${colors.bg}"/><rect x="80" y="160" width="4" height="60" fill="${colors.accent}" rx="2"/><text x="100" y="195" font-family="Georgia,serif" font-size="16" fill="${colors.accent}" letter-spacing="3">LIVESTOICALLY</text>${lines.map((line, i) => `<text x="100" y="${startY + i * lineHeight}" font-family="Georgia,serif" font-size="44" fill="#F7F5F0">${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>`).join('')}<line x1="80" y1="560" x2="1120" y2="560" stroke="${colors.accent}" stroke-width="0.5" opacity="0.3"/></svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
