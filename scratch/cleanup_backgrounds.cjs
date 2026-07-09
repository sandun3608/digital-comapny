const fs = require('fs');
const path = require('path');

const servicesDir = 'c:\\Users\\etsy dream\\Desktop\\new2\\services';
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(servicesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace hardcoded backgrounds with variables
    let updated = false;
    if (content.includes('background: #0D0D0D;')) {
        content = content.replace(/background: #0D0D0D;/g, 'background: var(--bg-secondary);');
        updated = true;
    }
    if (content.includes('background: #0B0B0B;')) {
        content = content.replace(/background: #0B0B0B;/g, 'background: var(--bg-secondary);');
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated backgrounds in: ${file}`);
    } else {
        console.log(`No hardcoded backgrounds found in: ${file}`);
    }
});
