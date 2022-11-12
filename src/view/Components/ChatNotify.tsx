import { Avatar, Badge, Image } from "antd";
import { useAppSelector } from "../../hooks/reduxHooks";
import chatIcon from "../assets/img/chat-icon.png";
import { UserType } from "../../enums";
import { useState } from "react";
import useEffectOnce from "../../hooks/useEffectOnce";
import * as FireStoreService from "../Components/ChatStore/firebase/fireStoreService";
import { useFireBase } from "./ChatStore/firebase/config";
import { ProductResponse, User } from "../../types";
import { PropertySafetyFilled, WechatOutlined } from "@ant-design/icons";
import { IoChatboxOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { onValue, ref } from "firebase/database";

interface ChatNotifyBadgeProps {
  product?: ProductResponse;
  user?: User;
  size: "large" | "small" | "default";
  bgcolor: string;
}

export const ChatNotifyBadge = (props: ChatNotifyBadgeProps) => {
  const [auth, fs, db] = useFireBase();

  const { user } = useAppSelector((state) => state.auth);

  const [messagetCount, setMessageCount] = useState<bigint>(BigInt(0));

  const getMessageCount = async () => {
    if (props.product) {
      FireStoreService.getProductMessageCount(auth, fs, props.product).then(
        (n) => setMessageCount(n)
      );
    } else if (props.user) {
      FireStoreService.getSellerMessageCount(auth, fs, props.user).then((n) =>
        setMessageCount(n)
      );
    }
  };

  useEffectOnce(() => {
    getMessageCount();

    // if (props.user) {
    //   const msgCountRef = ref(db, "status/" + props.user.id + "/msgs");
    //   onValue(msgCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     setMessageCount(data);
    //   });
    // }
  });

  return (
    <>
      {user &&
      [UserType.ADMIN, UserType.SUPER_ADMIN].includes(Number(user.userType)) ? (
        <></>
      ) : (
        <div style={{ marginTop: "5px" }}>
          {messagetCount && (
            <Badge
              count={messagetCount}
              size={props.size === "small" ? "small" : "default"}
            >
              <Avatar
                icon={<img alt="" src={chatIcon} />}
                shape="square"
                size={props.size}
                style={{ backgroundColor: `${props.bgcolor}` }}
              />
            </Badge>
          )}
        </div>
      )}
    </>
  );
};
