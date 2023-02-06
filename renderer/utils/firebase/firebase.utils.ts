import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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

// export const createUserDocumentFromAuth = async (userAuth, addUser = {}) => {
//   if (!userAuth) return;

//   const userDoc = doc(db, "user", userAuth.uid);

//   const userInfo = await getDoc(userDoc);

//   if (!userInfo.exists()) {
//     const { displayName, email } = userAuth;
//     const createdAt = serverTimestamp();

//     try {
//       await setDoc(userDoc, {
//         displayName,
//         email,
//         createdAt,
//         uid: auth.currentUser.uid,
//         ...addUser,
//       });
//     } catch (error) {
//       return error;
//     }
//   }
//   return userDoc;
// };

// export const getMessageData = async () => {
//   try {
//     const queryMessage = await getDocs(collection(db, "messages"));
//     return queryMessage.docs.map((doc) => doc.data());
//   } catch (error) {
//     console.error("getMessageData", error);
//   }
// };

// export const sendMessageData = async ({ text }) => {
//   if (!auth.currentUser) {
//     console.error("no auth");
//     return;
//   }

//   try {
//     const { uid, displayName } = auth.currentUser;
//     const querySendMsg = await query(
//       collection(db, "messages"),
//       orderBy("timestamp")
//     );
//     const unsubscribe = onSnapshot(querySendMsg, (querySnapshot) => {
//       let messages = [];
//       return querySnapshot.forEach((doc) => {
//         return messages.push({ ...doc.data(), id: doc.id });
//       });
//     });

//     console.log("send");
//   } catch (error) {
//     console.log("sendMessageData", error);
//   }
// };
