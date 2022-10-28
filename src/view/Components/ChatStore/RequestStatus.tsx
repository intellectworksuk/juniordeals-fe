import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { useAuthListener } from "./firebase/useAuthListener";
import { useFireBase } from "./firebase/config";

export default function RequestName() {
  const [auth, fs] = useFireBase();

  const current = useAuthListener();

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const setUserStatus = async () => {
    if (status.length >= 3 && status.length <= 15) {
      await updateDoc(doc(fs, "users", current.user!), {
        status: status,
      });
      setStatus("");
      setError("");
    } else setError("Please enter a status between 3-15 characters.");
  };

  return (
    <>
      <p>Status:</p>
      <div className="request">
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
        />
        <button className="set" onClick={() => setUserStatus()}>
          Done
        </button>
        <br />
        <p className="error">{error}</p>
      </div>
    </>
  );
}
