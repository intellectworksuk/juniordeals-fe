import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { useAuthListener } from "./firebase/useAuthListener";
import { useFireBase } from "./firebase/config";

export default function RequestName() {
  const [auth, fs] = useFireBase();

  const current = useAuthListener();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const setUsername = async () => {
    if (name.length >= 3 && name.length <= 15) {
      await updateDoc(doc(fs, "users", current.user!), {
        name: name,
      });
      setName("");
      setError("");
    } else setError("Please enter a name between 3-15 characters.");
  };

  return (
    <>
      <p>Name:</p>
      <div className="request">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button className="set" onClick={() => setUsername()}>
          Done
        </button>
        <br />
        <p className="error">{error}</p>
      </div>
    </>
  );
}
