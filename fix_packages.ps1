$serviceDir = "c:\Users\etsy dream\Desktop\new2\services"
$wa = "https://wa.me/94777123456?text=Hi%20MYLAB.LK%2C%20I%27m%20interested%20in%20your%20"

# Helper to build a price card
function card($title, $popular, $price, $period, $desc, $features, $btnText, $waMsg) {
  $popularBadge = if ($popular) { "`n              <div class=`"popular-badge`">MOST POPULAR</div>" } else { "" }
  $popularClass  = if ($popular) { " popular" } else { "" }
  $btnClass      = if ($popular) { "btn-primary" } else { "btn-outline" }
  $featureHtml   = ($features | ForEach-Object { "              <li><i data-lucide=`"check`"></i> $_</li>" }) -join "`n"
  $encodedMsg    = [System.Uri]::EscapeDataString($waMsg)
  return @"

          <div class="price-card$popularClass">$popularBadge
            <h4>$title</h4>
            <p style="font-size:0.82rem; color:rgba(255,255,255,0.45); margin: 0.3rem 0 1.2rem; line-height:1.5;">$desc</p>
            <div class="price">$price<span>/$period</span></div>
            <ul>
$featureHtml
            </ul>
            <a href="$wa$encodedMsg" target="_blank" class="btn $btnClass" style="width:100%; justify-content:center; margin-top:auto;">
              <i data-lucide="message-circle"></i> GET A QUOTE
            </a>
          </div>
"@
}

$packages = @{

  "web-dev.html" = @(
    card "Landing Page" $false "LKR 69,000" "Project" "Perfect for new businesses needing a strong first online presence." @(
      "Single Page Design";"Fully Mobile Responsive";"GSAP Scroll Animations";"Contact Form Integration";"Google Maps Embed";"Basic On-Page SEO";"1 Round of Revisions";"14-Day Delivery"
    ) "GET A QUOTE" "Web Development - Landing Page"

    card "Business Growth" $true "LKR 149,000" "Project" "A full multi-page website built to convert visitors into customers." @(
      "Up to 5 Custom Pages";"CMS (Update Content Yourself)";"Advanced GSAP Animations";"Full On-Page SEO Setup";"Blog / News Section";"Google Analytics Integration";"SSL & Security Setup";"2 Rounds of Revisions";"21-Day Delivery"
    ) "GET A QUOTE" "Web Development - Business Growth"

    card "Custom Web App" $false "LKR 399,000" "Project" "A fully engineered web application with backend systems and user logic." @(
      "Unlimited Pages & Sections";"Custom Backend Architecture";"User Login & Dashboard";"Database Integration";"API Connections";"Admin Panel";"Advanced Security";"Priority Support 3 Months";"30-Day Delivery"
    ) "GET A QUOTE" "Web Development - Custom Web App"
  )

  "mobile-app.html" = @(
    card "Starter App" $false "LKR 449,000" "Project" "A clean, functional mobile app for businesses entering the digital space." @(
      "iOS & Android (Flutter)";"Up to 5 Screen Layouts";"Basic UI Animations";"Firebase Auth (Email Login)";"Real-Time Database Sync";"Push Notifications";"App Store Submission";"1 Round of Revisions"
    ) "GET A QUOTE" "Mobile App - Starter"

    card "Business Plus" $true "LKR 749,000" "Project" "A feature-rich app that serves as a core business tool for your customers." @(
      "iOS & Android (Flutter)";"Up to 12 Screen Layouts";"Advanced Custom Animations";"Google & Biometric Login";"Real-Time Cloud Database";"In-App Payment Gateway";"GPS & Camera Integration";"Offline Mode Support";"App Store + Google Play";"2 Rounds of Revisions"
    ) "GET A QUOTE" "Mobile App - Business Plus"

    card "Enterprise" $false "LKR 1,200,000" "Project" "A scalable, secure enterprise-grade application for complex business systems." @(
      "Full Custom Architecture";"Unlimited Screens";"Custom Backend API";"Multi-Role User System";"Advanced Analytics Dashboard";"Third-Party API Integrations";"Dedicated QA Testing";"Priority 6-Month Support"
    ) "GET A QUOTE" "Mobile App - Enterprise"
  )

  "ecom-store.html" = @(
    card "Basic Store" $false "LKR 99,000" "Project" "Get your products online fast with a clean, ready-to-sell store." @(
      "Up to 50 Products";"Shopify or WooCommerce";"Mobile-Optimized Design";"PayHere / Stripe Integration";"Basic Inventory System";"Order Confirmation Emails";"SSL Security";"7-Day Delivery"
    ) "GET A QUOTE" "E-Commerce - Basic Store"

    card "E-com Pro" $true "LKR 199,000" "Project" "A fully optimized store designed to maximize sales and automate operations." @(
      "Up to 300 Products";"Custom Theme Design";"Multi-Payment Gateways";"Automated Inventory Alerts";"Discount & Coupon System";"Facebook & Instagram Shop";"Google Shopping Feed";"Abandoned Cart Recovery";"Advanced SEO Setup";"Admin Dashboard"
    ) "GET A QUOTE" "E-Commerce - Pro Store"

    card "Marketplace" $false "LKR 499,000" "Project" "A scalable multi-vendor marketplace platform for large-scale commerce." @(
      "Unlimited Products";"Multi-Vendor Support";"Custom Checkout Flow";"All Payment Gateways";"TikTok Shop Integration";"Affiliate & Referral System";"Full Admin & Analytics Panel";"Priority 3-Month Support"
    ) "GET A QUOTE" "E-Commerce - Marketplace"
  )

  "branding-design.html" = @(
    card "Starter Identity" $false "LKR 29,000" "Project" "Everything a new brand needs to launch with confidence and clarity." @(
      "Logo Design (3 Concepts)";"Brand Color Palette";"Typography Selection";"Business Card Design";"Social Media Profile Kit";"High-Res Source Files";"PNG + SVG Delivery";"5-Day Delivery"
    ) "GET A QUOTE" "Branding - Starter Identity"

    card "Growth Branding" $true "LKR 69,000" "Project" "A complete brand identity system for businesses ready to grow and scale." @(
      "Logo + 3 Variations";"Full Brand Color System";"Typography Guide";"Brand Book (PDF)";"Business Card + Letterhead";"Social Media Graphic Templates";"Flyer & Poster Design";"Email Signature Design";"All Source Files (AI + PSD)"
    ) "GET A QUOTE" "Branding - Growth Package"

    card "Enterprise Suite" $false "LKR 149,000" "Project" "A comprehensive corporate brand package for established or scaling businesses." @(
      "Premium Logo System";"Full Corporate Brand Book";"Stationery Full Suite";"Catalog / Brochure Design";"Custom Illustrations";"Packaging Design";"Brand Presentation Deck";"Unlimited Revisions";"Priority 2-Week Turnaround"
    ) "GET A QUOTE" "Branding - Enterprise Suite"
  )

  "seo-optimization.html" = @(
    card "Technical Audit" $false "LKR 25,000" "One-Time" "A full diagnostic of your website's current SEO health and quick wins." @(
      "Full Technical SEO Audit";"Keyword Gap Analysis";"Page Speed Report";"Broken Link Fixes";"Meta Tags Optimization";"Google Search Console Setup";"Sitemap Submission";"Detailed Action Report"
    ) "GET A QUOTE" "SEO - Technical Audit"

    card "Organic Growth" $true "LKR 35,000" "Month" "A monthly SEO retainer that steadily builds your Google rankings." @(
      "Everything in Audit";"10 Target Keywords";"On-Page Content Optimization";"Google My Business Management";"Monthly Backlink Building";"Blog Content Guidance";"Image & Alt-Tag Optimization";"Monthly Ranking Report"
    ) "GET A QUOTE" "SEO - Organic Growth"

    card "Market Dominator" $false "LKR 65,000" "Month" "Aggressive SEO for businesses targeting competitive top-3 rankings." @(
      "Everything in Organic Growth";"30+ Target Keywords";"Full Content Strategy";"Competitor Backlink Analysis";"Schema Markup Implementation";"Featured Snippet Targeting";"Weekly Progress Reports";"Dedicated SEO Manager"
    ) "GET A QUOTE" "SEO - Market Dominator"
  )

  "social-media.html" = @(
    card "Solo Pack" $false "LKR 19,000" "Month" "Consistent presence on one platform to build brand awareness." @(
      "1 Platform (Instagram or FB)";"12 Posts Per Month";"Custom Graphic Design";"Caption & Hashtag Writing";"Story Designs (4/Month)";"Audience Engagement";"Monthly Performance Report"
    ) "GET A QUOTE" "Social Media - Solo Pack"

    card "Brand Hub" $true "LKR 39,000" "Month" "Full management across two platforms with a strategic content approach." @(
      "2 Platforms";"20 Posts Per Month";"Custom Branded Templates";"Caption + Hashtag Strategy";"Story & Reel Designs";"Competitor Analysis";"Content Calendar";"Monthly Analytics Report"
    ) "GET A QUOTE" "Social Media - Brand Hub"

    card "Viral Mastery" $false "LKR 69,000" "Month" "A complete social media powerhouse for brands serious about growth." @(
      "3+ Platforms";"30+ Posts Per Month";"Full Brand Style System";"Reel / Short Video Edits";"Paid Ad Creative Design";"Influencer Outreach Support";"Weekly Strategy Calls";"Priority Response"
    ) "GET A QUOTE" "Social Media - Viral Mastery"
  )

  "systems.html" = @(
    card "Basic POS" $false "LKR 199,000" "Project" "A simple, reliable point-of-sale system for retail and service businesses." @(
      "Sales & Invoice Management";"Product & Stock Tracking";"Barcode Scanner Support";"Receipt Printer Integration";"Daily Sales Reports";"Single Terminal License";"Staff Login System";"6-Month Support"
    ) "GET A QUOTE" "Business Systems - Basic POS"

    card "Omnichannel OMS" $true "LKR 449,000" "Project" "A centralized order and operations system for growing multi-channel businesses." @(
      "Everything in Basic POS";"Multi-Location Support";"Order Management (OMS)";"Automated Invoice Generation";"Supplier Management";"Cloud-Based Access";"Multi-User Role System";"Customer CRM Module";"12-Month Support"
    ) "GET A QUOTE" "Business Systems - OMS"

    card "Full EMAS" $false "LKR 899,000" "Project" "A complete enterprise management system for complex, large-scale operations." @(
      "Everything in OMS";"Enterprise Asset Management";"QR / Barcode Asset Tracking";"Payroll & HR Module";"Full Financial Reporting";"Custom API Integrations";"White-Label Option";"Priority Lifetime Support"
    ) "GET A QUOTE" "Business Systems - Full EMAS"
  )

  "uiux-design.html" = @(
    card "Concept Pack" $false "LKR 45,000" "Project" "Core screens and user flow to validate your product idea quickly." @(
      "Up to 10 UI Screens";"User Flow Mapping";"Wireframe + Prototype";"Figma Design File";"Mobile-First Design";"2 Style Concepts";"Developer Handoff Ready";"7-Day Delivery"
    ) "GET A QUOTE" "UI/UX - Concept Pack"

    card "Full Product Design" $true "LKR 99,000" "Project" "A complete, production-ready UI/UX design system for your app or website." @(
      "Up to 30 UI Screens";"Full UX Research";"Clickable Figma Prototype";"Component Design System";"Motion & Micro-Animation Guide";"Desktop + Mobile Screens";"3 Rounds of Revisions";"Full Dev Handoff Package"
    ) "GET A QUOTE" "UI/UX - Full Product Design"

    card "Enterprise UI" $false "LKR 199,000" "Project" "A scalable design system built for complex enterprise products and teams." @(
      "Unlimited Screens";"Full User Research & Testing";"Advanced Prototype";"Design Token System";"Multi-Platform (Web + App)";"Accessibility Compliance";"Branded Style Guide";"Priority 4-Week Delivery"
    ) "GET A QUOTE" "UI/UX - Enterprise"
  )

  "video-editing.html" = @(
    card "Social Cut" $false "LKR 15,000" "Video" "Professional short-form edits optimized for social media engagement." @(
      "Up to 90 Seconds";"Color Grading";"Subtitle / Captions";"Background Music";"Text Animations";"Reels / TikTok Format";"1 Round of Revisions";"3-Day Delivery"
    ) "GET A QUOTE" "Video Editing - Social Cut"

    card "Commercial Promo" $true "LKR 35,000" "Video" "A polished promotional video for products, services, or brand campaigns." @(
      "Up to 3 Minutes";"Cinematic Color Grading";"Professional Sound Design";"Branded Intro & Outro";"Dynamic Text Graphics";"Multiple Format Exports";"2 Rounds of Revisions";"5-Day Delivery"
    ) "GET A QUOTE" "Video Editing - Commercial"

    card "Corporate / Event" $false "LKR 75,000" "Video" "Full-length corporate video or event highlight production." @(
      "Up to 10 Minutes";"Multi-Camera Edit";"Full Audio Mastering";"Custom Motion Graphics";"Lower Thirds & Titles";"YouTube & LinkedIn Ready";"Unlimited Revisions";"Priority 7-Day Delivery"
    ) "GET A QUOTE" "Video Editing - Corporate"
  )

  "video-presenting.html" = @(
    card "Shorts / Reels Pack" $false "LKR 20,000" "Pack" "5 presenter-style short videos for social media growth." @(
      "5 Videos (up to 60 sec each)";"Scriptwriting Assistance";"Teleprompter Script Format";"Color Correction";"Branded Text Overlays";"Captions & Subtitles";"Reels / Shorts Format";"5-Day Delivery"
    ) "GET A QUOTE" "Video Presenting - Shorts Pack"

    card "Cinematic Intro/Outro" $true "LKR 45,000" "Project" "A premium branded presenter video for your business or YouTube channel." @(
      "Up to 5 Minutes";"Full Script Writing";"Green Screen / BG Replace";"Cinematic Color Grade";"Branded Lower Thirds";"Animated Intro & Outro";"Professional Sound Mix";"2 Rounds of Revisions"
    ) "GET A QUOTE" "Video Presenting - Cinematic"

    card "Viral Presenter Suite" $false "LKR 99,000" "Month" "Ongoing monthly production of presenter videos for consistent content output." @(
      "8 Videos Per Month";"Full Scriptwriting";"Professional Teleprompter Edit";"All Formats (YT, IG, TikTok)";"Custom Brand Templates";"Thumbnail Design Included";"Analytics-Based Strategy";"Priority 3-Day Turnaround"
    ) "GET A QUOTE" "Video Presenting - Monthly Suite"
  )

  "post-design.html" = @(
    card "Basic Pack" $false "LKR 12,000" "Month" "A consistent monthly supply of branded posts for one platform." @(
      "10 Post Designs / Month";"Brand Color & Font Applied";"Instagram / Facebook Format";"Story Designs (4/Month)";"PNG + JPG Delivery";"2-Day Turnaround Per Batch";"1 Round of Revisions"
    ) "GET A QUOTE" "Post Design - Basic Pack"

    card "Standard Kit" $true "LKR 25,000" "Month" "A complete monthly content kit for brands that post regularly." @(
      "20 Post Designs / Month";"2 Platform Formats";"Carousel / Swipe Designs";"Highlight Cover Designs";"Story & Status Designs";"Editable Canva Templates";"Content Calendar Included";"2 Rounds of Revisions"
    ) "GET A QUOTE" "Post Design - Standard Kit"

    card "Pro Creator Kit" $false "LKR 45,000" "Month" "A premium full-service content design package for serious brands." @(
      "35+ Post Designs / Month";"3 Platform Formats";"Campaign & Event Designs";"Animated Post Graphics";"Custom Illustration Elements";"Full Brand Template System";"Priority Same-Day Revisions";"Dedicated Designer"
    ) "GET A QUOTE" "Post Design - Pro Kit"
  )
}

foreach ($file in $packages.Keys) {
  $path = "$serviceDir\$file"
  $content = Get-Content $path -Raw -Encoding UTF8

  # Fix section padding
  $content = $content -replace 'padding: 10rem 10%; background: var\(--bg-secondary\)', 'padding: 5rem 10% 4rem; background: var(--bg-secondary)'
  $content = $content -replace 'padding: 10rem 10%;">', 'padding: 5rem 10%;">'
  $content = $content -replace 'margin-bottom: 5rem;">', 'margin-bottom: 0;">'

  # Build new pricing grid
  $newGrid = "<div class=`"pricing-grid`">" + ($packages[$file] -join "") + "`n        </div>"

  # Replace existing pricing-grid block
  $pattern = '(?s)<div class="pricing-grid">.*?</div>(?=\s*</section>)'
  $content = [regex]::Replace($content, $pattern, $newGrid, [System.Text.RegularExpressions.RegexOptions]::Singleline)

  [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
  Write-Host "Done: $file"
}
Write-Host "All packages updated!"
