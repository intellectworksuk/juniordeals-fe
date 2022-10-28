import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, User } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import { config } from "../../../../constants/env";

// const firebaseConfig = {
//   apiKey: "AIzaSyDFopDwsM3ZPnHURFSbIzgllo8PV2VhSPQ",
//   authDomain: "chat-ware-f8777.firebaseapp.com",
//   databaseURL: "https://chat-ware-f8777-default-rtdb.firebaseio.com",
//   projectId: "chat-ware-f8777",
//   storageBucket: "chat-ware-f8777.appspot.com",
//   messagingSenderId: "971585314307",
//   appId: "1:971585314307:web:9c47711adabead057a3836",
// };

export const useFireBase = () => {
  const app = initializeApp(config.firebase);

  const [currentUser, setCurrentUser] = useState<User>();

  signInAnonymously(getAuth(app)).then((userCredential) => {
    setCurrentUser(userCredential.user);
  });

  return [getAuth(app), getFirestore(app), getDatabase(app)] as const;
};
