import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
// import { userTheme } from "./SetTheme";
import { store } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useLocation } from "react-router-dom";
import { ProductResponse } from "../../../types";
import { useFireBase } from "./firebase/config";
import { userTheme } from "./SetTheme";
import * as helper from "../../../util/helper";
import * as FireStoreActions from "../../../store/firestore/firestore.actions";

interface MessagesProps {
  chatRoomID: string;
}

export default function Messages(props: MessagesProps) {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const { product } = (location.state as any) || {};

  const [auth, fs, db] = useFireBase();

  const { user } = useAppSelector((state) => state.auth);

  const [messages, setMessages] = useState<any[]>([]);

  const chatRoomId = helper.getEncodedString(
    String(user.id!),
    String(product.id),
    String(product.userId)
  );

  const userChatRoomID =
    props.chatRoomID === undefined ? chatRoomId : props.chatRoomID;

  const formatAndSetMessages = (querySnapshot: QuerySnapshot) => {
    const allMessages: any[] = [];
    querySnapshot.docs.forEach((doc) => {
      const addedMessage = {
        id: doc.id,
        sender: doc.data().sender,
        content: doc.data().content,
        timestamp: doc.data().timestamp,
        sentByMe: doc.data().senderID === user.userName,
      };
      allMessages.push(addedMessage);
    });
    allMessages.sort(
      (a: { timestamp: string }, b: { timestamp: string }) =>
        parseFloat(b.timestamp) - parseFloat(a.timestamp)
    );
    setMessages([...allMessages]);
  };

  userTheme();
  useEffect(() => {
    onSnapshot(
      collection(fs, "Chats", String(userChatRoomID), "messages"),
      (querySnapshot) => {
        formatAndSetMessages(querySnapshot);

        // if (querySnapshot.docs.length == 1) {
        //   console.log("querySnapshot.docs.length " + querySnapshot.docs.length);

        //   dispatch(
        //     FireStoreActions.writeChat({
        //       db: db,
        //       seller: product?.applicationUser?.id,
        //     })
        //   );
        // }
      }
    );
  }, [onSnapshot, props.chatRoomID]);

  // useEffect(() => {
  //   const fetchRoomMessages = async () => {
  //     const q = collection(fs, "Chats", String(props.chatRoomID), "messages");

  //     const querySnapshot = await getDocs(q);

  //     // const dataMessages = querySnapshot.docs.map((doc) => doc.data());

  //     formatAndSetMessages(querySnapshot);
  //   };

  //   if (props.chatRoomID && props.chatRoomID.length > 0) {
  //     fetchRoomMessages();
  //   }
  // }, [props.chatRoomID]);

  return (
    <div className="msg-block">
      <div className="messages">
        <span id="newest-feed"></span>
        <a id="down-button" href="#newest-feed">
          <i className="fa fa-arrow-down"></i>
        </a>
        {messages
          ? messages.map((message) => (
              <div
                id={message.id}
                key={message.id}
                className={
                  message.sentByMe ? "msg sentByYou" : "msg sentByOther"
                }
              >
                <div className="msg-left">
                  <div className="msg-sender">{message.sender}</div>
                  {/* <StyledMessageWrapper
                    key={Math.random()}
                    type={message.sentByMe ? "sent" : "received"}
                  >
                    <StyledMessage
                      type={message.sentByMe === 1 ? "sent" : "received"}
                    > */}
                  <div className="msg-content">
                    <span>{message.content}</span>
                  </div>
                  {/* </StyledMessage>
                  </StyledMessageWrapper> */}
                </div>
                <div className="msg-right">
                  {new Date(message.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
