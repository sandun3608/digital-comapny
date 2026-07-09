const fs = require('fs');
const path = 'services/mobile-app.html';
let content = fs.readFileSync(path, 'utf-8');

const startMarker = '      <!-- Mobile Application Types Section -->';
const endMarker = '      <!-- Client Testimonials Section (Google Review Widget Style) -->';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  // Extract the section
  const sectionText = content.slice(startIndex, endIndex);
  
  // Remove it from the current location
  content = content.slice(0, startIndex) + content.slice(endIndex);
  
  // Now find where to insert it: right before the form
  const insertMarker = '      <!-- Get a Quote Section -->';
  const insertIndex = content.indexOf(insertMarker);
  
  if (insertIndex !== -1) {
    content = content.slice(0, insertIndex) + sectionText + content.slice(insertIndex);
    fs.writeFileSync(path, content, 'utf-8');
    console.log('Successfully moved App Types section before the Quote form.');
  } else {
    console.log('Error: Could not find insert location (Get a Quote).');
  }
} else {
  console.log('Error: Could not extract the App Types section.');
}
