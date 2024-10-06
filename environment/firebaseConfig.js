import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// - From: servicecitycloudservice@gmail.com
const firebaseConfig = {
  apiKey: "AIzaSyCzDTYe81A48pT_nmC-YLHycmi58BSaIEU",
  authDomain: "joako-app.firebaseapp.com",
  databaseURL: "https://joako-app-default-rtdb.firebaseio.com",
  projectId: "joako-app",
  storageBucket: "joako-app.appspot.com",
  messagingSenderId: "1046687413679",
  appId: "1:1046687413679:web:e29afda896922360f2eb5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
