// js/auth.js
import { auth, db } from './firebase-config.js';

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// ── Login / Logout ──────────────────────────────────────────────────────────

export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutUser() {
  return signOut(auth);
}


// ── User data from Firestore ────────────────────────────────────────────────

export async function getUserData(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : {};
}


// ── Content data from Firestore ─────────────────────────────────────────────

export async function getContentData() {
  const snap = await getDoc(doc(db, 'content', 'val'));
  return snap.exists() ? snap.data() : {};
}


// ── Site access ─────────────────────────────────────────────────────────────

export async function hasSiteAccess(uid) {
  const data = await getUserData(uid);

  return data.regering === "true" || data.regering === "talman";
}


// ── Auth state listener ─────────────────────────────────────────────────────

export function onAuthChange(callback) {
  onAuthStateChanged(auth, callback);
}


// ── Navbar injection ────────────────────────────────────────────────────────

onAuthStateChanged(auth, async user => {
  const container = document.getElementById('nav-auth');
  if (!container) return;

  if (user) {

    const data = await getUserData(user.uid);

    // User is logged in, but does not have access
    // if (data.regering !== "true" || data.regering !== "talman") {
    //   container.innerHTML = `
    //     <p class="error-msg">Du har inte tillgång</p>
    //     <a href="/login.html" class="nav-login-a">
    //       <button class="nav-login-btn">Logga in</button>
    //     </a>`;
    //   return;
    // }

    // User is logged in AND has access
    const uuid = data.minecraftUUID || '';
    const username = data.username || '';

    const imgSrc = uuid
      ? `https://minotar.net/helm/${uuid}/32`
      : 'https://minotar.net/helm/MHF_Steve/32';

    container.innerHTML = `
      <p style="font-size: 250%; font-family: Satoshi Black;">Välkommen</p>
      <a href="./regering.html" class="nav-member-btn">
        <p style="font-family: Satoshi Medium; font-size: 200%;">${username}</p>
        <img src="${imgSrc}" alt="Your Minecraft head" class="nav-mc-head" />
      </a>
    `;

  } else {

    container.innerHTML = `
      <p class="hero-login-text">Du är inte inloggad</p>
      <a href="./login.html" class="nav-login-a">
        <button class="nav-login-btn">Logga in</button>
      </a>`;
  }
});