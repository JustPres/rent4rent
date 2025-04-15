// main.js

// 1) Import the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics }  from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// 2) Your Firebase config (copy–pasted from your console)
const firebaseConfig = {
  apiKey: "AIzaSyA5i8nbw8A4JDVUlJF3fZ7MIs9ed7S6fIc",
  authDomain: "rent4rent-e1e0b.firebaseapp.com",
  projectId: "rent4rent-e1e0b",
  storageBucket: "rent4rent-e1e0b.appspot.com",
  messagingSenderId: "467128925177",
  appId: "1:467128925177:web:b62c625847db1a18319b28",
  measurementId: "G-EJ0PL7CNQQ"
};

// 3) Initialize Firebase
const app       = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db        = getFirestore(app);
const auth      = getAuth(app);

// 4) Optional: watch auth state
onAuthStateChanged(auth, user => {
  if (user) {
    console.log("✅ Logged in as", user.email);
  } else {
    console.log("🔒 Not logged in");
  }
});

// 5) Fetch and render your properties
const grid = document.getElementById("featured-grid");
async function loadProperties() {
  // Clear any old content
  grid.innerHTML = "";

  // Get all docs from the "properties" collection
  const snapshot = await getDocs(collection(db, "properties"));
  snapshot.forEach(doc => {
    const { title, location, price, imageUrl } = doc.data();
    grid.innerHTML += `
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <img src="${imageUrl}" alt="${title}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="font-semibold text-lg">${title}</h3>
          <p class="text-gray-600">${location} • ₱${price}/mo</p>
          <div class="mt-4 flex justify-between items-center">
            <a href="listing.html?id=${doc.id}" class="text-blue-600 hover:underline">View Details</a>
            <button class="px-3 py-1 border rounded hover:bg-gray-100">Save</button>
          </div>
        </div>
      </div>`;
  });
}

// 6) Run on page load
window.addEventListener("DOMContentLoaded", loadProperties);
