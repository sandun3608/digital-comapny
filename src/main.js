import './style.css'
import { submitQuote, getMediaOverrides } from './firebase.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { createIcons, icons } from 'lucide'

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

gsap.registerPlugin(ScrollTrigger, Draggable)

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

lenis.on('scroll', ScrollTrigger.update)

// 2. Custom Cursor
const cursor = document.getElementById('custom-cursor')
const follower = document.getElementById('cursor-follower')

window.addEventListener('mousemove', (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 })
  gsap.to(follower, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.3, ease: 'power2.out' })
})

// 3. Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar')
  if (window.scrollY > 50) nav.classList.add('scrolled')
  else nav.classList.remove('scrolled')
})

// 4. Split Text word animation
function initSplitText() {
  const titles = document.querySelectorAll('#hero-title, .reveal-text')
  titles.forEach(title => {
    // If it contains a br tag, split sections by br to preserve line breaks
    const lines = title.innerHTML.split('<br>')
    const formattedLines = lines.map(line => {
      // Split words inside each line
      const cleanLine = line.replace(/<[^>]*>/g, '').trim()
      return cleanLine.split(' ').map(word => 
        `<span class="char-word-wrapper" style="display: inline-block; overflow: hidden; vertical-align: top;"><span class="char" style="display: inline-block; transform: translate3d(0, 100%, 0);">${word}</span></span>`
      ).join('&nbsp;')
    })
    title.innerHTML = formattedLines.join('<br>')
  })
}
initSplitText()

// Hero Timeline (initially paused, will be played by preloader exit)
const heroTl = gsap.timeline({ paused: true })
heroTl.from('.hero-bg img', { scale: 1.15, duration: 2.5, ease: 'power2.out' }, 0)
      .from('.hero-bg video', { opacity: 0, scale: 1.02, duration: 2.5, ease: 'power2.out' }, 0)
      .to('#hero-title .char', { y: 0, stagger: 0.02, duration: 1, ease: 'power4.out' }, '-=1.8')
      .from('.reveal-item', { y: 30, opacity: 0, stagger: 0.15, duration: 0.8 }, '-=0.8')

// Premium Preloader Animation Controller
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Check if visited in this session
  if (sessionStorage.getItem('mylab_visited') === 'true') {
    preloader.remove();
    document.body.style.overflow = 'auto';
    heroTl.play();
    return;
  }

  // Set visited key
  sessionStorage.setItem('mylab_visited', 'true');

  const chars = document.querySelectorAll('.preloader-char');
  const progress = document.querySelector('.preloader-progress');
  const preloaderContent = document.querySelector('.preloader-content');

  const preloaderTl = gsap.timeline();

  // 1. Stagger reveal letters (from bottom up)
  preloaderTl.to(chars, {
    opacity: 1,
    y: 0,
    stagger: 0.08,
    duration: 0.8,
    ease: 'power3.out'
  });

  // 2. Fill loader bar over 3.2s
  preloaderTl.to(progress, {
    width: '100%',
    duration: 3.2,
    ease: 'power1.inOut'
  }, '-=0.4');

  // Single-Panel Slide Up exit animation
  const exitLoader = () => {
    const exitTl = gsap.timeline({
      onComplete: () => {
        preloader.remove();
        document.body.style.overflow = 'auto';
        // Start Hero section animations
        heroTl.play();
      }
    });

    // 1. Fade out and slightly zoom/blur text content
    exitTl.to(preloaderContent, {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(5px)',
      duration: 0.6,
      ease: 'power2.inOut'
    })
    // 2. Slide the entire preloader panel up
    .to(preloader, {
      y: '-100vh',
      duration: 1.2,
      ease: 'power4.inOut'
    }, '-=0.35');
  };

  // Lock animation for exactly 4.2 seconds to ensure background assets load fully
  setTimeout(() => {
    if (document.readyState === 'complete') {
      exitLoader();
    } else {
      window.addEventListener('load', exitLoader);
    }
  }, 4200);
}
initPreloader();

// 5. Mask Reveal Animation
const revealers = document.querySelectorAll('.mask-revealer')
revealers.forEach(rev => {
  gsap.fromTo(rev, 
    { clipPath: 'inset(0 100% 0 0)' }, 
    { 
      clipPath: 'inset(0 0% 0 0)', 
      duration: 1.5, 
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: rev,
        start: 'top 85%',
      }
    }
  )
})

