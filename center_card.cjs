const fs = require('fs');
const path = 'services/uiux-design.html';
let content = fs.readFileSync(path, 'utf-8');

// Add the CSS class
const cssTarget = '@media (max-width: 900px) {';
const cssReplacement = `
        .ux-card-last {
          grid-column: 1 / -1;
          justify-self: center;
          width: 100%;
          max-width: calc(50% - 0.75rem);
        }
        @media (max-width: 900px) {
          .ux-card-last {
            max-width: 100%;
          }
`;
content = content.replace(cssTarget, cssReplacement);

// Add class to Card 5
const htmlTarget = '<!-- Card 5 -->\n          <div class="ux-card">';
const htmlReplacement = '<!-- Card 5 -->\n          <div class="ux-card ux-card-last">';
content = content.replace(htmlTarget, htmlReplacement);

fs.writeFileSync(path, content, 'utf-8');
console.log('Centered 5th card');
