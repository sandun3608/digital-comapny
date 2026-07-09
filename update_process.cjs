const fs = require('fs');
const path = 'services/uiux-design.html';
let content = fs.readFileSync(path, 'utf-8');

const processHTML = `      <!-- UX Process Section -->
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
          color: #ef4444; 
        }
        
        .ux-process-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }

        .ux-process-line-svg {
          position: absolute;
          top: 0;
          left: 9%;
          width: 82%;
          height: 200px;
          z-index: 0;
          pointer-events: none;
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

        /* Stagger steps to create a swooping curve */
        .ux-step:nth-child(2) { margin-top: 60px; }
        .ux-step:nth-child(3) { margin-top: 110px; }
        .ux-step:nth-child(4) { margin-top: 140px; }
        .ux-step:nth-child(5) { margin-top: 80px; }
        .ux-step:nth-child(6) { margin-top: 0px; }

        .ux-arrow {
          width: 90px;
          height: 90px;
          background: #fff;
          /* Arrow pointing right */
          clip-path: polygon(0 0, 100% 50%, 0 100%, 25% 50%);
          margin-bottom: 1.5rem;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.4s ease;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        /* Rotate arrows to follow the path */
        .ux-step:nth-child(2) .ux-arrow { transform: rotate(15deg); }
        .ux-step:nth-child(3) .ux-arrow { transform: rotate(10deg); }
        .ux-step:nth-child(4) .ux-arrow { transform: rotate(-20deg); }
        .ux-step:nth-child(5) .ux-arrow { transform: rotate(-30deg); }
        .ux-step:nth-child(6) .ux-arrow { transform: rotate(-10deg); }

        .ux-step:nth-child(2):hover .ux-arrow { transform: rotate(15deg) scale(1.15) translateY(-5px); }
        .ux-step:nth-child(3):hover .ux-arrow { transform: rotate(10deg) scale(1.15) translateY(-5px); }
        .ux-step:nth-child(4):hover .ux-arrow { transform: rotate(-20deg) scale(1.15) translateY(-5px); }
        .ux-step:nth-child(5):hover .ux-arrow { transform: rotate(-30deg) scale(1.15) translateY(-5px); }
        .ux-step:nth-child(6):hover .ux-arrow { transform: rotate(-10deg) scale(1.15) translateY(-5px); }

        .ux-step:hover .ux-arrow {
          filter: brightness(1.2);
        }

        /* Arrow Colors matching screenshot */
        .ux-step:nth-child(2) .ux-arrow { background: linear-gradient(135deg, #0f172a, #1e3a8a); }
        .ux-step:nth-child(3) .ux-arrow { background: linear-gradient(135deg, #22d3ee, #06b6d4); }
        .ux-step:nth-child(4) .ux-arrow { background: linear-gradient(135deg, #93c5fd, #60a5fa); }
        .ux-step:nth-child(5) .ux-arrow { background: linear-gradient(135deg, #f97316, #ea580c); }
        .ux-step:nth-child(6) .ux-arrow { background: linear-gradient(135deg, #ef4444, #dc2626); }

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
          .ux-process-line-svg {
            display: none;
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
          }
          .ux-step:nth-child(n) .ux-arrow { transform: rotate(90deg); }
          .ux-step:nth-child(n):hover .ux-arrow { transform: rotate(90deg) scale(1.1); }
          
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
          
          <!-- Dashed connecting line -->
          <svg class="ux-process-line-svg" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <path d="M 0 105 C 100 155, 150 155, 250 155 C 350 155, 400 185, 500 185 C 600 185, 650 125, 750 125 C 850 125, 900 45, 1000 45" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="4" stroke-dasharray="12, 12" />
          </svg>

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

const startMarker = '      <!-- UX Process Section -->';
const endMarker = '<!-- Custom Dropdown Styling and JavaScript -->';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.slice(0, startIndex) + processHTML + '\n' + content.slice(endIndex);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Successfully updated UX process section');
} else {
  console.log('Error: Could not find insert location');
}
