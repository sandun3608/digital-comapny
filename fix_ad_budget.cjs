const fs = require('fs');
const path = 'services/social-media.html';
let content = fs.readFileSync(path, 'utf-8');

// The original text pattern
const oldStr = 'Ad Campaign Management<br><span style="font-size:0.8rem; color:rgba(255,255,255,0.4); margin-top:2px;">(Ad Budget Not Included)</span>';

// The new text pattern (single line, slightly smaller font for the bracketed part, maybe 0.75rem or 0.8rem, with a margin-left for spacing)
const newStr = 'Ad Campaign Management <span style="font-size:0.75rem; color:rgba(255,255,255,0.45); font-weight:normal; margin-left:4px;">(Ad Budget Not Included)</span>';

// Replace all occurrences (there are 3)
content = content.split(oldStr).join(newStr);

fs.writeFileSync(path, content, 'utf-8');
console.log('Fixed ad budget text formatting.');
