import './style.css'
import { submitQuote } from './firebase.js'
import { gsap } from 'gsap'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { createIcons, icons } from 'lucide'

// Safe Storage Helper
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

// Initialize Lucide Icons
createIcons({ icons })

// 1. Lenis Smooth Scroll
const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// 2. Custom Cursor
const cursor = document.getElementById('custom-cursor')
const follower = document.getElementById('cursor-follower')

if (cursor && follower) {
  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 })
    gsap.to(follower, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.3, ease: 'power2.out' })
  })
}

// 4. Form submission handler
const contactForm = document.getElementById('contact-page-form')
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const nameInput = document.getElementById('quote-name')
    const emailInput = document.getElementById('quote-email')
    const serviceSelect = document.getElementById('quote-service')
    const messageInput = document.getElementById('quote-message')
    
    if (!nameInput || !emailInput || !messageInput) return
    
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalBtnHTML = submitBtn.innerHTML
    submitBtn.disabled = true
    submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> SENDING...`
    submitBtn.style.opacity = '0.7'
    
    const quoteData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: '',
      service: serviceSelect ? serviceSelect.value : 'General',
      packageName: 'N/A',
      details: messageInput.value.trim()
    }
    
    // Save to Firebase
    const result = await submitQuote(quoteData)
    
    // Also save to localStorage as fallback
    const localSubmission = {
      id: result.success ? result.id : 'local_' + Date.now(),
      ...quoteData,
      status: 'Pending',
      date: new Date().toISOString()
    }
    const existing = JSON.parse(safeStorage.getItem('mylab_quote_submissions') || '[]')
    existing.unshift(localSubmission)
    safeStorage.setItem('mylab_quote_submissions', JSON.stringify(existing))
    
    // Reset form
    contactForm.reset()
    submitBtn.disabled = false
    submitBtn.innerHTML = originalBtnHTML
    submitBtn.style.opacity = '1'
    
    if (result.success) {
      showFormToast('Quote submitted successfully! We will contact you soon.', false)
    } else {
      showFormToast('Saved locally! It will sync when connection is restored.', false)
    }
  })
}

// Toast notification for form submissions
function showFormToast(message, isError = false) {
  const toast = document.createElement('div')
  toast.style.cssText = `
    position: fixed; bottom: 30px; right: 30px;
    background: rgba(15, 15, 15, 0.95);
    border: 1px solid ${isError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(139, 92, 246, 0.2)'};
    color: #fff; padding: 1rem 1.5rem; border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    z-index: 999999; font-weight: 600; font-size: 0.9rem;
    backdrop-filter: blur(10px); display: flex; align-items: center; gap: 10px;
    transform: translateY(100px); opacity: 0; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  `
  const icon = isError ? 
    `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>` : 
    `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`

  toast.innerHTML = `${icon} <span>${message}</span>`
  document.body.appendChild(toast)
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateY(0)'
    toast.style.opacity = '1'
  }, 100)
  
  // Auto remove
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)'
    toast.style.opacity = '0'
    setTimeout(() => toast.remove(), 400)
  }, 4000)
}
