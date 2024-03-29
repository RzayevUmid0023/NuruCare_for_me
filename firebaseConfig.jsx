import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAx6rHhy4DC3IVd9gc_iS9MPSBqnlhX9MI",
    authDomain: "nurucare-f413e.firebaseapp.com",
    projectId: "nurucare-f413e",
    storageBucket: "nurucare-f413e.appspot.com",
    messagingSenderId: "744106796727",
    appId: "1:744106796727:web:cfa3f35a5cdc4acb224f32",
    measurementId: "G-Z6MY2NJ5F0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;