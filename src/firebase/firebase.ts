import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "netflix-react-fd21a.firebaseapp.com",
  projectId: "netflix-react-fd21a",
  storageBucket: "netflix-react-fd21a.appspot.com",
  messagingSenderId: "173446432351",
  appId: "1:173446432351:web:22deb3f575f414072f7dea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



