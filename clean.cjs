const fs = require('fs');
const path = require('path');

// 1. Delete services/systems.html if it exists
if (fs.existsSync('services/systems.html')) {
  fs.unlinkSync('services/systems.html');
  console.log('Deleted services/systems.html');
}

// 2. Remove references from all HTML files
function cleanNavLinks(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      cleanNavLinks(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      const filteredLines = lines.filter(line => {
        return !line.includes('href="systems.html"') && !line.includes('href="services/systems.html">Systems Development');
      });
      fs.writeFileSync(fullPath, filteredLines.join('\n'), 'utf-8');
    }
  }
}

cleanNavLinks('.');
console.log('Cleaned nav links in all HTML files');

// 3. Remove specific cards from index.html
let indexContent = fs.readFileSync('index.html', 'utf-8');
const lines = indexContent.split('\n');

let newLines = [];
let skipMode = false;
let skipCardMode = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<!-- Service 5 -->') && lines[i+1].includes('services/systems.html')) {
    skipMode = true;
  }
  if (lines[i].includes('<!-- Service 6 -->')) {
    skipMode = false;
  }
  
  if (lines[i].includes('<!-- Card 4: Systems -->')) {
    skipCardMode = true;
  }
  if (lines[i].includes('<!-- Card 5: UI/UX -->')) {
    skipCardMode = false;
  }
  
  if (!skipMode && !skipCardMode) {
    newLines.push(lines[i]);
  }
}

fs.writeFileSync('index.html', newLines.join('\n'), 'utf-8');
console.log('Cleaned index.html specific sections');
