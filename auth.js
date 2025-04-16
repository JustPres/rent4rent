import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA5i8nbw8A4JDVUlJF3fZ7MIs9ed7S6fIc",
  authDomain: "rent4rent-e1e0b.firebaseapp.com",
  projectId: "rent4rent-e1e0b",
  storageBucket: "rent4rent-e1e0b.appspot.com",
  messagingSenderId: "467128925177",
  appId: "1:467128925177:web:b62c625847db1a18319b28",
  measurementId: "G-EJ0PL7CNQQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Show popup message
function showMessage(msg, color = "green") {
  const message = document.getElementById("message");
  if (!message) return;
  message.textContent = msg;
  message.classList.remove("hidden", "text-green-600", "text-red-600");
  message.classList.add(`text-${color}-600`);
  setTimeout(() => {
    message.classList.add("hidden");
  }, 3000);
}

// Check if user is already logged in and redirect
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user.email === "admin@rent.com") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "dashboard.html";
    }
  }
});

// Sign Up logic
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        showMessage("✅ Account created!");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      })
      .catch(error => showMessage(`❌ ${error.message}`, "red"));
  });
}

// Login logic
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showMessage("✅ Logged in!");
        setTimeout(() => {
          // Redirect based on user
          if (email === "admin@rent.com") {
            window.location.href = "admin-dashboard.html";
          } else {
            window.location.href = "dashboard.html";
          }
        }, 1500);
      })
      .catch(error => showMessage(`❌ ${error.message}`, "red"));
  });
}