// 6. Horizontal Slider Logic
const sliders = document.querySelectorAll('.horizontal-slider-container')
sliders.forEach(slider => {
  const track = slider.querySelector('.slider-track')
  const progress = slider.nextElementSibling?.id === 'slider-progress-container' ? slider.nextElementSibling.querySelector('div') : null

  Draggable.create(track, {
    type: 'x',
    bounds: slider,
    inertia: true,
    onDrag: function() {
      if (progress) {
        const progressVal = gsap.utils.normalize(0, this.minX, this.x) * 100
        gsap.to(progress, { width: `${progressVal}%`, duration: 0.1 })
      }
    },
    onThrowUpdate: function() {
      if (progress) {
        const progressVal = gsap.utils.normalize(0, this.minX, this.x) * 100
        gsap.to(progress, { width: `${progressVal}%`, duration: 0.1 })
      }
    },
    edgeResistance: 0.65,
  })
})

// 7. Reveal Text on Scroll
const scrollTitles = document.querySelectorAll('.reveal-text')
scrollTitles.forEach(title => {
    gsap.to(title.querySelectorAll('.char'), {
        scrollTrigger: {
            trigger: title,
            start: 'top 85%',
        },
        y: 0,
        stagger: 0.015,
        duration: 1.2,
        ease: 'power3.out'
    })
})

// 8. Magnetic Buttons
const magnets = document.querySelectorAll('.magnetic, .btn')
magnets.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const bounds = el.getBoundingClientRect()
        const x = e.clientX - bounds.left - bounds.width / 2
        const y = e.clientY - bounds.top - bounds.height / 2
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.6, ease: 'power2.out' })
        gsap.to(follower, { scale: 3, backgroundColor: 'rgba(139, 92, 246, 0.15)', duration: 0.3 })
    })
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' })
        gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.3 })
    })
})

