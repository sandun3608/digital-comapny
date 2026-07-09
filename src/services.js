import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { createIcons, icons } from 'lucide'
import { submitQuote, getMediaOverrides } from './firebase.js'

// Safe Storage Helper for local files
const safeStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key)
    } catch (e) {
      return null
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (e) {
      return false
    }
  }
}

gsap.registerPlugin(ScrollTrigger)

// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// 2. Animations - Reveal Text (character by character, keeping words and line breaks intact)
document.querySelectorAll('.reveal-text').forEach(title => {
  const lines = title.innerHTML.split(/<br\s*\/?>/i)
  
  const formattedLines = lines.map(line => {
    const cleanLine = line.replace(/<[^>]*>/g, '').trim()
    const words = cleanLine.split(' ')
    
    return words.map(word => {
      const isAccentWord = word.toLowerCase().replace(/[^a-z]/g, '') === 'development'
      const chars = word.split('').map(char => 
        `<span class="char" style="display:inline-block; transform:translateY(105%); ${isAccentWord ? 'color: var(--accent);' : ''}">${char}</span>`
      ).join('')
      return `<span style="display:inline-block; white-space:nowrap;">${chars}</span>`
    }).join(' ')
  })
  
  title.innerHTML = formattedLines.map(line => `<span style="display:block; white-space:nowrap;">${line}</span>`).join('')
  
  gsap.to(title.querySelectorAll('.char'), {
    scrollTrigger: {
      trigger: title,
      start: 'top 85%',
    },
    y: 0,
    stagger: 0.02,
    duration: 1,
    ease: 'power3.out'
  })
})

