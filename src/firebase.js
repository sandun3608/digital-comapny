// ============================================================
// Firebase Configuration for MYLAB.LK
// ============================================================
// HOW TO SET UP:
// 1. Go to https://console.firebase.google.com/
// 2. Create a project (e.g., "mylab-website")
// 3. Add a Web App (click the </> icon)
// 4. Copy the firebaseConfig values below
// 5. Go to Firestore Database → Create Database (Start in Test Mode)
// ============================================================

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore'

// 🟢 FIREBASE CONFIG — MYLAB.LK
const firebaseConfig = {
  apiKey: "AIzaSyDF5At-ZLmjgkqXvqmTAdz9r3YKb1wBA84",
  authDomain: "mylab-3a423.firebaseapp.com",
  projectId: "mylab-3a423",
  storageBucket: "mylab-3a423.firebasestorage.app",
  messagingSenderId: "485889860212",
  appId: "1:485889860212:web:7dd80c74e1ac7440f2e721",
  measurementId: "G-7M60FRN7G6"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Collection reference
const submissionsRef = collection(db, 'quote_submissions')

// ---- PUBLIC API ----

/**
 * Submit a new quote request from the contact form
 */
export async function submitQuote({ name, email, phone, service, packageName, details }) {
  try {
    const docRef = await addDoc(submissionsRef, {
      name,
      email,
      phone: phone || '',
      service,
      packageName: packageName || 'N/A',
      details,
      status: 'Pending',
      createdAt: serverTimestamp(),
      date: new Date().toISOString()
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error submitting quote:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Listen to all submissions in real-time (for the dashboard)
 * @param {Function} callback - called with an array of submissions whenever data changes
 * @returns {Function} unsubscribe function
 */
export function listenToSubmissions(callback) {
  const q = query(submissionsRef, orderBy('date', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const submissions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(submissions)
  }, (error) => {
    console.error('Error listening to submissions:', error)
    callback([])
  })
}

/**
 * Update the status of a submission
 */
export async function updateSubmissionStatus(id, newStatus) {
  try {
    const docRef = doc(db, 'quote_submissions', id)
    await updateDoc(docRef, { status: newStatus })
    return { success: true }
  } catch (error) {
    console.error('Error updating status:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Delete a submission
 */
export async function deleteSubmission(id) {
  try {
    const docRef = doc(db, 'quote_submissions', id)
    await deleteDoc(docRef)
    return { success: true }
  } catch (error) {
    console.error('Error deleting submission:', error)
    return { success: false, error: error.message }
  }
}
// ---- MEDIA OVERRIDES API ----

/**
 * Save a media override (image URL) to Firestore
 */
export async function saveMediaOverride(assetKey, value) {
  try {
    const docId = assetKey.replace(/\//g, '_').replace(/\./g, '-')
    const docRef = doc(db, 'media_overrides', docId)
    await setDoc(docRef, { key: assetKey, value, updatedAt: serverTimestamp() })
    return { success: true }
  } catch (error) {
    console.error('Error saving media override:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Delete a media override from Firestore
 */
export async function deleteMediaOverride(assetKey) {
  try {
    const docId = assetKey.replace(/\//g, '_').replace(/\./g, '-')
    const docRef = doc(db, 'media_overrides', docId)
    await deleteDoc(docRef)
    return { success: true }
  } catch (error) {
    console.error('Error deleting media override:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get all media overrides (one-time fetch for frontend pages)
 */
export async function getMediaOverrides() {
  try {
    const snapshot = await getDocs(collection(db, 'media_overrides'))
    const overrides = {}
    snapshot.forEach(docSnap => {
      const data = docSnap.data()
      overrides[data.key] = data.value
    })
    return overrides
  } catch (error) {
    console.error('Error getting media overrides:', error)
    return {}
  }
}

/**
 * Listen to media overrides in real-time (for dashboard)
 */
export function listenToMediaOverrides(callback) {
  return onSnapshot(collection(db, 'media_overrides'), (snapshot) => {
    const overrides = {}
    snapshot.forEach(docSnap => {
      const data = docSnap.data()
      overrides[data.key] = data.value
    })
    callback(overrides)
  }, (error) => {
    console.error('Error listening to media overrides:', error)
    callback({})
  })
}

export { db }
