import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNye0gCqRCVFPB2rPaVWJlPZWwqfy880g",
  authDomain: "heritage-homes-2ff7f.firebaseapp.com",
  projectId: "heritage-homes-2ff7f",
  storageBucket: "heritage-homes-2ff7f.appspot.com",
  messagingSenderId: "746094962586",
  appId: "1:746094962586:web:bcd96147ab308c74657c23",
  measurementId: "G-9F4CF882PD"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth }; 