// 3. Animations - Working Process Steps (if present)
const processSteps = document.querySelector('.process-steps')
if (processSteps) {
  gsap.from('.step', {
    scrollTrigger: {
      trigger: '.process-steps',
      start: 'top 70%',
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
  })
}

// 4. Initialize Lucide Icons
createIcons({ icons })

// 5. Quote Form Submission Handler
document.addEventListener('submit', async (e) => {
  const form = e.target.closest('.quote-form')
  if (!form) return
  
  e.preventDefault()
  
  const nameInput = form.querySelector('#client-name')
  const emailInput = form.querySelector('#client-email')
  const phoneInput = form.querySelector('#client-phone')
  const serviceLevelSelect = form.querySelector('#service-level')
  const detailsInput = form.querySelector('#project-details')
  
  if (!nameInput || !emailInput || !phoneInput || !detailsInput) return
  
  // Show loading state on submit button
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalBtnHTML = submitBtn ? submitBtn.innerHTML : ''
  if (submitBtn) {
    submitBtn.disabled = true
    submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> SENDING...`
    submitBtn.style.opacity = '0.7'
  }
  
  // Determine service name from path name
  const path = window.location.pathname
  const fileName = path.substring(path.lastIndexOf('/') + 1)
  let serviceName = 'General'
  if (fileName.includes('uiux-design')) serviceName = 'UI/UX Design'
  else if (fileName.includes('web-dev')) serviceName = 'Web Development'
  else if (fileName.includes('ecom-store')) serviceName = 'E-commerce'
  else if (fileName.includes('systems')) serviceName = 'Systems Development'
  else if (fileName.includes('social-media')) serviceName = 'Social Media'
  else if (fileName.includes('mobile-app')) serviceName = 'Mobile Apps'
  else if (fileName.includes('branding-design')) serviceName = 'Branding & Graphic Design'
  else if (fileName.includes('video-editing')) serviceName = 'Video Editing'
  else if (fileName.includes('post-design')) serviceName = 'Social Media Post Design'
  else if (fileName.includes('video-presenting')) serviceName = 'Video Presenting & Reels'
  else if (fileName.includes('seo-optimization')) serviceName = 'SEO & Backlink Strategy'
  
  const packageText = serviceLevelSelect 
    ? (serviceLevelSelect.options ? serviceLevelSelect.options[serviceLevelSelect.selectedIndex]?.text : serviceLevelSelect.value)
    : 'Standard Package'
  
  const quoteData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    service: serviceName,
    packageName: packageText || 'Standard Package',
    details: detailsInput.value.trim()
  }
  
  // Save to Firebase
  const result = await submitQuote(quoteData)
  
  // Also save to localStorage as fallback
  const localSubmission = {
    id: result.success ? result.id : 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    ...quoteData,
    status: 'Pending',
    date: new Date().toISOString(),
  }
  const existingSubmissions = JSON.parse(safeStorage.getItem('mylab_quote_submissions') || '[]')
  existingSubmissions.unshift(localSubmission)
  safeStorage.setItem('mylab_quote_submissions', JSON.stringify(existingSubmissions))
  
  // Reset form and button
  form.reset()
  if (submitBtn) {
    submitBtn.disabled = false
    submitBtn.innerHTML = originalBtnHTML
    submitBtn.style.opacity = '1'
  }
  
  if (result.success) {
    showToast('Quote request submitted successfully! We will contact you soon.')
  } else {
    showToast('Saved locally! It will sync when connection is restored.')
  }
})

function showToast(message) {
  const toast = document.createElement('div')
  toast.className = 'custom-toast'
  toast.style.position = 'fixed'
  toast.style.bottom = '30px'
  toast.style.right = '30px'
  toast.style.background = 'rgba(15, 15, 15, 0.95)'
  toast.style.border = '1px solid var(--accent)'
  toast.style.padding = '1rem 2rem'
  toast.style.borderRadius = '12px'
  toast.style.color = '#fff'
  toast.style.display = 'flex'
  toast.style.alignItems = 'center'
  toast.style.gap = '10px'
  toast.style.zIndex = '10002'
  toast.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.25)'
  toast.style.transform = 'translateY(50px)'
  toast.style.opacity = '0'
  toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  
  // Include standard inline SVG icon check-circle for backup if Lucide isn't loaded instantly
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
    <span>${message}</span>
  `
  
  document.body.appendChild(toast)
  
  setTimeout(() => {
    toast.style.transform = 'translateY(0)'
    toast.style.opacity = '1'
  }, 100)
  
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)'
    toast.style.opacity = '0'
    setTimeout(() => toast.remove(), 400)
  }, 4000)
}

// Media Overrides Loader
async function applyMediaOverrides() {
  // First apply whatever is in localStorage for instant rendering
  let overrides = JSON.parse(safeStorage.getItem('mylab_media_overrides') || '{}');
  const apply = (data) => {
    if (Object.keys(data).length === 0) return;
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
      const srcAttr = img.getAttribute('src');
      if (!srcAttr) return;
      for (const key in data) {
        if (srcAttr === key || srcAttr.endsWith(key)) {
          img.src = data[key];
        }
      }
    });
  };
  
  apply(overrides);

  // Then fetch from Firebase to update in the background
  try {
    const cloudOverrides = await getMediaOverrides();
    safeStorage.setItem('mylab_media_overrides', JSON.stringify(cloudOverrides));
    apply(cloudOverrides);
  } catch (e) {
    console.error("Failed to fetch media overrides from Firebase:", e);
  }
}
document.addEventListener('DOMContentLoaded', applyMediaOverrides);
applyMediaOverrides();

// Mobile/Click Dropdown Toggle Handler
const dropdownTrigger = document.querySelector('.dropdown-trigger');
if (dropdownTrigger) {
  dropdownTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const parent = dropdownTrigger.closest('.nav-dropdown');
    if (parent) {
      parent.classList.toggle('active');
    }
  });
  
  document.addEventListener('click', () => {
    const parent = dropdownTrigger.closest('.nav-dropdown');
    if (parent) {
      parent.classList.remove('active');
    }
  });
}
