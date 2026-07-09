const fs = require('fs');
const path = 'services/social-media.html';
let content = fs.readFileSync(path, 'utf-8');

const htmlBlock = `
      <!-- Social Media Workflow Section -->
      <style>
      .sm-workflow-section {
        padding: 6rem 4%;
        background: var(--bg-secondary);
        overflow: hidden;
      }
      .sm-wf-header {
        text-align: center;
        margin-bottom: 5rem;
      }
      .sm-wf-subtitle {
        color: var(--accent);
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-size: 0.8rem;
        margin-bottom: 1rem;
        display: inline-block;
      }
      .sm-wf-title {
        font-size: clamp(2.2rem, 4vw, 3.2rem);
        font-weight: 800;
        color: #fff;
        margin: 0;
        letter-spacing: -1px;
      }
      .sm-wf-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5rem;
        max-width: 1100px;
        margin: 0 auto;
      }
      .sm-wf-left {
        position: relative;
        flex-shrink: 0;
      }
      .sm-wf-main-circle {
        width: 280px;
        height: 280px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 2;
        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      }
      .sm-wf-main-circle::after {
        content: '';
        position: absolute;
        top: -12px; left: -12px; right: -12px; bottom: -12px;
        border-radius: 50%;
        background: conic-gradient(
          #a855f7 0deg 72deg,
          #6366f1 72deg 144deg,
          #3b82f6 144deg 216deg,
          #eab308 216deg 288deg,
          #22c55e 288deg 360deg
        );
        z-index: -1;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        padding: 12px;
      }
      .sm-wf-main-circle span {
        font-size: 1.1rem;
        color: #666;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
      .sm-wf-main-circle strong {
        font-size: 1.8rem;
        color: #111;
        font-weight: 800;
        margin-top: 5px;
        line-height: 1.1;
        text-align: center;
      }

      .sm-wf-right {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
        max-width: 550px;
        position: relative;
      }

      .sm-wf-connections {
        position: absolute;
        top: 0; left: -100px;
        width: 120px;
        height: 100%;
        z-index: 1;
        pointer-events: none;
      }
      .sm-wf-path {
        fill: none;
        stroke: rgba(255,255,255,0.15);
        stroke-width: 2px;
        stroke-dasharray: 4 4;
      }

      .sm-step-card {
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, var(--c1), var(--c2));
        border-radius: 60px;
        padding: 10px;
        padding-right: 30px;
        color: #fff;
        position: relative;
        transition: transform 0.3s, box-shadow 0.3s;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        cursor: default;
      }
      .sm-step-card:hover {
        transform: translateX(10px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.4);
      }
      .sm-step-card::before {
        content: '';
        position: absolute;
        left: -15px;
        top: 50%;
        width: 10px; height: 10px;
        border-radius: 50%;
        background: #fff;
        transform: translateY(-50%);
        border: 3px solid var(--c1);
      }

      .sm-step-circle {
        width: 65px;
        height: 65px;
        background: #fff;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--c1);
        box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);
        margin-right: 20px;
      }
      .sm-step-circle .step-lbl {
        font-size: 0.55rem;
        font-weight: 800;
        letter-spacing: 1px;
      }
      .sm-step-circle .step-val {
        font-size: 1.4rem;
        font-weight: 800;
        line-height: 1;
      }

      .sm-step-content {
        flex-grow: 1;
      }
      .sm-step-content h4 {
        margin: 0 0 5px 0;
        font-size: 1.05rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #fff;
      }
      .sm-step-content p {
        margin: 0;
        font-size: 0.85rem;
        color: rgba(255,255,255,0.95);
        line-height: 1.4;
      }

      .sm-step-icon {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-left: 15px;
      }
      .sm-step-icon i {
        width: 20px;
        height: 20px;
        color: #fff;
      }

      @media (max-width: 992px) {
        .sm-wf-wrapper {
          flex-direction: column;
          gap: 3rem;
        }
        .sm-wf-connections {
          display: none;
        }
        .sm-step-card::before {
          display: none;
        }
      }
      </style>

      <section class="sm-workflow-section">
        <div class="sm-wf-header">
          <span class="sm-wf-subtitle">How We Work</span>
          <h2 class="sm-wf-title">Our Social Media Workflow</h2>
        </div>
        
        <div class="sm-wf-wrapper">
          <!-- Left Circle -->
          <div class="sm-wf-left">
            <div class="sm-wf-main-circle">
              <span>SOCIAL MEDIA</span>
              <strong>MANAGEMENT</strong>
            </div>
          </div>
          
          <!-- Right Steps -->
          <div class="sm-wf-right">
            <!-- SVG Connections -->
            <svg class="sm-wf-connections" viewBox="0 0 100 500" preserveAspectRatio="none">
               <path class="sm-wf-path" d="M -50,250 C 20,250 50,50 90,50" />
               <path class="sm-wf-path" d="M -50,250 C 20,250 50,150 90,150" />
               <path class="sm-wf-path" d="M -50,250 C 20,250 50,250 90,250" />
               <path class="sm-wf-path" d="M -50,250 C 20,250 50,350 90,350" />
               <path class="sm-wf-path" d="M -50,250 C 20,250 50,450 90,450" />
            </svg>
          
            <!-- Step 01 -->
            <div class="sm-step-card" style="--c1: #a855f7; --c2: #c084fc;">
              <div class="sm-step-circle">
                <span class="step-lbl">STEP</span><span class="step-val">01</span>
              </div>
              <div class="sm-step-content">
                <h4>RESEARCH & WRITING</h4>
                <p>Identify core information sources, gather data, and brainstorm ideas.</p>
              </div>
              <div class="sm-step-icon"><i data-lucide="edit-3"></i></div>
            </div>
            
            <!-- Step 02 -->
            <div class="sm-step-card" style="--c1: #6366f1; --c2: #818cf8;">
              <div class="sm-step-circle">
                <span class="step-lbl">STEP</span><span class="step-val">02</span>
              </div>
              <div class="sm-step-content">
                <h4>PUBLISH CONTENT</h4>
                <p>Convert data to valuable content and distribute across platforms.</p>
              </div>
              <div class="sm-step-icon"><i data-lucide="share-2"></i></div>
            </div>
            
            <!-- Step 03 -->
            <div class="sm-step-card" style="--c1: #3b82f6; --c2: #60a5fa;">
              <div class="sm-step-circle">
                <span class="step-lbl">STEP</span><span class="step-val">03</span>
              </div>
              <div class="sm-step-content">
                <h4>SOCIAL BROADCAST</h4>
                <p>Maximize reach by distributing content to your specific audience.</p>
              </div>
              <div class="sm-step-icon"><i data-lucide="radio"></i></div>
            </div>
            
            <!-- Step 04 -->
            <div class="sm-step-card" style="--c1: #eab308; --c2: #facc15;">
              <div class="sm-step-circle" style="color: #ca8a04;">
                <span class="step-lbl">STEP</span><span class="step-val">04</span>
              </div>
              <div class="sm-step-content">
                <h4>ENGAGE & REFER</h4>
                <p>Open discussions, increase engagement, and drive referrals.</p>
              </div>
              <div class="sm-step-icon"><i data-lucide="users"></i></div>
            </div>
            
            <!-- Step 05 -->
            <div class="sm-step-card" style="--c1: #22c55e; --c2: #4ade80;">
              <div class="sm-step-circle" style="color: #16a34a;">
                <span class="step-lbl">STEP</span><span class="step-val">05</span>
              </div>
              <div class="sm-step-content">
                <h4>REPORT & REFINE</h4>
                <p>Monitor metrics, analyze results, and refine future strategies.</p>
              </div>
              <div class="sm-step-icon"><i data-lucide="bar-chart-2"></i></div>
            </div>
          </div>
        </div>
      </section>

`;

const insertMarker = '      <!-- Pricing Section -->';
const index = content.indexOf(insertMarker);

if (index !== -1) {
  content = content.slice(0, index) + htmlBlock + content.slice(index);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Successfully inserted social media workflow section.');
} else {
  console.log('Error: Could not find insert location.');
}
