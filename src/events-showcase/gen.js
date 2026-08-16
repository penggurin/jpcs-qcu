const fs = require('fs');
const path = require('path');

const colors = [
  ['#6b1a1a','#c9a84c'],['#1a3a6b','#c9a84c'],['#1a6b3a','#e8c45a'],['#4a1a6b','#c9a84c'],
  ['#6b4a1a','#e8c45a'],['#1a5a6b','#c9a84c'],['#6b1a4a','#e8c45a'],['#3a6b1a','#c9a84c'],
  ['#6b3a1a','#e8c45a'],['#1a1a6b','#c9a84c'],['#6b6b1a','#e8c45a'],['#1a6b6b','#c9a84c'],
  ['#5a1a1a','#e8c45a'],['#1a4a5a','#c9a84c'],['#2a1a6b','#e8c45a'],['#6b1a2a','#c9a84c'],
  ['#1a6b2a','#e8c45a'],['#6b2a1a','#c9a84c'],['#1a2a6b','#e8c45a'],['#4a6b1a','#c9a84c'],
  ['#6b1a5a','#e8c45a'],['#1a5a3a','#c9a84c'],['#5a3a1a','#e8c45a'],['#1a3a5a','#c9a84c'],
  ['#3a1a6b','#e8c45a'],['#6b5a1a','#c9a84c'],['#1a6b5a','#e8c45a'],['#5a1a6b','#c9a84c'],
  ['#6b2a4a','#e8c45a'],['#2a6b1a','#c9a84c'],['#1a2a4a','#e8c45a'],['#4a2a1a','#c9a84c'],
];

for (let i = 0; i < 32; i++) {
  const n = i + 1;
  const [bg, ac] = colors[i];
  const label = `EVENT ${String(n).padStart(2,'0')}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480">
  <rect width="480" height="480" fill="${bg}"/>
  <defs>
    <radialGradient id="g${n}" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="${ac}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="480" height="480" fill="url(#g${n})"/>
  <line x1="0" y1="120" x2="480" y2="120" stroke="${ac}" stroke-opacity="0.08" stroke-width="1"/>
  <line x1="0" y1="240" x2="480" y2="240" stroke="${ac}" stroke-opacity="0.08" stroke-width="1"/>
  <line x1="0" y1="360" x2="480" y2="360" stroke="${ac}" stroke-opacity="0.08" stroke-width="1"/>
  <line x1="120" y1="0" x2="120" y2="480" stroke="${ac}" stroke-opacity="0.08" stroke-width="1"/>
  <line x1="240" y1="0" x2="240" y2="480" stroke="${ac}" stroke-opacity="0.08" stroke-width="1"/>
  <line x1="360" y1="0" x2="360" y2="480" stroke="${ac}" stroke-opacity="0.08" stroke-width="1"/>
  <polyline points="24,24 24,72 72,72" fill="none" stroke="${ac}" stroke-width="3" stroke-opacity="0.6"/>
  <polyline points="456,24 456,72 408,72" fill="none" stroke="${ac}" stroke-width="3" stroke-opacity="0.6"/>
  <polyline points="24,456 24,408 72,408" fill="none" stroke="${ac}" stroke-width="3" stroke-opacity="0.6"/>
  <polyline points="456,456 456,408 408,408" fill="none" stroke="${ac}" stroke-width="3" stroke-opacity="0.6"/>
  <circle cx="240" cy="200" r="66" fill="none" stroke="${ac}" stroke-opacity="0.3" stroke-width="2"/>
  <circle cx="240" cy="200" r="48" fill="${ac}" fill-opacity="0.1"/>
  <text x="240" y="208" font-family="monospace" font-size="26" font-weight="bold" fill="${ac}" text-anchor="middle" opacity="0.85">JPCS-QCU</text>
  <rect x="110" y="290" width="260" height="52" rx="7" fill="${ac}" fill-opacity="0.14"/>
  <rect x="110" y="290" width="260" height="52" rx="7" fill="none" stroke="${ac}" stroke-opacity="0.4" stroke-width="1"/>
  <text x="240" y="322" font-family="monospace" font-size="20" font-weight="bold" fill="${ac}" text-anchor="middle">${label}</text>
  <text x="30" y="466" font-family="monospace" font-size="12" fill="${ac}" fill-opacity="0.35">#${String(n).padStart(2,'0')}</text>
</svg>`;
  fs.writeFileSync(path.join(__dirname, `event-${n}.svg`), svg, 'utf8');
}
console.log('Done: 32 clean SVGs written');
