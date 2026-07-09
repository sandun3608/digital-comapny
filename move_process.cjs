const fs = require('fs');
const path = 'services/uiux-design.html';
let content = fs.readFileSync(path, 'utf-8');

// 1. Extract the new UX Process Section
const uxProcessStartMarker = '      <!-- UX Process Section -->';
const uxProcessEndMarker = '      </section>\n\n      <!-- Custom Dropdown Styling and JavaScript -->';
const uxProcessEndMarkerFallback = '<!-- Custom Dropdown Styling and JavaScript -->';

const startIndex = content.indexOf(uxProcessStartMarker);
let endIndex = content.indexOf(uxProcessEndMarker);
let extractedSection = '';

if (startIndex !== -1) {
  if (endIndex === -1) {
      endIndex = content.indexOf(uxProcessEndMarkerFallback);
      if (endIndex !== -1) {
          // Find the closing </section> before Custom Dropdown Styling
          const sectionEnd = content.lastIndexOf('</section>', endIndex);
          if (sectionEnd !== -1 && sectionEnd > startIndex) {
             endIndex = sectionEnd + '</section>'.length;
          }
      }
  } else {
      endIndex = content.indexOf('</section>', endIndex - 20) + '</section>'.length;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
    extractedSection = content.slice(startIndex, endIndex);
    
    // Remove it from its original location
    content = content.slice(0, startIndex) + content.slice(endIndex);

    // 2. Find the old Working Process section
    const oldProcessStartStr = '<section style="padding: 5rem 10% 4rem; background: var(--bg-secondary);">';
    const oldProcessStart = content.indexOf(oldProcessStartStr);
    
    if (oldProcessStart !== -1) {
        const oldProcessEndStr = '      </section>\n\n      <!-- Client Testimonials Section';
        let oldProcessEnd = content.indexOf(oldProcessEndStr);
        if(oldProcessEnd === -1) {
            oldProcessEnd = content.indexOf('<!-- Client Testimonials Section');
            // Backtrack to previous </section>
            if (oldProcessEnd !== -1) {
                const prevEnd = content.lastIndexOf('</section>', oldProcessEnd);
                if (prevEnd !== -1 && prevEnd > oldProcessStart) {
                    oldProcessEnd = prevEnd + '</section>'.length;
                }
            }
        } else {
             oldProcessEnd = content.indexOf('</section>', oldProcessEnd - 10) + '</section>'.length;
        }

        if (oldProcessEnd !== -1) {
            // Replace old process with new process
            content = content.slice(0, oldProcessStart) + extractedSection + '\n\n' + content.slice(oldProcessEnd);
            fs.writeFileSync(path, content, 'utf-8');
            console.log('Successfully moved UX Process section and deleted old workflow.');
        } else {
            console.log('Error: Could not find end of old Working Process section.');
        }
    } else {
        console.log('Error: Could not find old Working Process section.');
    }
} else {
    console.log('Error: Could not extract UX Process section. start:', startIndex, 'end:', endIndex);
}
