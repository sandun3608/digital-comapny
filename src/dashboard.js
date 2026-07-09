import { createIcons, icons } from 'lucide'
import { listenToSubmissions, updateSubmissionStatus, deleteSubmission as firebaseDeleteSubmission } from './firebase.js'
import { saveMediaOverride, deleteMediaOverride, getMediaOverrides } from './firebase.js'

// Safe Storage Wrappers to prevent SecurityError crashes under local file:/// systems
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
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      return false
    }
  }
}

const safeSession = {
  getItem: (key) => {
    try {
      return sessionStorage.getItem(key)
    } catch (e) {
      return null
    }
  },
  setItem: (key, value) => {
    try {
      sessionStorage.setItem(key, value)
      return true
    } catch (e) {
      return false
    }
  },
  removeItem: (key) => {
    try {
      sessionStorage.removeItem(key)
      return true
    } catch (e) {
      return false
    }
  }
}

// Custom Cursor Logic
const initCursor = () => {
  const cursor = document.getElementById('custom-cursor')
  const follower = document.getElementById('cursor-follower')
  if (!cursor || !follower) return
  
  window.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    follower.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`
  })
  
  // Hover effects
  document.querySelectorAll('a, button, select, input, textarea, tr').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(1.5)'
      follower.style.borderColor = 'rgba(255, 255, 255, 0.8)'
      follower.style.transform += ' scale(0.8)'
    })
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '')
      follower.style.borderColor = 'var(--accent)'
      follower.style.transform = follower.style.transform.replace(' scale(0.8)', '')
    })
  })
}

// Authentication Logic
const PASSWORD_HASH = 'admin123' // default password

const checkAuth = () => {
  let isAuth = safeSession.getItem('mylab_admin_authenticated') === 'true'
  
  // Check URL token parameter fallback (vital for sandboxed file:// frames)
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('token') === PASSWORD_HASH) {
    isAuth = true
    safeSession.setItem('mylab_admin_authenticated', 'true')
  }

  const authOverlay = document.getElementById('auth-overlay')
  const dashboardWrapper = document.getElementById('dashboard-wrapper')
  
  if (isAuth) {
    authOverlay.style.display = 'none'
    dashboardWrapper.classList.add('active')
    initDashboard()
  } else {
    authOverlay.style.display = 'flex'
    dashboardWrapper.classList.remove('active')
    initAuthForm()
  }
}

const initAuthForm = () => {
  const form = document.getElementById('auth-form')
  const passwordInput = document.getElementById('admin-password')
  const errorMsg = document.getElementById('auth-error-msg')
  
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (passwordInput.value === PASSWORD_HASH) {
      safeSession.setItem('mylab_admin_authenticated', 'true')
      
      // Redirect to set token query param to ensure persistence on file:/// local browser sessions
      const url = new URL(window.location.href)
      url.searchParams.set('token', PASSWORD_HASH)
      window.location.href = url.toString()
    } else {
      errorMsg.style.display = 'block'
      passwordInput.value = ''
      passwordInput.focus()
    }
  })
}

// Global State
let submissions = []
let activeSubmissionId = null

const initDashboard = () => {
  // Load data
  loadSubmissions()
  
  // Render Dashboard
  renderStats()
  renderChart()
  renderTable()
  
  // Setup Event Listeners
  setupFilters()
  setupModal()
  setupLogout()
  setupTabs()
  
  // Initialize icons
  createIcons({ icons })
  
  // Custom Cursor
  initCursor()
}

const loadSubmissions = () => {
  // First load from localStorage as fallback
  submissions = JSON.parse(safeStorage.getItem('mylab_quote_submissions') || '[]')
  
  // Then set up real-time Firestore listener
  listenToSubmissions((firebaseSubmissions) => {
    submissions = firebaseSubmissions
    renderStats()
    renderChart()
    renderTable()
  })
}

// Render Stats
const renderStats = () => {
  const total = submissions.length
  const pending = submissions.filter(s => s.status === 'Pending').length
  const contacted = submissions.filter(s => s.status === 'Contacted').length
  const completed = submissions.filter(s => s.status === 'Completed').length
  
  document.getElementById('stat-total').innerText = total
  document.getElementById('stat-pending').innerText = pending
  document.getElementById('stat-contacted').innerText = contacted
  document.getElementById('stat-completed').innerText = completed
}

// Render Bar Chart
const renderChart = () => {
  // Counts by service category
  const categories = {
    'UI/UX Design': 0,
    'Web Development': 0,
    'E-commerce': 0,
    'Mobile Apps': 0,
    'Systems Development': 0,
    'Social Media': 0,
    'Branding & Graphic Design': 0,
    'Video Editing': 0,
    'Social Media Post Design': 0,
    'Video Presenting & Reels': 0,
    'SEO & Backlink Strategy': 0
  }
  
  submissions.forEach(s => {
    if (categories[s.service] !== undefined) {
      categories[s.service]++
    }
  })
  
  // Find max value to normalize height
  const counts = Object.values(categories)
  const max = Math.max(...counts, 1) // default to 1 to avoid division by zero
  
  // Map bars to DOM elements
  const barMapping = {
    'UI/UX Design': 'bar-uiux',
    'Web Development': 'bar-web',
    'E-commerce': 'bar-ecom',
    'Mobile Apps': 'bar-mobile',
    'Systems Development': 'bar-systems',
    'Social Media': 'bar-social',
    'Branding & Graphic Design': 'bar-branding',
    'Video Editing': 'bar-video-editing',
    'Social Media Post Design': 'bar-post-design',
    'Video Presenting & Reels': 'bar-video-presenting',
    'SEO & Backlink Strategy': 'bar-seo'
  }
  
  Object.keys(categories).forEach(service => {
    const elementId = barMapping[service]
    const count = categories[service]
    const element = document.getElementById(elementId)
    if (element) {
      const percentage = (count / max) * 100
      element.style.height = `${percentage}%`
      element.setAttribute('data-value', count)
    }
  })
}

// Render Submissions Table
const renderTable = () => {
  const tableBody = document.getElementById('submissions-table-body')
  const searchInput = document.getElementById('search-input')
  const filterService = document.getElementById('filter-service')
  const filterStatus = document.getElementById('filter-status')
  
  const query = searchInput.value.toLowerCase().trim()
  const serviceFilter = filterService.value
  const statusFilter = filterStatus.value
  
  // Filter submissions
  const filtered = submissions.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query) ||
      s.phone.toLowerCase().includes(query) ||
      s.details.toLowerCase().includes(query)
      
    const matchesService = serviceFilter === 'all' || s.service === serviceFilter
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter
    
    return matchesSearch && matchesService && matchesStatus
  })
  
  // Clear Table
  tableBody.innerHTML = ''
  
  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="no-submissions-row">
          <i data-lucide="inbox" style="width: 48px; height: 48px; margin-bottom: 1rem; opacity: 0.3; display: inline-block;"></i>
          <p>No quote requests found matching current filters.</p>
        </td>
      </tr>
    `
    createIcons({ icons })
    return
  }
  
  // Populate Table Rows
  filtered.forEach(s => {
    const row = document.createElement('tr')
    row.setAttribute('data-id', s.id)
    
    // Format Date
    const dateFormatted = new Date(s.date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    
    const statusClass = s.status.toLowerCase()
    
    row.innerHTML = `
      <td>${dateFormatted}</td>
      <td style="font-weight: 700;">${escapeHTML(s.name)}</td>
      <td>
        <div style="display:flex; flex-direction:column; gap: 4px;">
          <span>${escapeHTML(s.email)}</span>
          <span style="color:var(--text-secondary); font-size:0.85rem;">${escapeHTML(s.phone)}</span>
        </div>
      </td>
      <td><span class="tag-service">${escapeHTML(s.service)}</span></td>
      <td style="color:var(--text-secondary); font-size:0.9rem;">${escapeHTML(s.packageName)}</td>
      <td><span class="status-badge ${statusClass}">${escapeHTML(s.status)}</span></td>
      <td>
        <div class="table-actions" onclick="event.stopPropagation();">
          <button class="btn-table-action view-action" title="View details" data-id="${s.id}">
            <i data-lucide="eye"></i>
          </button>
          <button class="btn-table-action delete-action" title="Delete request" data-id="${s.id}">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </td>
    `
    
    // Clicking row opens details
    row.addEventListener('click', () => openDetails(s.id))
    
    tableBody.appendChild(row)
  })
  
  // Attach button action listeners
  tableBody.querySelectorAll('.view-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id')
      openDetails(id)
    })
  })
  
  tableBody.querySelectorAll('.delete-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id')
      handleDeleteSubmission(id)
    })
  })
  
  // Refresh icons
  createIcons({ icons })
  
  // Re-run cursor binds to attach hover events to new table elements
  initCursor()
}

