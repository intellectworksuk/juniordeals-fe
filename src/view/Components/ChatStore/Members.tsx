import { SetStateAction, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useFireBase } from "./firebase/config";
import { useAuthListener } from "./firebase/useAuthListener";

export default function Members() {
  const [auth, fs] = useFireBase();

  const current = useAuthListener();

  const [users, setUsers] = useState<any[]>([]);

  if (current.user) {
    onSnapshot(collection(fs, "users"), (querySnapshot) => {
      const allUsers: SetStateAction<any[]> = [];
      querySnapshot.forEach((doc) => {
        allUsers.push([
          allUsers.length,
          doc.data().name,
          doc.data().status,
          doc.data().id === current.user,
        ]);
      });
      setUsers(allUsers);
    });
  }

  return (
    <div className="msg-block" style={{ padding: "10px" }}>
      <div className="members">
        <h2>Members</h2>
        <ul>
          {users
            ? users.map((user) => (
                <li key={user[0]} className={user[3] ? "you" : ""}>
                  {user[1]} - {user[2]} {user[3] ? " (You) " : ""}
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
}
