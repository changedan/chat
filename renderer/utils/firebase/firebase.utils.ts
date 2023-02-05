import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBD6Xe_CLQgkuy3M77y5S_dda252RxcskE",
  authDomain: "nextron-chatting-firebase.firebaseapp.com",
  projectId: "nextron-chatting-firebase",
  storageBucket: "nextron-chatting-firebase.appspot.com",
  messagingSenderId: "1048229352306",
  appId: "1:1048229352306:web:52d6ea24420c2867ec43eb",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
// export const storage = getStorage();

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const singOutAuth = () => {
  signOut(auth);
};
