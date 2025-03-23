// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-79cd6.firebaseapp.com",
  projectId: "mern-blog-79cd6",
  storageBucket: "mern-blog-79cd6.appspot.com",
  messagingSenderId: "135045222342",
  appId: "1:135045222342:web:94dc42346fdc6e564aacc7",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Auth and Google provider instances
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Correctly export everything
export { app, auth, googleProvider, signInWithPopup };
