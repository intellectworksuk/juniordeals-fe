import { useLocation } from "react-router-dom";
import { ProductResponse } from "../../../types";
import { useAuthListener } from "./firebase/useAuthListener";
import * as helper from "../../../util/helper";
import * as FirebaseService from "./firebase/fireStoreService";
import { useFireBase } from "./firebase/config";
import ChatRoom from "./ChatRoom";
import { SendEmailNotification } from "./SendEmailNotification";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import * as FirestoreService from "../../../store/firestore/firestore.actions";
import { onValue, ref } from "firebase/database";
import * as Util from "../../../util/helper";
import { UserType } from "../../../enums";
import { store } from "../../../store";
import { Spin } from "antd";
import useEffectOnce from "../../../hooks/useEffectOnce";

export const ChatApp = () => {
  const dispatch = useAppDispatch();

  const [userIsOnline, setUserIsOnline] = useState<boolean>(false);

  const { status: fsStatus } = useAppSelector((state) => state.firestore);

  const [progress, SetProgress] = useState<boolean>(false);

  const location = useLocation();

  const { product, barterProduct } = (location.state as any) || {};

  const [auth, fs, db] = useFireBase();

  const markUserIsOnline = (userName: string) => {
    if (userName) {
      const encodedUserName = Util.getEncodedString(userName);

      SetProgress(true);

      const statusStateRef = ref(db, "status/" + encodedUserName + "/state");

      onValue(
        statusStateRef,
        (snapshot) => {
          const data = snapshot.val();

          SetProgress(false);

          setUserIsOnline(data === "online");
        },
        (error) => {
          SetProgress(false);
        }
      );
    }
  };

  useEffect(() => {
    markUserIsOnline(product.userId?.toString()!);
  }, [product]);

  useScrollToTop();

  return progress ? (
    <Spin size="large" />
  ) : (
    //userIsOnline ? (
    <ChatRoom checkUserIsOnline={userIsOnline} />
  );
  // ) : (
  //   <SendEmailNotification product={product} barterProduct={barterProduct} />
  // );

  // useEffect(() => {
  //   if (fsStatus === "userIsOnlineResolved") {
  //     console.log("authstatus " + JSON.stringify(onlineList));
  //   }
  // }, [fsStatus]);

  // console.log(JSON.stringify(product));

  // return onlineList[product.applicationUser?.userName!] &&
  //   onlineList[product.applicationUser?.userName!] === "online" ? (
  //   <ChatRoom />
  // ) : (
  //   <SendEmailNotification />
  // );

  // const current = useAuthListener();
  // return <>{current.user ? <ChatRoom /> : <Register />}</>;
};
