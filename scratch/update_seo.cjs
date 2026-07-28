const fs = require('fs');
const path = require('path');

const siteUrl = 'https://www.mylab.lk';
const defaultOgImage = `${siteUrl}/logo/3.png`; // Use the cropped logo image as fallback preview image

const pages = {
  'index.html': {
    title: 'MYLAB.LK | Creative Digital Agency',
    description: 'MYLAB.LK is a premium creative digital agency specializing in website development, mobile applications, UI/UX design, branding, and social media marketing solutions.',
    keywords: 'creative digital agency, website development, mobile app development, UI/UX design, branding, graphic design, social media marketing, Sri Lanka',
    canonical: `${siteUrl}/`,
    isHome: true
  },
  'contact.html': {
    title: 'Contact Us | MYLAB.LK | Creative Digital Agency',
    description: 'Get in touch with MYLAB.LK. Contact our expert team for website development, app design, UI/UX branding, and digital marketing inquiries.',
    keywords: 'contact mylab.lk, creative agency sri lanka, web developer contact, hire app designer',
    canonical: `${siteUrl}/contact.html`
  },
  'services/web-dev.html': {
    title: 'Website Development Services | MYLAB.LK',
    description: 'Professional website development services by MYLAB.LK. We design and build modern, fast, responsive, and SEO-friendly corporate websites and web applications.',
    keywords: 'website development, web design, corporate website, web development agency sri lanka, responsive web design',
    canonical: `${siteUrl}/services/web-dev.html`
  },
  'services/mobile-app.html': {
    title: 'Mobile Application Development | MYLAB.LK',
    description: 'Custom Android and iOS mobile app development services by MYLAB.LK. High-performance, user-friendly mobile applications tailored for your business.',
    keywords: 'mobile app development, Android app design, iOS app development, custom mobile apps, mobile app agency',
    canonical: `${siteUrl}/services/mobile-app.html`
  },
  'services/uiux-design.html': {
    title: 'UI/UX Design & Prototyping | MYLAB.LK',
    description: 'User Interface and User Experience design services by MYLAB.LK. User-centric prototypes, wireframes, and interface designs to elevate your digital products.',
    keywords: 'UIUX design, interface design, user experience, prototyping, Figma wireframes, UI design agency',
    canonical: `${siteUrl}/services/uiux-design.html`
  },
  'services/social-media.html': {
    title: 'Social Media Marketing Services | MYLAB.LK',
    description: 'Grow your brand presence online with MYLAB.LK\'s social media marketing. Content strategy, social media campaigns, page management, and paid advertising.',
    keywords: 'social media marketing, SMM agency, brand growth, Facebook marketing, page management, social media strategy',
    canonical: `${siteUrl}/services/social-media.html`
  },
  'services/branding-design.html': {
    title: 'Branding & Graphic Design | MYLAB.LK',
    description: 'Professional branding and graphic design services by MYLAB.LK — logos, packaging, product catalogs, brand identity, and social media templates.',
    keywords: 'branding agency, logo design, brand identity, graphic design services, package design, corporate branding',
    canonical: `${siteUrl}/services/branding-design.html`
  },
  'services/post-design.html': {
    title: 'Social Media Post Design | MYLAB.LK',
    description: 'Engaging, creative, and professional social media post designs by MYLAB.LK to boost customer engagement and elevate your brand aesthetic.',
    keywords: 'social media post design, post design agency, Instagram graphics, Facebook post designs, custom banners',
    canonical: `${siteUrl}/services/post-design.html`
  },
  'services/video-presenting.html': {
    title: 'Video Presenting & Reels Production | MYLAB.LK',
    description: 'High-impact video presenting, YouTube content, TikTok, and Instagram Reels production services by MYLAB.LK to tell your brand story visually.',
    keywords: 'video presenting, reels production, TikTok video marketing, YouTube video editing, promotional video production',
    canonical: `${siteUrl}/services/video-presenting.html`
  }
};

function getSeoBlock(info) {
  let schemaBlock = '';
  if (info.isHome) {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "MYLAB.LK",
      "image": defaultOgImage,
      "@id": `${siteUrl}/#organization`,
      "url": siteUrl,
      "telephone": "+94724729166",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kuliyapitiya",
        "addressCountry": "LK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 7.4567,
        "longitude": 80.0382
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": [
        "https://web.facebook.com/profile.php?id=61581934980767",
        "https://www.linkedin.com/in/mylab-lk-10596040a/",
        "https://www.instagram.com/"
      ]
    };
    schemaBlock = `\n    <script type="application/ld+json">\n    ${JSON.stringify(localBusinessSchema, null, 2).replace(/\n/g, '\n    ')}\n    </script>`;
  }

  return `
    <meta name="description" content="${info.description}" />
    <meta name="keywords" content="${info.keywords}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${info.canonical}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${info.canonical}" />
    <meta property="og:title" content="${info.title}" />
    <meta property="og:description" content="${info.description}" />
    <meta property="og:image" content="${defaultOgImage}" />
    <meta property="og:site_name" content="MYLAB.LK" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${info.canonical}" />
    <meta property="twitter:title" content="${info.title}" />
    <meta property="twitter:description" content="${info.description}" />
    <meta property="twitter:image" content="${defaultOgImage}" />${schemaBlock}`;
}

Object.entries(pages).forEach(([relPath, info]) => {
  const filePath = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update Title tag
  content = content.replace(/<title>[\s\S]*?<\/title>/, `<title>${info.title}</title>`);

  // 2. Remove existing descriptions, keywords, canonical tags, og tags, twitter tags, json-ld schema
  content = content.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, '');
  content = content.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/gi, '');
  content = content.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/gi, '');
  content = content.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, '');
  content = content.replace(/<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*\/?>/gi, '');
  content = content.replace(/<meta\s+property="twitter:[^"]*"\s+content="[^"]*"\s*\/?>/gi, '');
  content = content.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

  // 3. Inject new SEO tags after the title tag
  const seoBlock = getSeoBlock(info);
  content = content.replace(`</title>`, `</title>${seoBlock}`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`SEO Optimized: ${relPath}`);
});
