import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgRKkcdOiWGRnWTrdiJYhlanzfqjhrKRw",
  authDomain: "cinemint-456d2.firebaseapp.com",
  projectId: "cinemint-456d2",
  storageBucket: "cinemint-456d2.appspot.com",
  messagingSenderId: "837162242658",
  appId: "1:837162242658:web:a79778254e1d9693d1373b",
  measurementId: "G-YW4Y1P30XF",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

export { auth };
export default db;
