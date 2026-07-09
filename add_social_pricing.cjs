const fs = require('fs');
const path = 'services/social-media.html';
let content = fs.readFileSync(path, 'utf-8');

const htmlBlock = `
      <!-- Pricing Section -->
      <style>
        .pricing-section {
          padding: 6rem 4%;
          background: var(--bg);
          position: relative;
        }
        .pricing-header {
          text-align: center;
          margin-bottom: 4.5rem;
        }
        .pricing-subtitle {
          color: var(--accent);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.8rem;
          margin-bottom: 1rem;
          display: inline-block;
        }
        .pricing-title {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -1px;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .pricing-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .pricing-card.popular {
          border-color: rgba(139,92,246,0.3);
          background: rgba(139,92,246,0.02);
          transform: scale(1.05);
          z-index: 10;
        }
        .pricing-card:hover {
          border-color: rgba(139,92,246,0.4);
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .pricing-card.popular:hover {
          transform: scale(1.05) translateY(-10px);
        }
        .popular-badge {
          position: absolute;
          top: 1.5rem;
          right: -2.5rem;
          background: linear-gradient(135deg, #8B5CF6, #3B82F6);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.4rem 3rem;
          transform: rotate(45deg);
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .pricing-name {
          color: rgba(255,255,255,0.9);
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .pricing-price {
          font-size: 2.8rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 2.5rem;
          display: flex;
          align-items: baseline;
          gap: 5px;
        }
        .pricing-price span.currency {
          font-size: 1.5rem;
          color: var(--accent);
        }
        .pricing-price span.duration {
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          font-weight: 500;
        }
        .pricing-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2.5rem 0;
          flex-grow: 1;
        }
        .pricing-features li {
          color: rgba(255,255,255,0.7);
          font-size: 0.95rem;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          line-height: 1.4;
        }
        .pricing-features li i {
          color: #10B981;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .pricing-btn {
          background: rgba(255,255,255,0.05);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 1.2rem;
          border-radius: 14px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-block;
          width: 100%;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }
        .pricing-card.popular .pricing-btn {
          background: linear-gradient(135deg, #8B5CF6, #3B82F6);
          border: none;
        }
        .pricing-btn:hover {
          background: rgba(255,255,255,0.1);
        }
        .pricing-card.popular .pricing-btn:hover {
          opacity: 0.9;
          box-shadow: 0 10px 25px rgba(139,92,246,0.3);
        }
        @media (max-width: 1024px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          .pricing-card.popular { transform: none; z-index: 1; }
          .pricing-card.popular:hover { transform: translateY(-10px); }
        }
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr; }
        }
      </style>

      <section class="pricing-section">
        <div class="pricing-header">
          <span class="pricing-subtitle">Pricing Plans</span>
          <h2 class="pricing-title">Social Media Management</h2>
        </div>
        
        <div class="pricing-grid">
          
          <!-- Basic Plan -->
          <div class="pricing-card">
            <div class="pricing-name">Starter</div>
            <div class="pricing-price"><span class="currency">Rs</span> 15,000 <span class="duration">/mo</span></div>
            <ul class="pricing-features">
              <li><i data-lucide="check-circle-2"></i> 10 Premium Social Media Posts</li>
              <li><i data-lucide="check-circle-2"></i> 5 Story Designs</li>
              <li><i data-lucide="check-circle-2"></i> 2 Reels / Short Videos</li>
              <li><i data-lucide="check-circle-2"></i> Facebook, Instagram, TikTok</li>
              <li><i data-lucide="check-circle-2"></i> Premium Graphic Design</li>
              <li><i data-lucide="check-circle-2"></i> Professional Copywriting</li>
              <li><i data-lucide="check-circle-2"></i> Advanced Hashtag Research</li>
              <li><i data-lucide="check-circle-2"></i> Ad Campaign Management<br><span style="font-size:0.8rem; color:rgba(255,255,255,0.4); margin-top:2px;">(Ad Budget Not Included)</span></li>
              <li><i data-lucide="check-circle-2"></i> Competitor Analysis</li>
              <li><i data-lucide="check-circle-2"></i> Detailed Analytics Report</li>
            </ul>
            <a href="#contact" class="pricing-btn">Get Quotes</a>
          </div>

          <!-- Standard Plan (Popular) -->
          <div class="pricing-card popular">
            <div class="popular-badge">Most Popular</div>
            <div class="pricing-name">Standard</div>
            <div class="pricing-price"><span class="currency">Rs</span> 25,000 <span class="duration">/mo</span></div>
            <ul class="pricing-features">
              <li><i data-lucide="check-circle-2"></i> 20 Premium Social Media Posts</li>
              <li><i data-lucide="check-circle-2"></i> 10 Story Designs</li>
              <li><i data-lucide="check-circle-2"></i> 3 Reels / Short Videos</li>
              <li><i data-lucide="check-circle-2"></i> Facebook, IG, TikTok & LinkedIn</li>
              <li><i data-lucide="check-circle-2"></i> Premium Graphic Design</li>
              <li><i data-lucide="check-circle-2"></i> Professional Copywriting</li>
              <li><i data-lucide="check-circle-2"></i> Advanced Hashtag Research</li>
              <li><i data-lucide="check-circle-2"></i> Ad Campaign Management<br><span style="font-size:0.8rem; color:rgba(255,255,255,0.4); margin-top:2px;">(Ad Budget Not Included)</span></li>
              <li><i data-lucide="check-circle-2"></i> Monthly Strategy Meeting</li>
              <li><i data-lucide="check-circle-2"></i> Competitor Analysis</li>
              <li><i data-lucide="check-circle-2"></i> Detailed Analytics Report</li>
              <li><i data-lucide="check-circle-2"></i> Priority Support</li>
            </ul>
            <a href="#contact" class="pricing-btn">Get Quotes</a>
          </div>

          <!-- Premium Plan -->
          <div class="pricing-card">
            <div class="pricing-name">Advanced</div>
            <div class="pricing-price"><span class="currency">Rs</span> 40,000 <span class="duration">/mo</span></div>
            <ul class="pricing-features">
              <li><i data-lucide="check-circle-2"></i> 30+ Premium Social Media Posts</li>
              <li><i data-lucide="check-circle-2"></i> 15 Story Designs</li>
              <li><i data-lucide="check-circle-2"></i> 5 Reels / Short Videos</li>
              <li><i data-lucide="check-circle-2"></i> Facebook, IG, TikTok & LinkedIn</li>
              <li><i data-lucide="check-circle-2"></i> Premium Graphic Design</li>
              <li><i data-lucide="check-circle-2"></i> Professional Copywriting</li>
              <li><i data-lucide="check-circle-2"></i> Advanced Hashtag Research</li>
              <li><i data-lucide="check-circle-2"></i> Content Calendar</li>
              <li><i data-lucide="check-circle-2"></i> Community Management</li>
              <li><i data-lucide="check-circle-2"></i> Ad Campaign Management<br><span style="font-size:0.8rem; color:rgba(255,255,255,0.4); margin-top:2px;">(Ad Budget Not Included)</span></li>
              <li><i data-lucide="check-circle-2"></i> Monthly Strategy Meeting</li>
              <li><i data-lucide="check-circle-2"></i> Competitor Analysis</li>
              <li><i data-lucide="check-circle-2"></i> Detailed Analytics Report</li>
              <li><i data-lucide="check-circle-2"></i> Priority Support</li>
            </ul>
            <a href="#contact" class="pricing-btn">Get Quotes</a>
          </div>

        </div>
      </section>

`;

const insertMarker = '      <!-- Get a Quote Section -->';
const index = content.indexOf(insertMarker);

if (index !== -1) {
  content = content.slice(0, index) + htmlBlock + content.slice(index);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Successfully inserted pricing packages.');
} else {
  console.log('Error: Could not find insert location.');
}
