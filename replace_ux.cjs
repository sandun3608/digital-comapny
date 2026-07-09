const fs = require('fs');
const path = 'services/uiux-design.html';

const htmlBlock = `
      <!-- UX Specialise Section -->
      <style>
        .ux-services-section {
          padding: 5rem 4% 3rem;
          background: var(--bg);
        }
        .ux-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .ux-subtitle {
          color: var(--accent);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.8rem;
          margin-bottom: 1rem;
          display: inline-block;
        }
        .ux-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -1px;
        }
        .ux-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .ux-card {
          display: flex;
          align-items: flex-start;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 2rem;
          gap: 1.5rem;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .ux-card:hover {
          transform: translateY(-4px);
          border-color: rgba(139,92,246,0.4);
          box-shadow: 0 12px 25px rgba(0,0,0,0.3), 0 0 15px rgba(139,92,246,0.1);
          background: rgba(255,255,255,0.04);
        }
        .ux-icon-wrapper {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
        }
        .ux-icon-wrapper i {
          width: 24px;
          height: 24px;
        }
        .ux-content {
          flex: 1;
        }
        .ux-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 0.8rem 0;
          letter-spacing: -0.5px;
        }
        .ux-content p {
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
          font-size: 0.9rem;
          margin: 0 0 0.8rem 0;
        }
        .ux-content p:last-child {
          margin-bottom: 0;
        }
        @media (max-width: 900px) {
          .ux-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <section class="ux-services-section">
        <div class="ux-header">
          <span class="ux-subtitle">Our UX services</span>
          <h2 class="ux-title">UX and UI design services we specialise in</h2>
        </div>
        <div class="ux-grid">
          
          <!-- Card 1 -->
          <div class="ux-card">
            <div class="ux-icon-wrapper">
              <i data-lucide="pen-tool"></i>
            </div>
            <div class="ux-content">
              <h3>New product UX design</h3>
              <p>We'll make the concept you have in mind into a real product that's easy and addictive to use.</p>
              <p>Our hands-on approach will research, organise, and develop a prototype that will match your user expectations.</p>
            </div>
          </div>
          
          <!-- Card 2 -->
          <div class="ux-card">
            <div class="ux-icon-wrapper">
              <i data-lucide="search"></i>
            </div>
            <div class="ux-content">
              <h3>UX audits & redesigns</h3>
              <p>Not sure why there are so many drop-offs and no one's buying? Our UX audits can uncover what's not working.</p>
              <p>Our comprehensive audits include review of analytics, design architecture, and interviews with users.</p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="ux-card">
            <div class="ux-icon-wrapper">
              <i data-lucide="rocket"></i>
            </div>
            <div class="ux-content">
              <h3>MVPs for startups</h3>
              <p>Want to test the waters and get intel? Our lightweight MVPs are made prioritising your core value proposition.</p>
              <p>Let's develop your value proposition based on research and insights to get market feedback and present to investors.</p>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="ux-card">
            <div class="ux-icon-wrapper">
              <i data-lucide="layout-dashboard"></i>
            </div>
            <div class="ux-content">
              <h3>Dashboard & complex-system UX</h3>
              <p>Is there a dashboard no one wants to use? We can replace that with a simple, easy-to-use one.</p>
              <p>We incorporate user feedback and data to redesign dashboards and systems people love.</p>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="ux-card">
            <div class="ux-icon-wrapper">
              <i data-lucide="smartphone"></i>
            </div>
            <div class="ux-content">
              <h3>Mobile app UX</h3>
              <p>Let's make your app seamless and impossible to put down.</p>
              <p>Our mobile app UX design makes everything simple, fast, and clear. Your users will love the clear navigation.</p>
            </div>
          </div>

        </div>
      </section>
`;

let content = fs.readFileSync(path, 'utf-8');

const endMarker = '<!-- Custom Dropdown Styling and JavaScript -->';
const endIndex = content.indexOf(endMarker);

// Find the start marker dynamically
const startRegex = /<!-- UX Specialise Section -->[\s\S]*?<style>\s*\.ux-services-section/;
const match = content.match(startRegex);

if (match && endIndex !== -1) {
  const startIndex = match.index;
  // Replace the whole block up to endIndex
  content = content.slice(0, startIndex) + htmlBlock + content.slice(endIndex);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Successfully replaced UX section');
} else {
  // If we can't find it with the regex, try a simpler fallback
  const fallbackIndex = content.indexOf('      <section class="ux-services-section">');
  if (fallbackIndex !== -1) {
     const styleStart = content.lastIndexOf('<style>', fallbackIndex);
     if (styleStart !== -1) {
         content = content.slice(0, styleStart) + htmlBlock + content.slice(endIndex);
         fs.writeFileSync(path, content, 'utf-8');
         console.log('Successfully replaced UX section (fallback)');
     } else {
         console.log('Error: Could not find insert location (fallback)');
     }
  } else {
      console.log('Error: Could not find insert location');
  }
}
