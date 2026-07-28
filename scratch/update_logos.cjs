const fs = require('fs');
const path = require('path');

// Helper to replace text in a file
function updateFile(filePath, updater) {
  if (!fs.existsSync(filePath)) return;
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = updater(original, filePath);
  if (original !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated favicon in: ${filePath}`);
  }
}

// 1. Root HTML files
const rootFiles = ['index.html', 'contact.html', 'dashboard.html'];
rootFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  updateFile(filePath, (content, fp) => {
    // A. Favicon check/update (point to favicon.png)
    if (content.includes('rel="icon"')) {
      content = content.replace(/<link\s+rel="icon"[^>]*>/g, '<link rel="icon" type="image/png" href="favicon.png" />');
    } else {
      content = content.replace('</head>', '    <link rel="icon" type="image/png" href="favicon.png" />\n  </head>');
    }
    return content;
  });
});

// 2. Services files
const servicesDir = path.join(__dirname, '..', 'services');
if (fs.existsSync(servicesDir)) {
  const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(servicesDir, file);
    updateFile(filePath, (content) => {
      // A. Favicon check/update (point to ../favicon.png)
      if (content.includes('rel="icon"')) {
        content = content.replace(/<link\s+rel="icon"[^>]*>/g, '<link rel="icon" type="image/png" href="../favicon.png" />');
      } else {
        content = content.replace('</head>', '    <link rel="icon" type="image/png" href="../favicon.png" />\n  </head>');
      }
      return content;
    });
  });
}
