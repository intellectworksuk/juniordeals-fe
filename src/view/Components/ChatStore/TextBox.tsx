import { FormEvent, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";

import { useAuthListener } from "./firebase/useAuthListener";
import { ProductResponse } from "../../../types";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { store } from "../../../store";
import { Space } from "antd";
import { useFireBase } from "./firebase/config";
import { AiOutlineSend } from "react-icons/ai";
import * as helper from "../../../util/helper";
import * as FireStoreActions from "../../../store/firestore/firestore.actions";

interface TextboxProps {
  chatRoomID: string;
}

export default function Textbox(props: TextboxProps) {
  const dispatch = useAppDispatch();

  const [auth, fs, db] = useFireBase();

  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);

  const { product } = (location.state as any) || {};
  const { chatUserType } = (location.state as any) || {};

  const current = useAuthListener();

  const { status: firestoreStatus } = useAppSelector(
    (state) => state.firestore
  );

  const [message, setMessage] = useState("");

  const chatRoomId = helper.getEncodedString(
    String(user.id!),
    String(product.id),
    String(product.userId)
  );

  const userChatRoomID =
    props.chatRoomID === undefined ? chatRoomId : props.chatRoomID;

  const sendInputMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (message.length > 0) {
      dispatch(
        FireStoreActions.sendMessage({
          fs: fs,
          userChatRoomID: userChatRoomID,
          product: product,
          message: message,
          user: user,
          chatUserType: chatUserType,
        })
      );
    }
  };

  useEffect(() => {
    if (firestoreStatus === "SendMessageResolved") {
      setMessage("");
    }
  }, [dispatch, firestoreStatus]);

  return (
    <form onSubmit={sendInputMessage}>
      {/* <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        onKeyDown={(e) => (e.keyCode === 13 ? sendMessage() : null)}
      /> */}
      {/* <Space> */}
      <div className="textbox">
        <input
          maxLength={100}
          value={message}
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => (e.keyCode === 13 ? sendInputMessage : null)}
        />
        <button type="button" style={{ backgroundColor: "transparent" }}>
          <AiOutlineSend />
        </button>
      </div>

      {/* <button type="submit">Send</button> */}
      {/* </Space> */}
      <br />
      <br />
    </form>
  );
}
