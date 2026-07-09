import os

filepath = r"services\mobile-app.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new snake timeline HTML and CSS
new_section = """      <style>
        .snake-timeline-section {
          padding: 6rem 5%;
          background: var(--bg-secondary);
          color: #fff;
          overflow: hidden;
        }
        .snake-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .snake-header h2 {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 1rem;
        }
        
        .snake-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }

        /* Desktop Layout */
        @media (min-width: 900px) {
          .snake-row {
            display: flex;
            justify-content: space-between;
            position: relative;
            margin-bottom: 5rem;
          }
          .snake-row.row-2 {
            flex-direction: row-reverse;
          }
          
          /* The connecting paths */
          .snake-path {
            position: absolute;
            top: 40px; /* middle of the icon */
            height: 4px;
            background: rgba(139, 92, 246, 0.3); /* muted purple */
            z-index: 1;
          }
          .path-fill {
            position: absolute;
            top: 0; left: 0; height: 100%;
            background: #8b5cf6; /* active purple */
          }
          
          /* Custom SVG lines for the U-turns */
          .u-turn {
            position: absolute;
            width: 80px;
            height: calc(100% + 5rem);
            border: 4px solid rgba(139, 92, 246, 0.3);
            border-bottom: none;
            z-index: 1;
            top: 40px;
          }
          .u-turn-right {
            right: 120px; /* align with last item */
            border-left: none;
            border-radius: 0 40px 40px 0;
            border-top: 4px solid #8b5cf6;
            border-right: 4px solid #8b5cf6;
          }
          .u-turn-left {
            left: 120px;
            border-right: none;
            border-radius: 40px 0 0 40px;
            border-top: 4px solid #8b5cf6;
            border-left: 4px solid #8b5cf6;
          }

          /* Connectors inside the row */
          .row-1 .snake-path { left: 160px; right: 160px; }
          .row-1 .path-fill { width: 100%; } /* fully colored */
          
          .row-2 .snake-path { left: 160px; right: 160px; }
          .row-2 .path-fill { width: 100%; right: 0; left: auto; } /* fully colored */
          
          .row-3 .snake-path { left: 160px; right: 50%; }
          .row-3 .path-fill { width: 100%; }
        }

        .snake-item {
          width: 250px;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .snake-icon {
          width: 80px;
          height: 80px;
          background: var(--bg);
          border: 4px solid #8b5cf6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          position: relative;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .snake-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.7);
        }
        .snake-icon i {
          color: #8b5cf6;
          font-size: 2rem;
        }
        .snake-num {
          position: absolute;
          bottom: -10px;
          right: -10px;
          width: 30px;
          height: 30px;
          background: #8b5cf6;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
          border: 3px solid var(--bg-secondary);
        }

        .snake-content h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        .snake-content p {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        /* Mobile Layout */
        @media (max-width: 899px) {
          .snake-container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding-left: 20px;
            border-left: 4px solid #8b5cf6;
          }
          .snake-row {
            display: contents; /* removes row wrapping */
          }
          .snake-item {
            width: 100%;
            flex-direction: row;
            text-align: left;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .snake-icon {
            width: 60px;
            height: 60px;
            flex-shrink: 0;
            margin-bottom: 0;
            margin-left: -54px; /* pull over the border */
            background: var(--bg-secondary);
          }
          .snake-icon i { font-size: 1.5rem; }
          .snake-num { bottom: -5px; right: -5px; width: 24px; height: 24px; font-size: 0.75rem; }
          .u-turn, .snake-path { display: none; }
        }
      </style>

      <section class="snake-timeline-section">
        <div class="snake-header">
          <h2>App Development Process</h2>
        </div>
        
        <div class="snake-container">
          <!-- Connectors for Desktop -->
          <div class="u-turn u-turn-right"></div>
          <div class="u-turn u-turn-left" style="top: calc(40px + 100% / 3 + 5rem);"></div>

          <!-- Row 1 -->
          <div class="snake-row row-1">
            <div class="snake-path"><div class="path-fill"></div></div>
            <div class="snake-item">
              <div class="snake-icon">
                <i data-lucide="building-2"></i>
                <div class="snake-num">1</div>
              </div>
              <div class="snake-content">
                <h4>Choosing a company</h4>
                <p>to design and develop your app</p>
              </div>
            </div>
            <!-- Spacer for center if we only have 2 items in top row -->
            <div class="snake-item" style="visibility: hidden;"></div>
            
            <div class="snake-item">
              <div class="snake-icon">
                <i data-lucide="search"></i>
                <div class="snake-num">2</div>
              </div>
              <div class="snake-content">
                <h4>Product Discovery</h4>
                <p>define what you want to create, for who and why</p>
              </div>
            </div>
          </div>

          <!-- Row 2 (Reversed in CSS) -->
          <div class="snake-row row-2">
            <div class="snake-path"><div class="path-fill"></div></div>
            <div class="snake-item">
              <div class="snake-icon">
                <i data-lucide="pen-tool"></i>
                <div class="snake-num">3</div>
              </div>
              <div class="snake-content">
                <h4>UX / UI app design</h4>
                <p>determine how your app will work and look</p>
              </div>
            </div>

            <div class="snake-item">
              <div class="snake-icon">
                <i data-lucide="sliders-horizontal"></i>
                <div class="snake-num">4</div>
              </div>
              <div class="snake-content">
                <h4>Project kick-off & setup</h4>
                <p>last preparations before the start of app development</p>
              </div>
            </div>

            <div class="snake-item">
              <div class="snake-icon">
                <i data-lucide="code-2"></i>
                <div class="snake-num">5</div>
              </div>
              <div class="snake-content">
                <h4>App development + QA</h4>
                <p>plan, code, build, test</p>
              </div>
            </div>
          </div>

          <!-- Row 3 -->
          <div class="snake-row row-3">
            <div class="snake-path"><div class="path-fill"></div></div>
            <div class="snake-item">
              <div class="snake-icon">
                <i data-lucide="rocket"></i>
                <div class="snake-num">6</div>
              </div>
              <div class="snake-content">
                <h4>Preparation & publishing</h4>
                <p>on Google Play Store and Apple Store</p>
              </div>
            </div>

            <div class="snake-item">
              <div class="snake-icon">
                <i data-lucide="settings"></i>
                <div class="snake-num">7</div>
              </div>
              <div class="snake-content">
                <h4>Post-development phase</h4>
                <p>app maintenance & further development</p>
              </div>
            </div>
            
            <div class="snake-item" style="visibility: hidden;"></div>
          </div>

        </div>
      </section>"""

import re

# We will replace the <section style="padding: 5rem 10% 4rem; background: var(--bg-secondary);">
# up to </section> before <!-- Client Testimonials Section -->
pattern = re.compile(r'<section style="padding: 5rem 10% 4rem; background: var\(--bg-secondary\);">.*?</section>', re.DOTALL)

new_content = pattern.sub(new_section, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replaced successfully")
