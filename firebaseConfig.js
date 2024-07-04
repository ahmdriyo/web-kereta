import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBv3iEm1P8Ha2UkZyexGNR8U0KsbOugut8",
  authDomain: "web-kereta.firebaseapp.com",
  projectId: "web-kereta",
  storageBucket: "web-kereta.appspot.com",
  messagingSenderId: "1009840263139",
  appId: "1:1009840263139:web:e08db79b04ac5c8bac9ad6"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { app,auth, firestore, storage};