// 9. Stats Counter Animation
const counters = document.querySelectorAll('.stat-number')
counters.forEach(counter => {
  const target = +counter.getAttribute('data-target')
  const suffix = counter.getAttribute('data-suffix') || ''
  gsap.to(counter, {
    innerText: target,
    duration: 2,
    snap: { innerText: 1 },
    scrollTrigger: {
      trigger: counter,
      start: 'top 90%',
    },
    onUpdate: function() {
      counter.innerHTML = Math.ceil(counter.innerText).toLocaleString() + suffix
    }
  })
})
// 10. 3D Cover Flow Portfolio Showcase Logic
function initCoverFlow() {
  const showcaseContainers = document.querySelectorAll('.showcase-container')
  
  showcaseContainers.forEach(container => {
    const track = container.querySelector('.coverflow-track')
    if (!track) return

    const slides = Array.from(track.querySelectorAll('.coverflow-slide'))
    const dots = Array.from(container.querySelectorAll('.coverflow-dots .dot'))
    const prevBtn = container.querySelector('.coverflow-prev-btn')
    const nextBtn = container.querySelector('.coverflow-next-btn')

    let currentIndex = Math.floor(slides.length / 2)
    let autoPlayTimer = null

    function updateSlides() {
      const L = slides.length
      const isMobile = window.innerWidth <= 768
      const isPortrait = container.closest('.portrait-coverflow') !== null

      slides.forEach((slide, index) => {
        let offset = index - currentIndex
        const halfL = L / 2
        if (offset < -halfL) {
          offset += L
        } else if (offset >= halfL) {
          offset -= L
        }
        
        const absOffset = Math.abs(offset)
        const direction = offset > 0 ? 1 : (offset < 0 ? -1 : 0)
        
        let xOffset = 0
        let zOffset = 0
        let yOffset = 0
        let rotY = 0
        let opacity = 1
        let zIndex = 100 - absOffset * 10 // Center card is highest (100) so outer slides sit behind center
        let isCenter = offset === 0
        let scale = 1
        let blurVal = 0

        if (absOffset === 0) {
          xOffset = 0
          zOffset = 0
          yOffset = 0
          rotY = 0
          opacity = 1
          scale = 1.05
          blurVal = 0
          zIndex = 100
          slide.classList.add('active')
        } else if (absOffset === 1) {
          slide.classList.remove('active')
          rotY = direction * (isMobile ? 3 : 5)
          xOffset = direction * (isMobile ? 190 : 380)
          zOffset = 0
          yOffset = 0
          opacity = 0.88
          scale = 0.84
          blurVal = 0
          zIndex = 80
        } else if (absOffset === 2) {
          slide.classList.remove('active')
          rotY = direction * (isMobile ? 5 : 8)
          xOffset = direction * (isMobile ? 320 : 660)
          zOffset = 0
          yOffset = 0
          opacity = 0.65
          scale = 0.68
          blurVal = 0
          zIndex = 60
        } else {
          opacity = 0
          scale = 0.4
          xOffset = direction * 1000
          zOffset = 0
          yOffset = 0
          zIndex = 0
          slide.classList.remove('active')
        }

        slide.style.zIndex = zIndex

        gsap.to(slide, {
          x: xOffset,
          y: yOffset,
          rotationY: rotY,
          scale: scale,
          filter: blurVal > 0 ? `blur(${blurVal}px)` : 'none',
          opacity: opacity,
          zIndex: zIndex,
          autoAlpha: opacity > 0 ? 1 : 0,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto'
        })
      })

      dots.forEach((dot, index) => {
        if (index === currentIndex) dot.classList.add('active')
        else dot.classList.remove('active')
      })

      // Update progress bar & counter
      const currentSlideNumEl = document.getElementById('current-slide-num')
      const progressBarEl = document.getElementById('showcase-progress-bar')
      if (currentSlideNumEl) {
        currentSlideNumEl.textContent = String(currentIndex + 1).padStart(2, '0')
      }
      if (progressBarEl) {
        const percent = ((currentIndex + 1) / slides.length) * 100
        progressBarEl.style.width = `${percent}%`
      }
    }

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = slides.length - 1
      } else if (index >= slides.length) {
        currentIndex = 0
      } else {
        currentIndex = index
      }
      updateSlides()
      resetAutoPlay()
    }

    slides.forEach((slide, index) => {
      slide.addEventListener('click', (e) => {
        if (e.target.closest('.open-project-modal')) return
        if (currentIndex !== index) {
          e.preventDefault()
          goToSlide(index)
        }
      })
    })

    // Category Filtering
    const filterTabs = container.querySelectorAll('.filter-tab')
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'))
        tab.classList.add('active')

        const filter = tab.getAttribute('data-filter')
        if (filter === 'all') {
          goToSlide(0)
        } else {
          const targetIndex = slides.findIndex(s => s.getAttribute('data-category') === filter)
          if (targetIndex !== -1) {
            goToSlide(targetIndex)
          }
        }
      })
    })

    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1))
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1))
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index))
    })

    document.addEventListener('keydown', (e) => {
      const rect = track.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0
      if (!inViewport) return

      if (e.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1)
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentIndex + 1)
      }
    })

    // Drag / Swipe support for Mouse and Touch
    let startX = 0
    let isDragging = false

    const onStart = (e) => {
      if (e.target.closest('.open-project-modal')) return
      isDragging = true
      startX = e.pageX || (e.touches && e.touches[0].pageX) || 0
      stopAutoPlay()
    }

    const onEnd = (e) => {
      if (!isDragging) return
      isDragging = false
      const endX = e.pageX || (e.changedTouches && e.changedTouches[0].pageX) || 0
      const diffX = startX - endX
      const threshold = 40

      if (diffX > threshold) {
        goToSlide(currentIndex + 1)
      } else if (diffX < -threshold) {
        goToSlide(currentIndex - 1)
      } else {
        startAutoPlay()
      }
    }

    track.addEventListener('mousedown', onStart)
    track.addEventListener('mouseup', onEnd)
    track.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false
        startAutoPlay()
      }
    })

    track.addEventListener('touchstart', onStart, { passive: true })
    track.addEventListener('touchend', onEnd, { passive: true })

    function startAutoPlay() {
      stopAutoPlay()
      autoPlayTimer = setInterval(() => {
        goToSlide(currentIndex + 1)
      }, 4500)
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer)
    }

    function resetAutoPlay() {
      stopAutoPlay()
      startAutoPlay()
    }

    track.addEventListener('mouseenter', stopAutoPlay)

    updateSlides()
    startAutoPlay()

    window.addEventListener('resize', updateSlides)
  })
}

