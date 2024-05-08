import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "realtime-chat-559b2.firebaseapp.com",
  projectId: "realtime-chat-559b2",
  storageBucket: "realtime-chat-559b2.appspot.com",
  messagingSenderId: "491730145561",
  appId: "1:491730145561:web:e2570ceeb0ad076e17f588",
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const data_base=getFirestore();
export const storage=getStorage();
