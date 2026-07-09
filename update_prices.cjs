const fs = require('fs');
const path = 'services/social-media.html';
let content = fs.readFileSync(path, 'utf-8');

// Replace prices
content = content.replace('<span class="currency">Rs</span> 15,000', '<span class="currency">Rs</span> 30,000');
content = content.replace('<span class="currency">Rs</span> 25,000', '<span class="currency">Rs</span> 45,000');
content = content.replace('<span class="currency">Rs</span> 40,000', '<span class="currency">Rs</span> 60,000');

fs.writeFileSync(path, content, 'utf-8');
console.log('Successfully updated prices.');
