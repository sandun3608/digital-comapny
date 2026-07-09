const fs = require('fs');
const path = 'services/mobile-app.html';
let content = fs.readFileSync(path, 'utf-8');

const htmlBlock = `
      <!-- Mobile Application Types Section -->
      <style>
        .app-types-section {
          padding: 6rem 4% 4rem;
          background: var(--bg);
        }
        .app-types-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .at-subtitle {
          color: var(--accent);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.8rem;
          margin-bottom: 1rem;
          display: inline-block;
        }
        .app-types-title {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -1px;
        }
        .at-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .at-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.2rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .at-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 100%;
          background: radial-gradient(circle at 50% 0%, rgba(139,92,246,0.1), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .at-card:hover {
          background: rgba(139,92,246,0.02);
          border-color: rgba(139,92,246,0.4);
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }
        .at-card:hover::before {
          opacity: 1;
        }
        .at-icon {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: rgba(139,92,246,0.08);
          border: 1px solid rgba(139,92,246,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a78bfa;
          transition: transform 0.4s ease, background 0.4s;
          position: relative;
          z-index: 1;
        }
        .at-icon i {
          width: 28px;
          height: 28px;
        }
        .at-card:hover .at-icon {
          transform: scale(1.1) rotate(5deg);
          background: rgba(139,92,246,0.2);
          color: #c4b5fd;
        }
        .at-card h4 {
          color: #fff;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
          position: relative;
          z-index: 1;
        }
        .at-card p {
          color: rgba(255,255,255,0.6);
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 1024px) {
          .at-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .at-grid { grid-template-columns: 1fr; }
        }
      </style>

      <section class="app-types-section">
        <div class="app-types-header">
          <span class="at-subtitle">What We Build</span>
          <h2 class="app-types-title">Mobile App Solutions</h2>
          <p style="font-size: 1rem; color: var(--text-secondary); max-width: 600px; margin: 1rem auto 0; line-height: 1.6;">We develop high-performance, native and cross-platform mobile applications tailored for various industries.</p>
        </div>
        <div class="at-grid">
          <div class="at-card">
            <div class="at-icon"><i data-lucide="shopping-cart"></i></div>
            <h4>E-Commerce Apps</h4>
            <p>Seamless shopping experiences with secure checkouts and inventory sync.</p>
          </div>
          <div class="at-card">
            <div class="at-icon"><i data-lucide="truck"></i></div>
            <h4>Delivery & Logistics</h4>
            <p>Real-time tracking, order management, and driver routing systems.</p>
          </div>
          <div class="at-card">
            <div class="at-icon"><i data-lucide="credit-card"></i></div>
            <h4>Fintech & Banking</h4>
            <p>Ultra-secure wallets, banking apps, and payment gateways.</p>
          </div>
          <div class="at-card">
            <div class="at-icon"><i data-lucide="heart-pulse"></i></div>
            <h4>Healthcare & Fitness</h4>
            <p>Telehealth, appointment booking, and daily activity tracking apps.</p>
          </div>
          <div class="at-card">
            <div class="at-icon"><i data-lucide="users"></i></div>
            <h4>Social Networking</h4>
            <p>Community platforms with real-time chat, feeds, and multimedia sharing.</p>
          </div>
          <div class="at-card">
            <div class="at-icon"><i data-lucide="calendar-check"></i></div>
            <h4>Booking & Reservations</h4>
            <p>Hotel, flight, and service booking apps with interactive calendars.</p>
          </div>
          <div class="at-card">
            <div class="at-icon"><i data-lucide="book-open"></i></div>
            <h4>EdTech & Learning</h4>
            <p>Online courses, live classes, and student management portals.</p>
          </div>
          <div class="at-card">
            <div class="at-icon"><i data-lucide="zap"></i></div>
            <h4>On-Demand Services</h4>
            <p>Taxi booking, home services, and gig-economy platforms.</p>
          </div>
        </div>
      </section>
`;

const startIndex = content.indexOf('<style>\n        .models-grid');
const endIndexStr = '      <!-- Client Testimonials Section (Google Review Widget Style) -->';
const endIndex = content.indexOf(endIndexStr);

if (startIndex !== -1 && endIndex !== -1) {
  // Find the exact opening <!-- of the section, just slightly before the style
  const beforeStart = content.lastIndexOf('<!--', startIndex);
  let actualStart = startIndex;
  if(beforeStart !== -1 && beforeStart > startIndex - 200) {
     actualStart = beforeStart;
  }
  
  content = content.slice(0, actualStart) + htmlBlock + '\n      ' + content.slice(endIndex);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Successfully replaced old models with mobile app types.');
} else {
  console.log('Error: Could not find indices. Start:', startIndex, 'End:', endIndex);
}
