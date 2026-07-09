const fs = require('fs');
const path = 'services/uiux-design.html';
let content = fs.readFileSync(path, 'utf-8');

// The broken tags look like: <img src="../uiux/.png?v=1783549261823" alt="Tech Icon 1"
// I will replace them one by one.
const v = Date.now();
content = content.replace(/<img src="\.\.\/uiux\/\.png\?v=\d+" alt="Tech Icon 1"/, '<img src="../uiux/6.png?v=' + v + '" alt="Tech Icon 1"');
content = content.replace(/<img src="\.\.\/uiux\/\.png\?v=\d+" alt="Tech Icon 2"/, '<img src="../uiux/7.png?v=' + v + '" alt="Tech Icon 2"');
content = content.replace(/<img src="\.\.\/uiux\/\.png\?v=\d+" alt="Tech Icon 3"/, '<img src="../uiux/8.png?v=' + v + '" alt="Tech Icon 3"');
content = content.replace(/<img src="\.\.\/uiux\/\.png\?v=\d+" alt="Tech Icon 4"/, '<img src="../uiux/9.png?v=' + v + '" alt="Tech Icon 4"');
content = content.replace(/<img src="\.\.\/uiux\/\.png\?v=\d+" alt="Tech Icon 5"/, '<img src="../uiux/10.png?v=' + v + '" alt="Tech Icon 5"');

fs.writeFileSync(path, content, 'utf-8');
console.log('Fixed broken image paths.');
