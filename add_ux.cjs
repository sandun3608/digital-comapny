const fs = require('fs');
const path = 'services/uiux-design.html';
const htmlBlock = `
      <!-- UX Specialise Section -->
      <style>
        .ux-services-section {
          padding: 8rem 4% 4rem;
          background: var(--bg);
        }
        .ux-header {
          text-align: center;
          margin-bottom: 5rem;
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
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -1px;
        }
        .ux-grid {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .ux-card {
          display: flex;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .ux-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139,92,246,0.4);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(139,92,246,0.1);
          background: rgba(255,255,255,0.04);
        }
        .ux-img-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background: rgba(0,0,0,0.3);
          border-right: 1px solid rgba(255,255,255,0.04);
        }
        .ux-card.reverse .ux-img-wrapper {
          border-right: none;
          border-left: 1px solid rgba(255,255,255,0.04);
        }
        .ux-img-wrapper img {
          width: 90%;
          max-width: 500px;
          border-radius: 12px;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ux-card:hover .ux-img-wrapper img {
          transform: scale(1.05);
        }
        .ux-content {
          flex: 1;
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .ux-content h3 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
          letter-spacing: -0.5px;
        }
        .ux-content p {
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 1.2rem;
        }
        @media (min-width: 901px) {
          .ux-card.reverse {
            flex-direction: row-reverse;
          }
        }
        @media (max-width: 900px) {
          .ux-card {
            flex-direction: column;
          }
          .ux-img-wrapper {
            padding: 2rem;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.04);
          }
          .ux-card.reverse .ux-img-wrapper {
            border-left: none;
            border-bottom: 1px solid rgba(255,255,255,0.04);
          }
          .ux-content {
            padding: 2.5rem;
          }
          .ux-content h3 {
            font-size: 1.8rem;
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
            <div class="ux-img-wrapper">
              <img src="../a1/Untitled design (28).png" alt="New product UX design">
            </div>
            <div class="ux-content">
              <h3>New product UX design</h3>
              <p>We'll make the concept you have in mind into a real product that's easy and addictive to use.</p>
              <p>Our hands-on approach will research, organise, and develop a prototype that will match your user expectations. We'll be there to help with fine tuning and optimising after the release as well.</p>
            </div>
          </div>
          
          <!-- Card 2 -->
          <div class="ux-card reverse">
            <div class="ux-img-wrapper">
              <img src="../a1/Untitled design (28).png" alt="UX audits & redesigns">
            </div>
            <div class="ux-content">
              <h3>UX audits & redesigns</h3>
              <p>Not sure why there are so many drop-offs and no one's buying? Our UX audits can uncover what's not working. Our redesign can fix what's broken.</p>
              <p>Our comprehensive audits include review of analytics, design architecture, and interviews with users. We redesign with user satisfaction and business outcomes both in mind.</p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="ux-card">
            <div class="ux-img-wrapper">
              <img src="../a1/Untitled design (28).png" alt="MVPs for startups">
            </div>
            <div class="ux-content">
              <h3>MVPs for startups</h3>
              <p>Want to test the waters and get intel? Our lightweight MVPs are made prioritising your core value proposition. Build fast with us so you can learn and measure fast.</p>
              <p>Let's develop your value proposition based on research and insights. Then let's create a core product based on the MoSCoW (Must-have, Should-have, Could-have, and Won't-have) to get market feedback and present to investors.</p>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="ux-card reverse">
            <div class="ux-img-wrapper">
              <img src="../a1/Untitled design (28).png" alt="Dashboard & complex-system UX">
            </div>
            <div class="ux-content">
              <h3>Dashboard & complex-system UX</h3>
              <p>Is there a dashboard no one wants to use? We can replace that with a simple, easy-to-use one.</p>
              <p>We incorporate user feedback and data to redesign dashboards and systems people love. Let's make the experience smooth and user-focused. Get rid of the complaints and see your usage numbers spike.</p>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="ux-card">
            <div class="ux-img-wrapper">
              <img src="../a1/Untitled design (28).png" alt="Mobile app UX">
            </div>
            <div class="ux-content">
              <h3>Mobile app UX</h3>
              <p>Let's make your app seamless and impossible to put down.</p>
              <p>Our mobile app UX design makes everything simple, fast, and clear. Your users will love the clear navigation, clutter-free interface, and consistency. You will love the number of downloads and the revenue.</p>
            </div>
          </div>

        </div>
      </section>
`;

let content = fs.readFileSync(path, 'utf-8');
const insertIndex = content.indexOf('<!-- Custom Dropdown Styling and JavaScript -->');
if (insertIndex !== -1) {
  content = content.slice(0, insertIndex) + htmlBlock + content.slice(insertIndex);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Successfully injected UX section');
} else {
  console.log('Error: Could not find insert location');
}