// Search and Filter Handlers
const setupFilters = () => {
  document.getElementById('search-input').addEventListener('input', renderTable)
  document.getElementById('filter-service').addEventListener('change', renderTable)
  document.getElementById('filter-status').addEventListener('change', renderTable)
}

// Modal View details
const openDetails = (id) => {
  const s = submissions.find(item => item.id === id)
  if (!s) return
  
  activeSubmissionId = id
  
  // Format Date
  const dateFormatted = new Date(s.date).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
  
  document.getElementById('detail-name').innerText = s.name
  document.getElementById('detail-date').innerText = dateFormatted
  document.getElementById('detail-email').innerText = s.email
  document.getElementById('detail-phone').innerText = s.phone
  document.getElementById('detail-service').innerText = s.service
  document.getElementById('detail-package').innerText = s.packageName
  document.getElementById('detail-desc').innerText = s.details
  
  // Set Active status button
  updateModalStatusButtons(s.status)
  
  // Open Modal
  const modal = document.getElementById('detail-modal')
  modal.classList.add('active')
}

const updateModalStatusButtons = (currentStatus) => {
  const btnPending = document.getElementById('btn-status-pending')
  const btnContacted = document.getElementById('btn-status-contacted')
  const btnCompleted = document.getElementById('btn-status-completed')
  
  btnPending.classList.remove('active')
  btnContacted.classList.remove('active')
  btnCompleted.classList.remove('active')
  
  if (currentStatus === 'Pending') btnPending.classList.add('active')
  else if (currentStatus === 'Contacted') btnContacted.classList.add('active')
  else if (currentStatus === 'Completed') btnCompleted.classList.add('active')
}

