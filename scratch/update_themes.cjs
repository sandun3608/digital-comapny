const fs = require('fs');
const path = require('path');

const servicesDir = 'c:\\Users\\etsy dream\\Desktop\\new2\\services';
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(servicesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add theme.js if not already there
    if (!content.includes('/src/theme.js')) {
        content = content.replace('</head>', '    <script src="/src/theme.js"></script>\n  </head>');
    }
    
    // Replace the back-btn with the themed version
    const oldBackBtn = '<a href="/index.html" class="back-btn"><i data-lucide="arrow-left"></i> BACK TO HOME</a>';
    const newBackBtn = `    <div style="position: fixed; top: 2.5rem; left: 5%; z-index: 1001; display: flex; gap: 1rem;">
      <a href="/index.html" class="back-btn" style="position: relative; top: 0; left: 0;"><i data-lucide="arrow-left"></i> BACK TO HOME</a>
      <button class="theme-toggle" aria-label="Toggle Theme">
        <i data-lucide="sun"></i>
      </button>
    </div>`;
    
    if (content.includes(oldBackBtn)) {
        content = content.replace(oldBackBtn, newBackBtn);
        fs.writeFileSync(filePath, content);
        console.log(`Updated: ${file}`);
    } else {
        console.log(`Skipped (or already updated): ${file}`);
    }
});
