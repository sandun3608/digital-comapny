const fs = require('fs');
const path = 'services/uiux-design.html';
let content = fs.readFileSync(path, 'utf-8');

// The Lucide 'figma' icon is not rendering (likely unavailable in this library version).
// Replacing it with 'pen-tool'.
content = content.replace('<i data-lucide="figma"></i>', '<i data-lucide="pen-tool"></i>');

fs.writeFileSync(path, content, 'utf-8');
console.log('Fixed empty icon');
