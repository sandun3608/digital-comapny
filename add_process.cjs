const fs = require('fs');
const path = 'services/uiux-design.html';

const processHTML = `
      <!-- UX Process Section -->
      <style>
        .ux-process-section {
          padding: 4rem 4% 8rem;
          background: var(--bg);
          position: relative;
        }
        .ux-process-header {
          text-align: center;
          margin-bottom: 6rem;
        }
        .ux-process-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -1px;
        }
        .ux-process-title span {
          color: #ef4444; /* matching the red UX in screenshot */
        }
        
        .ux-process-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }

        .ux-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 18%;
          position: relative;
          z-index: 1;
        }

        /* Stagger steps to create a swooping curve: Discover(mid), Define(low), Ideate(lowest), Prototype(mid-high), Test(high) */
        .ux-step:nth-child(1) { margin-top: 60px; }
        .ux-step:nth-child(2) { margin-top: 110px; }
        .ux-step:nth-child(3) { margin-top: 140px; }
        .ux-step:nth-child(4) { margin-top: 80px; }
        .ux-step:nth-child(5) { margin-top: 0px; }

        .ux-arrow {
          width: 90px;
          height: 90px;
          background: #fff;
          /* Paper plane / cursor arrow shape */
          clip-path: polygon(0 0, 100% 40%, 60% 60%, 40% 100%);
          margin-bottom: 1.5rem;
          transform: rotate(-20deg);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.4s ease;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        .ux-step:hover .ux-arrow {
          transform: rotate(-20deg) scale(1.15) translateY(-5px);
          filter: brightness(1.2);
        }

        /* Arrow Colors matching screenshot */
        .ux-step:nth-child(1) .ux-arrow { background: linear-gradient(135deg, #0f172a, #1e3a8a); }
        .ux-step:nth-child(2) .ux-arrow { background: linear-gradient(135deg, #22d3ee, #06b6d4); }
        .ux-step:nth-child(3) .ux-arrow { background: linear-gradient(135deg, #93c5fd, #60a5fa); }
        .ux-step:nth-child(4) .ux-arrow { background: linear-gradient(135deg, #f97316, #ea580c); }
        .ux-step:nth-child(5) .ux-arrow { background: linear-gradient(135deg, #ef4444, #dc2626); }

        .ux-step-content {
          margin-top: 1rem;
        }
        
        .ux-step h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 0.4rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .ux-step h3 i {
          width: 16px;
          height: 16px;
          color: rgba(255,255,255,0.5);
        }

        .ux-step p {
          color: rgba(255,255,255,0.5);
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.4;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .ux-process-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 2.5rem;
            padding-left: 2rem;
          }
          .ux-step {
            width: 100%;
            margin-top: 0 !important;
            flex-direction: row;
            text-align: left;
            gap: 2rem;
          }
          .ux-arrow {
            width: 70px;
            height: 70px;
            margin-bottom: 0;
            transform: rotate(70deg);
          }
          .ux-step:hover .ux-arrow {
            transform: rotate(70deg) scale(1.1);
          }
          .ux-step h3 {
            justify-content: flex-start;
          }
        }
      </style>

      <section class="ux-process-section">
        <div class="ux-process-header">
          <h2 class="ux-process-title"><span>UX</span> Design Process</h2>
        </div>
        
        <div class="ux-process-container">
          <!-- Step 1 -->
          <div class="ux-step">
            <div class="ux-arrow"></div>
            <div class="ux-step-content">
              <h3><i data-lucide="search"></i> Discover</h3>
              <p>Learn about user</p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="ux-step">
            <div class="ux-arrow"></div>
            <div class="ux-step-content">
              <h3><i data-lucide="crosshair"></i> Define</h3>
              <p>Determine features</p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="ux-step">
            <div class="ux-arrow"></div>
            <div class="ux-step-content">
              <h3><i data-lucide="lightbulb"></i> Ideate</h3>
              <p>Brainstorm solutions</p>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="ux-step">
            <div class="ux-arrow"></div>
            <div class="ux-step-content">
              <h3><i data-lucide="smartphone"></i> Prototype</h3>
              <p>Simulate user experience</p>
            </div>
          </div>

          <!-- Step 5 -->
          <div class="ux-step">
            <div class="ux-arrow"></div>
            <div class="ux-step-content">
              <h3><i data-lucide="check-circle"></i> Test</h3>
              <p>Validate with user</p>
            </div>
          </div>

        </div>
      </section>
`;

let content = fs.readFileSync(path, 'utf-8');
const endMarker = '<!-- Custom Dropdown Styling and JavaScript -->';
const endIndex = content.indexOf(endMarker);

if (endIndex !== -1) {
  content = content.slice(0, endIndex) + processHTML + '\n' + content.slice(endIndex);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Successfully injected UX process section');
} else {
  console.log('Error: Could not find insert location');
}
