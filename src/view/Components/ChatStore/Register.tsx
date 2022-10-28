import { useState } from "react";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useFireBase } from "./firebase/config";

export default function Register() {
  const [auth, fs] = useFireBase();

  const [loading, setLoading] = useState(true);

  const register = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const docSnap = await getDoc(doc(fs, "users", result.user.uid));
      if (!docSnap.exists()) {
        setDoc(doc(fs, "users", result.user.uid), {
          name: "New User",
          status: "Hello",
          id: result.user.uid,
          changedName: false,
        });
      }
    });
  };

  setInterval(() => setLoading(false), 3000);

  if (loading) {
    return (
      <div className="registeration">
        <h1>Loading...</h1>
        <img
          src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
          width="100"
          alt="loading circle that rotates"
        />
      </div>
    );
  } else {
    return (
      <div className="registeration">
        <h1>Welcome</h1>
        <button onClick={register}>Sign in with your Google Account.</button>
      </div>
    );
  }
}