// Modal Handlers
const setupModal = () => {
  const modal = document.getElementById('detail-modal')
  const closeBtn = document.getElementById('modal-close')
  
  const closeModal = () => {
    modal.classList.remove('active')
    activeSubmissionId = null
  }
  
  closeBtn.addEventListener('click', closeModal)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })
  
  // Status change button handlers inside Modal
  document.getElementById('btn-status-pending').addEventListener('click', () => updateStatus('Pending'))
  document.getElementById('btn-status-contacted').addEventListener('click', () => updateStatus('Contacted'))
  document.getElementById('btn-status-completed').addEventListener('click', () => updateStatus('Completed'))
}

// Update submission status
const updateStatus = async (newStatus) => {
  if (!activeSubmissionId) return
  
  // Update in Firebase
  const result = await updateSubmissionStatus(activeSubmissionId, newStatus)
  if (!result.success) {
    showToast('Failed to update status: ' + (result.error || 'Unknown error'), true)
    return
  }
  
  // Also update local array for immediate UI response
  submissions = submissions.map(s => {
    if (s.id === activeSubmissionId) {
      return { ...s, status: newStatus }
    }
    return s
  })
  
  // Refresh Views
  renderStats()
  renderChart()
  renderTable()
  
  // Update modal button state
  updateModalStatusButtons(newStatus)
  
  showToast(`Status updated to ${newStatus}`)
}

// Delete submission
const handleDeleteSubmission = async (id) => {
  const confirmed = confirm('Are you sure you want to delete this submission?')
  if (!confirmed) return
  
  // Delete from Firebase
  const result = await firebaseDeleteSubmission(id)
  if (!result.success) {
    showToast('Failed to delete: ' + (result.error || 'Unknown error'), true)
    return
  }
  
  // Also remove locally for immediate UI response
  submissions = submissions.filter(s => s.id !== id)
  
  // Refresh Views
  renderStats()
  renderChart()
  renderTable()
  
  showToast('Submission deleted successfully')
}

// Toast notification helper
const showToast = (message, isError = false) => {
  const toast = document.createElement('div')
  toast.className = 'custom-toast'
  toast.style.position = 'fixed'
  toast.style.bottom = '30px'
  toast.style.right = '30px'
  toast.style.background = 'rgba(15, 15, 15, 0.95)'
  toast.style.border = isError ? '1px solid #ef4444' : '1px solid var(--accent-admin)'
  toast.style.padding = '1rem 2rem'
  toast.style.borderRadius = '12px'
  toast.style.color = '#fff'
  toast.style.display = 'flex'
  toast.style.alignItems = 'center'
  toast.style.gap = '10px'
  toast.style.zIndex = '100002'
  toast.style.boxShadow = isError ? '0 10px 30px rgba(239, 68, 68, 0.25)' : '0 10px 30px rgba(139, 92, 246, 0.25)'
  toast.style.transform = 'translateY(50px)'
  toast.style.opacity = '0'
  toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  
  const iconMarkup = isError 
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-admin)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`

  toast.innerHTML = `
    ${iconMarkup}
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

