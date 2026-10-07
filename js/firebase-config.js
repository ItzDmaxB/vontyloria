// js/firebase-config.js
// ⚠️  Replace these values with your own from the Firebase Console
// (Project Settings → Your apps → SDK setup and configuration)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyAUGIih30zYFy_UQDhNdR8TfLOJlfhPanM",

  authDomain: "mc23hub.firebaseapp.com",

  projectId: "mc23hub",

  storageBucket: "mc23hub.firebasestorage.app",

  messagingSenderId: "223542295768",

  appId: "1:223542295768:web:2c88cbd215c1a5dec02bad"

};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
