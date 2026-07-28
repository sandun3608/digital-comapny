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
    // A. Favicon check/update (keep favicon as is)
    if (content.includes('rel="icon"')) {
      content = content.replace(/<link\s+rel="icon"[^>]*>/g, '<link rel="icon" type="image/png" href="logo/3.png" />');
    }

    // B. Navbar logo: Remove the image, use text with span for .LK
    // We match the tag we modified previously or the original tag
    // Match either <a class="logo">...</a> or similar
    const logoRegex = /<a\s+([^>]*class="logo"[^>]*>)([\s\S]*?)<\/a>/g;
    content = content.replace(logoRegex, (match, attributes, innerContent) => {
      // Clean up inline style we added (keep the original clean style or attributes)
      let cleanedAttributes = attributes.replace(/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*\d+px;\s*/g, 'style="');
      return `<a ${cleanedAttributes}MYLAB<span>.LK</span></a>`;
    });

    // Dashboard header logo
    content = content.replace(/<div\s+class="logo"[^>]*>([\s\S]*?)<\/div>/g, 
      '<div class="logo">MYLAB<span>.LK</span></div>'
    );

    // Dashboard auth logo
    content = content.replace(/<div\s+class="auth-logo"[^>]*>([\s\S]*?)<\/div>/g, 
      '<div class="auth-logo">MYLAB<span>.LK</span></div>'
    );

    // C. Footer logo: Remove image, use text with span for .LK
    content = content.replace(/<div\s+class="footer-logo-area"[^>]*>([\s\S]*?)<\/div>/g, 
      '<div class="footer-logo-area"><h2>MYLAB<span>.LK</span></h2></div>'
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
      // A. Favicon check/update (keep favicon)
      if (content.includes('rel="icon"')) {
        content = content.replace(/<link\s+rel="icon"[^>]*>/g, '<link rel="icon" type="image/png" href="../logo/3.png" />');
      }

      // B. Navbar logo
      const logoRegex = /<a\s+([^>]*class="logo"[^>]*>)([\s\S]*?)<\/a>/g;
      content = content.replace(logoRegex, (match, attributes, innerContent) => {
        let cleanedAttributes = attributes.replace(/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*\d+px;\s*/g, 'style="');
        return `<a ${cleanedAttributes}MYLAB<span>.LK</span></a>`;
      });

      // C. Footer logo
      content = content.replace(/<div\s+class="footer-logo-area"[^>]*>([\s\S]*?)<\/div>/g, 
        '<div class="footer-logo-area"><h2>MYLAB<span>.LK</span></h2></div>'
      );

      return content;
    });
  });
}
