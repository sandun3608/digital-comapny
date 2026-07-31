const fs = require('fs');
const path = require('path');

const servicesDir = 'services';
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(servicesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Backgrounds
  content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.01\)/g, 'background: var(--glass)');
  content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.015\)/g, 'background: var(--glass)');
  content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.02\)/g, 'background: var(--glass)');
  content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.025\)/g, 'background: var(--glass)');
  
  // Borders
  content = content.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.04\)/g, 'border: 1px solid var(--border)');
  content = content.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.05\)/g, 'border: 1px solid var(--border)');
  content = content.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.06\)/g, 'border: 1px solid var(--border)');
  content = content.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.07\)/g, 'border: 1px solid var(--border)');
  content = content.replace(/border-color:\s*rgba\(255,\s*255,\s*255,\s*0\.08\)/g, 'border-color: var(--border)');
  content = content.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.08\)/g, 'border: 1px solid var(--border)');
  
  // Text Colors
  content = content.replace(/color:\s*#fff;/g, 'color: var(--text-primary);');
  content = content.replace(/color:\s*#ffffff;/g, 'color: var(--text-primary);');
  content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.45\);/g, 'color: var(--text-secondary);');
  content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.42\);/g, 'color: var(--text-secondary);');
  content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.6\);/g, 'color: var(--text-secondary);');
  content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.65\);/g, 'color: var(--text-secondary);');
  content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.7\);/g, 'color: var(--text-secondary);');
  content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.75\);/g, 'color: var(--text-primary);');
  content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.9\);/g, 'color: var(--text-primary);');
  
  // Shadows
  content = content.replace(/box-shadow:\s*0\s*15px\s*35px\s*rgba\(0,\s*0,\s*0,\s*0\.3\)/g, 'box-shadow: var(--card-shadow)');
  content = content.replace(/box-shadow:\s*0\s*16px\s*40px\s*rgba\(139,\s*92,\s*246,\s*0\.12\),\s*0\s*4px\s*12px\s*rgba\(0,\s*0,\s*0,\s*0\.4\)/g, 'box-shadow: var(--card-shadow)');
  content = content.replace(/box-shadow:\s*0\s*12px\s*25px\s*rgba\(0,\s*0,\s*0,\s*0\.3\),\s*0\s*0\s*15px\s*rgba\(139,\s*92,\s*246,\s*0\.1\)/g, 'box-shadow: var(--card-shadow)');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated theme variables inside ${file}`);
});
