const fs = require('fs');
const path = 'services/uiux-design.html';
let content = fs.readFileSync(path, 'utf-8');

const htmlBlock = `
      <!-- What You Will Get Section -->
      <style>
        .what-you-get-section {
          padding: 6rem 8%;
          background: var(--bg);
          position: relative;
        }
        .what-you-get-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .wyg-subtitle {
          color: var(--accent);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.8rem;
          margin-bottom: 1rem;
          display: inline-block;
        }
        .what-you-get-title {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -1px;
        }
        .wyg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .wyg-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.2rem;
          transition: transform 0.4s ease, background 0.4s ease, border-color 0.4s ease;
        }
        .wyg-card:hover {
          background: rgba(139,92,246,0.04);
          border-color: rgba(139,92,246,0.3);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .wyg-icon {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: rgba(139,92,246,0.08);
          border: 1px solid rgba(139,92,246,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a78bfa;
          transition: transform 0.4s ease;
        }
        .wyg-icon i {
          width: 24px;
          height: 24px;
        }
        .wyg-card:hover .wyg-icon {
          transform: scale(1.1) rotate(5deg);
          background: rgba(139,92,246,0.15);
          color: #c4b5fd;
        }
        .wyg-card p {
          color: rgba(255,255,255,0.9);
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          line-height: 1.5;
        }
        @media (max-width: 1024px) {
          .wyg-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .wyg-grid { grid-template-columns: 1fr; }
          .what-you-get-section { padding: 4rem 5%; }
        }
      </style>

      <section class="what-you-get-section">
        <div class="what-you-get-header">
          <span class="wyg-subtitle">Deliverables</span>
          <h2 class="what-you-get-title">What You Will Get</h2>
        </div>
        <div class="wyg-grid">
          <div class="wyg-card">
            <div class="wyg-icon"><i data-lucide="layout-template"></i></div>
            <p>Modern Website UI/UX Design</p>
          </div>
          <div class="wyg-card">
            <div class="wyg-icon"><i data-lucide="smartphone"></i></div>
            <p>Mobile App UI UX Design (iOS & Android)</p>
          </div>
          <div class="wyg-card">
            <div class="wyg-icon"><i data-lucide="figma"></i></div>
            <p>Figma Website and Landing Page Design</p>
          </div>
          <div class="wyg-card">
            <div class="wyg-icon"><i data-lucide="layout-dashboard"></i></div>
            <p>SaaS Dashboard & Web App UI</p>
          </div>
          <div class="wyg-card">
            <div class="wyg-icon"><i data-lucide="layers"></i></div>
            <p>High-Fidelity Mockups & Prototypes</p>
          </div>
          <div class="wyg-card">
            <div class="wyg-icon"><i data-lucide="monitor-smartphone"></i></div>
            <p>Responsive Layouts for All Devices</p>
          </div>
          <div class="wyg-card">
            <div class="wyg-icon"><i data-lucide="palette"></i></div>
            <p>Consistent Branding, Typography & Colors</p>
          </div>
          <div class="wyg-card">
            <div class="wyg-icon"><i data-lucide="zap"></i></div>
            <p>Animations & Micro-interactions (on request)</p>
          </div>
        </div>
      </section>

`;

const insertMarker = '      <!-- UX Process Section -->';
const index = content.indexOf(insertMarker);

if (index !== -1) {
  content = content.slice(0, index) + htmlBlock + content.slice(index);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Successfully inserted What You Will Get section.');
} else {
  console.log('Error: Could not find insert location.');
}
