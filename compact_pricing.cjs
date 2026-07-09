const fs = require('fs');
const path = 'services/social-media.html';
let content = fs.readFileSync(path, 'utf-8');

// Reduce card padding
content = content.replace('padding: 3rem 2.5rem;', 'padding: 1.8rem 1.5rem;');

// Reduce grid gap
content = content.replace('gap: 2rem;\n          max-width: 1200px;', 'gap: 1.2rem;\n          max-width: 1100px;');

// Reduce popular card scaling
content = content.replace('transform: scale(1.05);', 'transform: scale(1.03);');
content = content.replace('transform: scale(1.05) translateY(-10px);', 'transform: scale(1.03) translateY(-8px);');
content = content.replace('transform: translateY(-10px);', 'transform: translateY(-8px);');

// Reduce badge size
content = content.replace('font-size: 0.7rem;\n          font-weight: 800;\n          padding: 0.4rem 3rem;', 'font-size: 0.6rem;\n          font-weight: 800;\n          padding: 0.3rem 2.5rem;');
content = content.replace('top: 1.5rem;\n          right: -2.5rem;', 'top: 1.2rem;\n          right: -2.2rem;');

// Reduce pricing name font
content = content.replace('font-size: 1.3rem;\n          font-weight: 700;\n          margin-bottom: 0.5rem;', 'font-size: 1.1rem;\n          font-weight: 700;\n          margin-bottom: 0.3rem;');

// Reduce price font and margin
content = content.replace('font-size: 2.8rem;\n          font-weight: 800;\n          color: #fff;\n          margin-bottom: 2.5rem;', 'font-size: 2.2rem;\n          font-weight: 800;\n          color: #fff;\n          margin-bottom: 1.5rem;');
content = content.replace('font-size: 1.5rem;\n          color: var(--accent);', 'font-size: 1.2rem;\n          color: var(--accent);');
content = content.replace('font-size: 1rem;\n          color: rgba(255,255,255,0.4);', 'font-size: 0.85rem;\n          color: rgba(255,255,255,0.4);');

// Reduce feature list fonts and margins
content = content.replace('margin: 0 0 2.5rem 0;', 'margin: 0 0 1.5rem 0;');
content = content.replace('font-size: 0.95rem;\n          margin-bottom: 1.2rem;', 'font-size: 0.85rem;\n          margin-bottom: 0.8rem;');
content = content.replace('gap: 12px;', 'gap: 8px;');
content = content.replace('width: 18px;\n          height: 18px;\n          flex-shrink: 0;\n          margin-top: 2px;', 'width: 16px;\n          height: 16px;\n          flex-shrink: 0;\n          margin-top: 2px;');

// Reduce button padding
content = content.replace('padding: 1.2rem;\n          border-radius: 14px;', 'padding: 0.9rem;\n          border-radius: 10px;');

// Reduce section padding slightly
content = content.replace('padding: 6rem 4%;\n          background: var(--bg);', 'padding: 4rem 4%;\n          background: var(--bg);');
content = content.replace('margin-bottom: 4.5rem;', 'margin-bottom: 3rem;');

// Re-write file
fs.writeFileSync(path, content, 'utf-8');
console.log('Successfully made pricing cards compact.');
