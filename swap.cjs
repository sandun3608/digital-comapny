const fs = require('fs');

const path = 'services/mobile-app.html';
const lines = fs.readFileSync(path, 'utf-8').split('\n');

const block1Start = 280; // 0-indexed for line 281
const block1End = 393;   // 0-indexed for line 394

const block2Start = 605; // 0-indexed for line 606
const block2End = 895;   // 0-indexed for line 896

const part1 = lines.slice(0, block1Start);
const block1 = lines.slice(block1Start, block1End + 1);
const middle = lines.slice(block1End + 1, block2Start);
const block2 = lines.slice(block2Start, block2End + 1);
const endPart = lines.slice(block2End + 1);

const newLines = [...part1, ...block2, ...middle, ...block1, ...endPart];

fs.writeFileSync(path, newLines.join('\n'), 'utf-8');
console.log('Swapped successfully');