// Global Project Modal Logic
function initProjectModal() {
  const modal = document.getElementById('project-modal')
  if (!modal) return

  const closeBtn = modal.querySelector('.modal-close-btn')
  const modalImg = document.getElementById('modal-project-img')
  const modalTitle = document.getElementById('modal-project-title')
  const modalCat = document.getElementById('modal-project-cat')
  const modalDesc = document.getElementById('modal-project-desc')
  const modalStack = document.getElementById('modal-stack-tags')
  const modalUrl = document.getElementById('modal-url-display')

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-project-modal')
    if (!btn) return

    e.preventDefault()
    e.stopPropagation()

    const title = btn.getAttribute('data-title')
    const cat = btn.getAttribute('data-cat')
    const img = btn.getAttribute('data-img')
    const desc = btn.getAttribute('data-desc')
    const stackStr = btn.getAttribute('data-stack')

    if (modalTitle) modalTitle.textContent = title
    if (modalCat) modalCat.textContent = cat
    if (modalImg) modalImg.src = img
    if (modalDesc) modalDesc.textContent = desc
    if (modalUrl) modalUrl.textContent = `mylab.lk/case-studies/${title.toLowerCase().replace(/[^a-z0-0]/g, '-')}`

    if (modalStack && stackStr) {
      const tags = stackStr.split(',').map(s => `<span class="tech-tag">${s.trim()}</span>`).join('')
      modalStack.innerHTML = tags
    }

    modal.classList.add('active')
    modal.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
  })

  function closeModal() {
    modal.classList.remove('active')
    modal.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal()
    }
  })
}

initCoverFlow()
initProjectModal()

// Awards Slider Logic
function initAwardsSlider() {
  const track = document.getElementById('awards-track');
  const prevBtn = document.getElementById('awards-prev');
  const nextBtn = document.getElementById('awards-next');
  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function getVisibleCardsCount() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 5;
  }

  function updateSlider() {
    const cards = track.querySelectorAll('.award-card');
    const totalCards = cards.length;
    const visibleCards = getVisibleCardsCount();
    const maxIndex = totalCards - visibleCards;

    // Boundary check
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    // Calculate translation percentage
    if (cards.length > 0) {
      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(track).gap || 0);
      const moveDistance = currentIndex * (cardWidth + gap);
      track.style.transform = `translateX(-${moveDistance}px)`;
    }

    // Enable/disable buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    const cards = track.querySelectorAll('.award-card');
    const visibleCards = getVisibleCardsCount();
    if (currentIndex < cards.length - visibleCards) {
      currentIndex++;
      updateSlider();
    }
  });

  window.addEventListener('resize', updateSlider);
  
  // Initial run after icons & layout are ready
  setTimeout(updateSlider, 200);
}

initAwardsSlider();

// Make service glass cards fully clickable
document.querySelectorAll('.service-glass-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const link = card.querySelector('.service-link');
    if (link) {
      link.click();
    }
  });
});

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

// Lucide Icons
createIcons({ icons })

// Contact Form Firebase Submission Handler
const contactForm = document.querySelector('.modern-form-card')
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
    border: 1px solid ${isError ? '#ef4444' : 'var(--accent)'};
    padding: 1rem 2rem; border-radius: 12px; color: #fff;
    display: flex; align-items: center; gap: 10px; z-index: 10002;
    box-shadow: 0 10px 30px ${isError ? 'rgba(239, 68, 68, 0.25)' : 'rgba(139, 92, 246, 0.25)'};
    transform: translateY(50px); opacity: 0;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `
  const icon = isError
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`
  toast.innerHTML = `${icon}<span>${message}</span>`
  document.body.appendChild(toast)
  setTimeout(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1' }, 100)
  setTimeout(() => { toast.style.transform = 'translateY(20px)'; toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400) }, 4000)
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

