const fs = require('fs');
const path = 'services/social-media.html';
let content = fs.readFileSync(path, 'utf-8');

// The current broken string
const currentStr = 'Ad Campaign Management <span style="font-size:0.75rem; color:rgba(255,255,255,0.45); font-weight:normal; margin-left:4px;">(Ad Budget Not Included)</span>';

// The new correct layout string (using flex column to keep them neatly stacked)
const newStr = '<span style="display:flex; flex-direction:column; gap:2px;"><span>Ad Campaign Management</span><span style="font-size:0.75rem; color:rgba(255,255,255,0.45); font-weight:normal;">(Ad Budget Not Included)</span></span>';

// Replace all occurrences
content = content.split(currentStr).join(newStr);

fs.writeFileSync(path, content, 'utf-8');
console.log('Fixed ad budget text wrapping.');
