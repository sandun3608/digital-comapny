const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'services/branding-design.html',
  'services/mobile-app.html',
  'services/post-design.html',
  'services/seo-optimization.html',
  'services/social-media.html',
  'services/uiux-design.html',
  'services/video-editing.html',
  'services/video-presenting.html',
  'services/web-dev.html'
];

files.forEach(file => {
  const filePath = path.resolve(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Change any version of theme.js script tags to use absolute path /theme.js (which Vite leaves unbundled and serving from public root)
    content = content.replace(/<script type="module" src="(\.\/|\.\.\/)theme\.js"><\/script>/g, '<script src="/theme.js"></script>');
    content = content.replace(/<script src="(\.\/|\.\.\/)theme\.js"><\/script>/g, '<script src="/theme.js"></script>');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated theme.js path in ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
