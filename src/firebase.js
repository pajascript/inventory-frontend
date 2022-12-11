import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOVmig44Y7qWtRrvrRs_QWNv1kMvqKz5k",
  authDomain: "kalyeo.firebaseapp.com",
  projectId: "kalyeo",
  storageBucket: "kalyeo.appspot.com",
  messagingSenderId: "625485172697",
  appId: "1:625485172697:web:e9bfee8ba5b451f36453c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app;