// Dynamic Mobile Menu Injection
function initMobileMenu() {
  const navbar = document.getElementById('navbar');
  if (navbar && !document.getElementById('mobile-menu-toggle')) {
    const toggle = document.createElement('button');
    toggle.id = 'mobile-menu-toggle';
    toggle.setAttribute('aria-label', 'Toggle Menu');
    toggle.innerHTML = `
      <svg class="hamburger-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
      <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
    `;
    navbar.appendChild(toggle);

    const navLinks = document.querySelector('.nav-links');
    const navSocials = document.querySelector('.nav-socials');

    // Create and append mobile socials inside nav-links menu
    if (navLinks && !navLinks.querySelector('.mobile-socials')) {
      const mobileSocials = document.createElement('div');
      mobileSocials.className = 'mobile-socials';
      mobileSocials.innerHTML = `
        <a href="#" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
        <a href="#" aria-label="X"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
        <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
      `;
      navLinks.appendChild(mobileSocials);
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navbar.classList.toggle('mobile-nav-open');
      if (isOpen) {
        toggle.querySelector('.hamburger-icon').style.display = 'none';
        toggle.querySelector('.close-icon').style.display = 'block';
        if (navLinks) navLinks.classList.add('active');
        if (navSocials) navSocials.classList.add('active');
      } else {
        toggle.querySelector('.hamburger-icon').style.display = 'block';
        toggle.querySelector('.close-icon').style.display = 'none';
        if (navLinks) navLinks.classList.remove('active');
        if (navSocials) navSocials.classList.remove('active');
      }
    });

    // Close menu when clicking links (except dropdown triggers)
    if (navLinks) {
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (link.classList.contains('dropdown-trigger')) return;
          navbar.classList.remove('mobile-nav-open');
          toggle.querySelector('.hamburger-icon').style.display = 'block';
          toggle.querySelector('.close-icon').style.display = 'none';
          navLinks.classList.remove('active');
          if (navSocials) navSocials.classList.remove('active');
        });
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFloatingSocialNotch();
  initCardScrollAnimations();
});
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initMobileMenu();
  initFloatingSocialNotch();
  initCardScrollAnimations();
}

// Dynamic Floating Social Media Side Notch Injection
function initFloatingSocialNotch() {
  if (!document.querySelector('.floating-social-notch')) {
    const notch = document.createElement('div');
    notch.className = 'floating-social-notch';
    notch.innerHTML = `
      <a href="https://wa.me/94724729166" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="notch-whatsapp">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </a>
      <a href="https://web.facebook.com/profile.php?id=61581934980767" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="notch-facebook">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/mylab-lk-10596040a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="notch-linkedin">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
    `;
    document.body.appendChild(notch);
  }
}

// 3D Glide Scroll Animations for Showcase and Grid Cards
function initCardScrollAnimations() {
  // 1. Showcase Carousel Cards (glide up and scale in)
  gsap.utils.toArray('.award-card').forEach((card) => {
    gsap.fromTo(card, 
      { opacity: 0.3, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          end: "top 75%",
          scrub: 1.2,
        }
      }
    );
  });

  // 2. Services Grid Glass Cards (smooth float up and reveal)
  gsap.utils.toArray('.service-glass-card').forEach((card) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 90, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          end: "top 78%",
          scrub: 1.2,
        }
      }
    );
  });
}

// 5. Mobile Bento Carousel Scroll and Click Handler
function initBentoMobileSlider() {
  const grid = document.querySelector('.creative-bento-grid');
  const dots = document.querySelectorAll('.bento-dot');
  
  if (grid && dots.length > 0) {
    grid.addEventListener('scroll', () => {
      if (window.innerWidth > 768) return;
      
      const scrollLeft = grid.scrollLeft;
      const scrollWidth = grid.scrollWidth;
      const clientWidth = grid.clientWidth;
      
      // Calculate active index based on scroll position ratio
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;
      
      const ratio = scrollLeft / maxScroll;
      const index = Math.min(dots.length - 1, Math.max(0, Math.round(ratio * (dots.length - 1))));
      
      dots.forEach((dot, idx) => {
        if (idx === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    });

    // Make dots clickable
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const scrollWidth = grid.scrollWidth;
        const clientWidth = grid.clientWidth;
        const maxScroll = scrollWidth - clientWidth;
        const targetScroll = (maxScroll / (dots.length - 1)) * idx;
        
        grid.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      });
    });
  }
}

// Initialize on load
initBentoMobileSlider();
window.addEventListener('resize', initBentoMobileSlider);

