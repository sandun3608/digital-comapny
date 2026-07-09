const fs = require('fs');
const path = require('path');

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    const originalContent = content;

    content = content.replace(/\.\.\/index\.html#awards/g, '../index.html#services');
    content = content.replace(/"#awards"/g, '"#services"');
    
    // Some pages might just have "#awards" as href
    content = content.replace(/href="#awards"/g, 'href="#services"');
    content = content.replace(/href="\.\.\/index\.html#awards"/g, 'href="../index.html#services"');
    
    if (content !== originalContent) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Updated ${filepath}`);
    }
}

const servicesDir = path.join(__dirname, 'services');
const files = fs.readdirSync(servicesDir)
                .filter(f => f.endsWith('.html'))
                .map(f => path.join(servicesDir, f));

files.push(path.join(__dirname, 'index.html'));

files.forEach(processFile);
