const fs = require('fs');
const path = 'services/mobile-app.html';
let content = fs.readFileSync(path, 'utf-8');

content = content.replace('../a6/1.png', '../mobileapp/1.png');
content = content.replace('../a6/2.png', '../mobileapp/11.png');
content = content.replace('../a6/3.png', '../mobileapp/12.png');
content = content.replace('../a6/4.png', '../mobileapp/13.png');
content = content.replace('../a6/5.png', '../mobileapp/14.png');

fs.writeFileSync(path, content, 'utf-8');
console.log('Successfully updated mobile app icons.');
