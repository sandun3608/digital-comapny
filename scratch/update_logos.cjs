const fs = require('fs');
const path = require('path');

// Helper to replace text in a file
function updateFile(filePath, updater) {
  if (!fs.existsSync(filePath)) return;
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = updater(original, filePath);
  if (original !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated logos in: ${filePath}`);
  }
}

// 1. Root HTML files
const rootFiles = ['index.html', 'contact.html', 'dashboard.html'];
rootFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  updateFile(filePath, (content, fp) => {
    // A. Favicon check/update
    // Replace existing favicon link tag if it exists
    if (content.includes('rel="icon"')) {
      content = content.replace(/<link\s+rel="icon"[^>]*>/g, '<link rel="icon" type="image/png" href="logo/3.png" />');
    } else {
      // Add favicon link before </head>
      content = content.replace('</head>', '    <link rel="icon" type="image/png" href="logo/3.png" />\n  </head>');
    }

    // B. Navbar logo check/update
    // Target logo links like: <a href="..." class="logo" style="...">MYLAB.LK</a>
    // We want to insert the image inside.
    const logoRegex = /(<a\s+[^>]*class="logo"[^>]*>)\s*MYLAB\.LK\s*(<\/a>)/g;
    content = content.replace(logoRegex, (match, openingTag, closingTag) => {
      // Modify styling to flex alignment
      let modifiedOpening = openingTag;
      if (!modifiedOpening.includes('display:')) {
        modifiedOpening = modifiedOpening.replace('style="', 'style="display: flex; align-items: center; gap: 8px; ');
      }
      return `${modifiedOpening}<img src="logo/3.png" alt="Logo" style="height: 32px; width: auto; border-radius: 4px; object-fit: contain;">MYLAB.LK${closingTag}`;
    });

    // For dashboard admin logo
    content = content.replace(/<div\s+class="logo">\s*MYLAB\.LK\s*<\/div>/g, 
      '<div class="logo" style="display: flex; align-items: center; gap: 8px;"><img src="logo/3.png" alt="Logo" style="height: 32px; width: auto; border-radius: 4px; object-fit: contain;">MYLAB.LK</div>'
    );

    // For dashboard auth logo
    content = content.replace(/<div\s+class="auth-logo">\s*MYLAB\.LK\s*<\/div>/g, 
      '<div class="auth-logo" style="display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 2.2rem;"><img src="logo/3.png" alt="Logo" style="height: 40px; width: auto; border-radius: 4px; object-fit: contain;">MYLAB.LK</div>'
    );

    // C. Footer logo check/update
    content = content.replace(/<div\s+class="footer-logo-area">\s*(<!--.*?-->)?\s*<h2>\s*MYLAB\.LK\s*<\/h2>\s*<\/div>/g, 
      '<div class="footer-logo-area" style="display: flex; align-items: center; gap: 10px;"><img src="logo/3.png" alt="Logo" style="height: 40px; width: auto; border-radius: 4px; object-fit: contain;"><h2 style="margin: 0;">MYLAB.LK</h2></div>'
    );

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
      // A. Favicon check/update (using relative path ../logo/3.png)
      if (content.includes('rel="icon"')) {
        content = content.replace(/<link\s+rel="icon"[^>]*>/g, '<link rel="icon" type="image/png" href="../logo/3.png" />');
      } else {
        content = content.replace('</head>', '    <link rel="icon" type="image/png" href="../logo/3.png" />\n  </head>');
      }

      // B. Navbar logo check/update
      const logoRegex = /(<a\s+[^>]*class="logo"[^>]*>)\s*MYLAB\.LK\s*(<\/a>)/g;
      content = content.replace(logoRegex, (match, openingTag, closingTag) => {
        let modifiedOpening = openingTag;
        if (!modifiedOpening.includes('display:')) {
          modifiedOpening = modifiedOpening.replace('style="', 'style="display: flex; align-items: center; gap: 8px; ');
        }
        return `${modifiedOpening}<img src="../logo/3.png" alt="Logo" style="height: 32px; width: auto; border-radius: 4px; object-fit: contain;">MYLAB.LK${closingTag}`;
      });

      // C. Footer logo check/update
      content = content.replace(/<div\s+class="footer-logo-area">\s*(<!--.*?-->)?\s*<h2>\s*MYLAB\.LK\s*<\/h2>\s*<\/div>/g, 
        '<div class="footer-logo-area" style="display: flex; align-items: center; gap: 10px;"><img src="../logo/3.png" alt="Logo" style="height: 40px; width: auto; border-radius: 4px; object-fit: contain;"><h2 style="margin: 0;">MYLAB.LK</h2></div>'
      );

      return content;
    });
  });
}
