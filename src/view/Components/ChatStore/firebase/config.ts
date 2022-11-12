import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, User } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import { config } from "../../../../constants/env";

// const firebaseConfig = {
//   apiKey: "AIzaSyBXJISpFmgeO_5WboUqsZUgUOvS5EPpe6c",
//   authDomain: "buysing-f5c4e.firebaseapp.com",
//   databaseURL: "https://buysing-f5c4e-default-rtdb.firebaseio.com",
//   projectId: "buysing-f5c4e",
//   storageBucket: "buysing-f5c4e.appspot.com",
//   messagingSenderId: "705503908040",
//   appId: "1:705503908040:web:0969aec1bb0813109355fd"
// };

export const useFireBase = () => {
  const app = initializeApp(config.firebase);

  const [currentUser, setCurrentUser] = useState<User>();

  signInAnonymously(getAuth(app)).then((userCredential) => {
    setCurrentUser(userCredential.user);
  });

  return [getAuth(app), getFirestore(app), getDatabase(app)] as const;
};
