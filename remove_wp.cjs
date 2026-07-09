const fs = require('fs');
const path = 'services/social-media.html';
let content = fs.readFileSync(path, 'utf-8');

// The section seems to start with `<section style="padding: 5rem 10% 4rem; background: var(--bg); color: #fff;">` based on previous node script outputs (around line 708 before my new insertions, maybe it moved down).
// Let's find it by looking for the Working Process title.
const wpIndex = content.indexOf('Working Process');
if (wpIndex !== -1) {
  // Find the opening <section> tag before the Working Process title
  const sectionStart = content.lastIndexOf('<section', wpIndex);
  
  // Find the closing </section> tag after the Working Process title
  const sectionEndStr = '</section>';
  let sectionEnd = content.indexOf(sectionEndStr, wpIndex);
  
  if (sectionStart !== -1 && sectionEnd !== -1) {
    sectionEnd += sectionEndStr.length; // include the closing tag
    
    // Remove the block
    content = content.slice(0, sectionStart) + content.slice(sectionEnd);
    fs.writeFileSync(path, content, 'utf-8');
    console.log('Successfully removed the Working Process section.');
  } else {
    console.log('Could not find section start or end tags.');
  }
} else {
  console.log('Could not find "Working Process" text.');
}
