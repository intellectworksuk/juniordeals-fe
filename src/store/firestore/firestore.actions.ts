import { createAsyncThunk } from "@reduxjs/toolkit";
import { child, Database, get, onValue, ref, set } from "firebase/database";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import * as helper from "../../util/helper";
import * as FirestoreService from "../../view/Components/ChatStore/firebase/fireStoreService";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (values: any, thunkAPI) => {
    try {
      const prodExistref = await getDoc(
        doc(values.fs, "Chats", values.userChatRoomID)
      );

      if (prodExistref.exists()) {
      } else {
        setDoc(doc(values.fs, "Chats", values.userChatRoomID), {
          productID: values.product.id,
          productName: values.product.title,
          buyer: values.user.id,
          buyerUserName: values.user.userName,
          seller: values.product.applicationUser.id,
          sellerUserName: values.product.applicationUser.userName,
        });
      }

      await addDoc(
        collection(values.fs, "Chats", values.userChatRoomID, "messages"),
        {
          content: values.message,
          timestamp: new Date().getTime(),
          sender: values.user.fullName,
          senderID: values.user.userName,
          productID: values.product.id,
          productUserID: values.product.userId,
        }
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const isUserOnline = createAsyncThunk(
  "chat/isUserOnline",
  async (values: any, thunkAPI) => {
    let result: { [key: string]: string } = {};
    try {
      if (values.userName) {
        const encodedUserName = helper.getEncodedString(values.userName);

        const statusStateRef = ref(
          values.db,
          "status/" + encodedUserName + "/state"
        );

        onValue(statusStateRef, (snapshot) => {
          const data = snapshot.val();

          result[values.userName] = String(data);
        });
      }
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const writeChat = createAsyncThunk(
  "chat/writeChat",
  async (values: any) => {
    console.log("b " + JSON.stringify(values));

    // const uid = helper.getEncodedString(values.seller);
    const uid = values.seller;

    let msgs: bigint = BigInt(0);
    // get(child(values.db, `/status/${uid}/msgs`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       msgs = msgs + BigInt(snapshot.val());
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    set(ref(values.db, "/status/" + uid), {
      seller: values.seller,
      msgs: msgs,
    });

    console.log("a " + JSON.stringify(values));
  }
);
