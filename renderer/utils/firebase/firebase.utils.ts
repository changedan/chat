import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage();

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromAuth = async (userAuth, addUser = {}) => {
  if (!userAuth) return;

  const userDoc = doc(db, "user", userAuth.uid);

  const userInfo = await getDoc(userDoc);

  if (!userInfo.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDoc, {
        displayName,
        email,
        createdAt,
        ...addUser,
      });
    } catch (error) {
      console.error("createUserDocumetFromAuth ::", error);
    }
  }

  return userDoc;
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const singOutAuth = () => {
  signOut(auth);
};

export const getUserList = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "user"));
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("getUserList", error);
  }
};