// Escape HTML utility
const escapeHTML = (str) => {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Logout handler
const setupLogout = () => {
  document.getElementById('btn-logout').addEventListener('click', () => {
    safeSession.removeItem('mylab_admin_authenticated')
    const url = new URL(window.location.href)
    url.search = ''
    window.location.href = url.toString()
  })
}

// Media Manager Config & Rendering
const MEDIA_ASSETS = [
  { key: '/assets/s_web.png', name: 'Web Dev Mockup', defaultUrl: '/assets/s_web.png' },
  { key: '/assets/s_uiux.png', name: 'UI/UX Mockup', defaultUrl: '/assets/s_uiux.png' },
  { key: '/assets/s_ecom.png', name: 'E-commerce Mockup', defaultUrl: '/assets/s_ecom.png' },
  { key: '/assets/s_mobile.png', name: 'Mobile Apps Mockup', defaultUrl: '/assets/s_mobile.png' },
  { key: '/assets/s_system.png', name: 'Systems Mockup', defaultUrl: '/assets/s_system.png' },
  { key: '/assets/s_smm.png', name: 'Social Media Mockup', defaultUrl: '/assets/s_smm.png' },
  { key: '/assets/s_branding.png', name: 'Branding Mockup', defaultUrl: '/assets/s_branding.png' },
  { key: '/assets/s_video_edit.png', name: 'Video Editing Mockup', defaultUrl: '/assets/s_video_edit.png' },
  { key: '/assets/s_post_design.png', name: 'Post Design Mockup', defaultUrl: '/assets/s_post_design.png' },
  { key: '/assets/s_presenter.png', name: 'Video Presenter Mockup', defaultUrl: '/assets/s_presenter.png' },
  { key: '/assets/s_seo.png', name: 'SEO Mockup', defaultUrl: '/assets/s_seo.png' },
  { key: '/assets/intro_team.png', name: 'Team Hexagon Image', defaultUrl: '/assets/intro_team.png' },
  { key: '/assets/cta_person.png', name: 'CTA Banner Person', defaultUrl: '/assets/cta_person.png' },
  { key: '/assets/footer_logo.png', name: 'Footer Logo Image', defaultUrl: '/assets/footer_logo.png' },
  { key: '/sample/1.png', name: 'Portfolio Case 01', defaultUrl: '/sample/1.png' },
  { key: '/sample/2.png', name: 'Portfolio Case 02', defaultUrl: '/sample/2.png' },
  { key: '/sample/3.png', name: 'Portfolio Case 03', defaultUrl: '/sample/3.png' },
  { key: '/sample/4.png', name: 'Portfolio Case 04', defaultUrl: '/sample/4.png' },
  { key: '/sample/5.png', name: 'Portfolio Case 05', defaultUrl: '/sample/5.png' },
  { key: '/sample/6.png', name: 'Portfolio Case 06', defaultUrl: '/sample/6.png' }
]

const renderMediaManager = async () => {
  // Load overrides from Firebase first, fallback to localStorage
  let overrides = {}
  try {
    overrides = await getMediaOverrides()
    // Also sync to localStorage for frontend pages
    safeStorage.setItem('mylab_media_overrides', JSON.stringify(overrides))
  } catch (e) {
    overrides = JSON.parse(safeStorage.getItem('mylab_media_overrides') || '{}')
  }
  
  const container = document.getElementById('media-grid-container')
  if (!container) return

  container.innerHTML = MEDIA_ASSETS.map(asset => {
    const currentSrc = overrides[asset.key] || asset.defaultUrl
    const urlValue = overrides[asset.key] && !overrides[asset.key].startsWith('data:') ? overrides[asset.key] : ''
    const safeId = btoa(asset.key).replace(/=/g, '').substring(0, 15)
    
    return `
      <div class="media-manager-card" data-key="${asset.key}">
        <div class="media-preview-area">
          <img src="${currentSrc}" alt="${asset.name}" id="preview-${safeId}" />
        </div>
        <div class="media-info-area">
          <h3>${asset.name}</h3>
          <span class="media-path-badge">${asset.key}</span>
        </div>
        <div class="media-input-group">
          <label>Custom Image URL</label>
          <input type="text" placeholder="https://example.com/image.jpg" value="${urlValue}" class="media-url-input" />
        </div>
        <div class="media-input-group">
          <label>Or Upload File (max 5MB)</label>
          <label class="media-upload-btn-label" for="file-${safeId}">
            <i data-lucide="upload"></i> <span>Choose Local File</span>
            <input type="file" id="file-${safeId}" accept="image/*" class="media-file-input" />
          </label>
          <span class="file-name-text" style="font-size: 0.75rem; color: var(--text-secondary); text-align: center; display: block; margin-top: -0.3rem;"></span>
        </div>
        <div class="media-actions">
          <button class="media-btn-save"><i data-lucide="check"></i> Save</button>
          <button class="media-btn-reset"><i data-lucide="rotate-ccw"></i> Reset</button>
        </div>
      </div>
    `
  }).join('')

  // Setup event listeners for each card
  container.querySelectorAll('.media-manager-card').forEach(card => {
    const key = card.getAttribute('data-key')
    const safeId = btoa(key).replace(/=/g, '').substring(0, 15)
    const previewImg = document.getElementById(`preview-${safeId}`)
    const urlInput = card.querySelector('.media-url-input')
    const fileInput = card.querySelector('.media-file-input')
    const fileNameText = card.querySelector('.file-name-text')
    const saveBtn = card.querySelector('.media-btn-save')
    const resetBtn = card.querySelector('.media-btn-reset')
    let base64String = null

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0]
      if (!file) return

      if (file.size > 5 * 1024 * 1024) {
        showToast('File is too large! Maximum limit is 5MB for cloud storage.', true)
        fileInput.value = ''
        return
      }

      fileNameText.textContent = file.name
      const reader = new FileReader()
      reader.onload = (evt) => {
        base64String = evt.target.result
        previewImg.src = base64String
        urlInput.value = ''
      }
      reader.readAsDataURL(file)
    })

    saveBtn.addEventListener('click', async () => {
      const customUrl = urlInput.value.trim()
      const valueToSave = base64String || customUrl

      if (!valueToSave) {
        showToast('Please upload a file or enter an Image URL first.', true)
        return
      }

      saveBtn.disabled = true
      saveBtn.innerHTML = '<i data-lucide="loader"></i> Saving...'

      // Save to Firebase
      const result = await saveMediaOverride(key, valueToSave)
      
      // Also save to localStorage as fallback
      const currentOverrides = JSON.parse(safeStorage.getItem('mylab_media_overrides') || '{}')
      currentOverrides[key] = valueToSave
      safeStorage.setItem('mylab_media_overrides', JSON.stringify(currentOverrides))
      
      if (!base64String && customUrl) {
        previewImg.src = customUrl
      }

      saveBtn.disabled = false
      saveBtn.innerHTML = '<i data-lucide="check"></i> Save'
      createIcons({ icons })

      if (result.success) {
        showToast('Image saved to cloud! ☁️')
      } else {
        showToast('Saved locally. Cloud sync failed: ' + (result.error || ''), true)
      }
    })

    resetBtn.addEventListener('click', async () => {
      resetBtn.disabled = true
      resetBtn.innerHTML = '<i data-lucide="loader"></i> Resetting...'

      // Delete from Firebase
      await deleteMediaOverride(key)
      
      // Also delete from localStorage
      const currentOverrides = JSON.parse(safeStorage.getItem('mylab_media_overrides') || '{}')
      if (currentOverrides[key]) {
        delete currentOverrides[key]
        safeStorage.setItem('mylab_media_overrides', JSON.stringify(currentOverrides))
      }
      
      urlInput.value = ''
      fileInput.value = ''
      fileNameText.textContent = ''
      base64String = null
      
      const asset = MEDIA_ASSETS.find(a => a.key === key)
      previewImg.src = asset ? asset.defaultUrl : key

      resetBtn.disabled = false
      resetBtn.innerHTML = '<i data-lucide="rotate-ccw"></i> Reset'
      createIcons({ icons })
      
      showToast('Reset to original default asset.')
    })
  })

  // Re-run Lucide icons mapping
  createIcons({ icons })
}

// Tab switcher handler
const setupTabs = () => {
  const inquiriesBtn = document.getElementById('tab-inquiries-btn')
  const mediaBtn = document.getElementById('tab-media-btn')
  const inquiriesContent = document.getElementById('tab-content-inquiries')
  const mediaContent = document.getElementById('tab-content-media')

  if (!inquiriesBtn || !mediaBtn) return

  inquiriesBtn.addEventListener('click', () => {
    inquiriesBtn.classList.add('active')
    mediaBtn.classList.remove('active')
    inquiriesContent.style.display = 'block'
    mediaContent.style.display = 'none'
  })

  mediaBtn.addEventListener('click', () => {
    mediaBtn.classList.add('active')
    inquiriesBtn.classList.remove('active')
    inquiriesContent.style.display = 'none'
    mediaContent.style.display = 'block'
    renderMediaManager()
  })
}

// Run auth check on DOMContentLoaded
document.addEventListener('DOMContentLoaded', checkAuth)

// Backup run in case DOMContentLoaded has already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  checkAuth()
}
