// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBe6s9lxjaYJVp4LXJ1Nm0TPA2zI92VkBk",
  authDomain: "wedding-invitation-13f53.firebaseapp.com",
  projectId: "wedding-invitation-13f53",
  storageBucket: "wedding-invitation-13f53.firebasestorage.app",
  messagingSenderId: "167803637838",
  appId: "1:167803637838:web:13601c84c073afaf36b31f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
