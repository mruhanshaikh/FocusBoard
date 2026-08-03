  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
  import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyA-l3vBYEnj45dZkW9evLEJrpjIAGRc2OA",
    authDomain: "focusboard-67e75.firebaseapp.com",
    projectId: "focusboard-67e75",
    storageBucket: "focusboard-67e75.firebasestorage.app",
    messagingSenderId: "936931622088",
    appId: "1:936931622088:web:3f66b24b52734c484779fd",
    measurementId: "G-BN26QEC1YS"
  };
  const app = initializeApp(firebaseConfig);
  export const provider = new GoogleAuthProvider();
  export const auth = getAuth(app);
  export const db = getFirestore(app);

 