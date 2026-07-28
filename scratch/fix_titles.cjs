const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, '..', 'services');
if (fs.existsSync(servicesDir)) {
  const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(servicesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Replace the h1 style to make it larger (2.4rem to 4rem)
    content = content.replace(
      /<h1\s+class="service-hero-title"\s+style="font-size:\s*clamp\(1\.4rem,\s*2\.8vw,\s*2\.2rem\);\s*color:\s*#fff;"/g,
      '<h1 class="service-hero-title" style="font-size: clamp(2.4rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 2rem;"'
    );

    // 2. Remove the -webkit-text-fill-color: #fff override from the spans in h1
    // This allows the default gradient to show up beautifully
    content = content.replace(
      /-webkit-text-fill-color:\s*#fff;/g,
      ''
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Title size updated in: ${file}`);
  });
}
