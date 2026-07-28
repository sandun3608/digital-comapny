const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'services', 'social-media.html');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find start and end indices of the workflow section
  const startKeyword = '<!-- Social Media Workflow Section -->';
  const endKeyword = '</section>';
  
  const startIndex = content.indexOf(startKeyword);
  if (startIndex !== -1) {
    // Find the next </section> after the start keyword
    const rest = content.substring(startIndex);
    const relativeEndIndex = rest.indexOf(endKeyword);
    if (relativeEndIndex !== -1) {
      const endIndex = startIndex + relativeEndIndex + endKeyword.length;
      
      // Remove this block
      const newContent = content.substring(0, startIndex) + content.substring(endIndex);
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Workflow section successfully removed from social-media.html');
    } else {
      console.log('Error: End of section not found.');
    }
  } else {
    console.log('Error: Start of section not found.');
  }
}
