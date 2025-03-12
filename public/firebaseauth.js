// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc, addDoc, collection, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// 🔹 Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwjFQXSwBsAPGCaUOlm-VWb28QTQKdeWM",
  authDomain: "stockmaintainence-dabe5.firebaseapp.com",
  projectId: "stockmaintainence-dabe5",
  storageBucket: "stockmaintainence-dabe5.appspot.com",
  messagingSenderId: "43533671684",
  appId: "1:43533671684:web:d7025dc879ddf16a590451",
  measurementId: "G-TR05GFK3K9"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// 🔹 Signup Logic
const signUp = document.getElementById("submitSignUp");
if (signUp) {
  signUp.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;
    const firstName = document.getElementById("fName").value;
    const lastName = document.getElementById("lName").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, { email, firstName, lastName })
          .then(() => window.location.href = "index.html")
          .catch((error) => console.error("Error writing document", error));
      })
      .catch((error) => alert(error.message));
  });
}

// 🔹 Sign In Logic
const signIn = document.getElementById("submitSignIn");
if (signIn) {
  signIn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem('loggedInUserId', userCredential.user.uid);
        window.location.href = 'dashboard.html';
      })
      .catch((error) => alert(error.message));
  });
}

// 🔹 Inventory Management
const addItemToInventory = async (itemName, sku, category, stock, supplier) => {
  try {
    await addDoc(collection(db, "inventory"), {
      itemName, sku, category, stock, supplier
    });
    alert("Item added successfully!");
    loadInventory();
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const loadInventory = async () => {
  const inventoryTable = document.getElementById("inventoryTable");
  inventoryTable.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "inventory"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const row = `<tr>
      <td>${data.itemName}</td>
      <td>${data.sku}</td>
      <td>${data.category}</td>
      <td>${data.stock}</td>
      <td>${data.supplier}</td>
      <td><button class='btn-danger' onclick="deleteItem('${doc.id}')">Delete</button></td>
    </tr>`;
    inventoryTable.innerHTML += row;
  });
};

const deleteItem = async (id) => {
  try {
    await deleteDoc(doc(db, "inventory", id));
    alert("Item deleted successfully!");
    loadInventory();
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

// Attach function to form submission
const inventoryForm = document.querySelector("form");
if (inventoryForm) {
  inventoryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const itemName = document.querySelector("input[placeholder='Item Name']").value;
    const sku = document.querySelector("input[placeholder='SKU']").value;
    const category = document.querySelector("select").value;
    const stock = document.querySelector("input[placeholder='Stock Quantity']").value;
    const supplier = document.querySelector("input[placeholder='Supplier Name']").value;
    addItemToInventory(itemName, sku, category, stock, supplier);
  });
}

// Load inventory on page load
window.onload = loadInventory;
