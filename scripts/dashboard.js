import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "index.html"; // ✅ Redirect if not logged in
    } else {
        // Fetch user details from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById("userEmail").innerText = `${userData.firstName} ${userData.lastName}`; // ✅ Show user name instead of email
        }
    }
});

// Logout function
document.getElementById("logout-btn")?.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html"; // ✅ Redirect to login after logout
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
});
