import { Auth } from "firebase/auth";
import {
  child,
  Database,
  get,
  getDatabase,
  onDisconnect,
  onValue,
  ref,
  set,
} from "firebase/database";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { ProductResponse, User } from "../../../../types";
import * as helper from "../../../../util/helper";

export const getProductMessageCount = async (
  auth: Auth,
  fs: Firestore,
  product: ProductResponse
): Promise<bigint> => {
  const q = query(
    collection(fs, "Chats"),
    where("productID", "==", product.id)
  );

  const querySnapshot = await getDocs(q);

  return BigInt(querySnapshot.docs.length);
};

export const getSellerMessageCount = async (
  auth: Auth,
  fs: Firestore,
  user: User
): Promise<bigint> => {
  const q = query(collection(fs, "Chats"), where("seller", "==", user.id));

  const querySnapshot = await getDocs(q);

  return BigInt(querySnapshot.docs.length);
};

export const getProductMessages = async (
  auth: Auth,
  fs: Firestore,
  product: ProductResponse
): Promise<any[]> => {
  const q = query(
    collection(fs, "Chats"),
    where("productID", "==", product.id)
  );

  const querySnapshot = await getDocs(q);

  const items = querySnapshot.docs.map((doc) => doc.data());

  return items;
};

export const manageUserPresence = async (
  auth: Auth,
  fs: Firestore,
  db: Database,
  userName: string
) => {
  const uid = helper.getEncodedString(userName);

  var userStatusDatabaseRef = ref(db, "/status/" + uid);
  var userStatusStateDatabaseRef = ref(db, "/status/" + uid + "/state");
  var userStatusFirestoreRef = doc(fs, "users", uid);

  var isOfflineForFirestore = {
    state: "offline",
    userId: userName,
    last_changed: serverTimestamp(),
  };

  var isOnlineForFirestore = {
    state: "online",
    userId: userName,
    last_changed: serverTimestamp(),
  };

  var isOfflineForDatabase = {
    state: "offline",
    userId: userName,
    last_changed: serverTimestamp(),
  };

  var isOnlineForDatabase = {
    state: "online",
    userId: userName,
    last_changed: serverTimestamp(),
  };

  onValue(ref(db, ".info/connected"), (snapshot) => {
    if (snapshot.val() === false) {
      setDoc(userStatusFirestoreRef, isOfflineForFirestore);
      return;
    }
  });

  onDisconnect(userStatusDatabaseRef)
    .set(isOfflineForDatabase)
    .then(function () {
      // We'll also add Firestore set here for when we come online.
      set(userStatusDatabaseRef, isOnlineForDatabase).then((doc) => {
        setDoc(userStatusFirestoreRef, isOnlineForFirestore);
      });
    });
};

// export const readRealTimeMessageCount = async (db: Database, values: any) => {
//   const starCountRef = ref(db, "posts/" + postId + "/starCount");
//   onValue(starCountRef, (snapshot) => {
//     const data = snapshot.val();
//     updateStarCount(postElement, data);
//   });
// };
