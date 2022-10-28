import { collection, getDocs, query, where } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { ProductResponse } from "../../../types";
import { useFireBase } from "./firebase/config";
import * as helper from "../../../util/helper";
import { UserType } from "../../../enums";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface ChatListProps {
  setRoomIdFromChatList: (roomId: string) => void;
  setBuyerIdFromChatList: (buyerId: string) => void;
}

export const ChatList = (props: ChatListProps) => {
  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);

  const [chatItems, setChatItems] = useState<any>([]);

  const [auth, fs] = useFireBase();

  const { product } = (location.state as any) || {};

  const getChatListData = async (items: any[]) => {
    setChatItems(items);
  };

  useEffect(() => {
    const fetchChatList = async () => {
      const q = query(
        collection(fs, "Chats"),
        where("productID", "==", product.id)
      );

      const querySnapshot = await getDocs(q);

      const items = querySnapshot.docs.map((doc) => doc.data());

      getChatListData(items);
    };

    fetchChatList();
  }, [product]);

  const handleLoadChats = (item: any) => {
    let roomId = helper.getEncodedString(
      String(item.buyer),
      String(item.productID),
      String(item.seller)
    );

    props.setRoomIdFromChatList(roomId);
    props.setBuyerIdFromChatList(item.buyer);
  };

  return (
    <>
      <div className="col-xl-4">
        <div className="msgs-list mb30">
          {/* <div className="msg-title1">
            <div className="srch_br">
              <input className="list_search" type="text" placeholder="Search" />
              <i className="fas fa-search list_srch_icon"></i>
            </div>
          </div> */}
          <div className="messages-list scrollstyle_4">
            <ul>
              {!!chatItems &&
                chatItems.map((item: any) => {
                  return (
                    !!user && (
                      <li
                        key={Math.random()}
                        className="active"
                        onClick={() => handleLoadChats(item)}
                      >
                        <div className="usr-msg-details">
                          <div className="usr-ms-img">
                            {/* <img className="user-dp" src="" alt="" /> */}
                            <Avatar icon={<UserOutlined />} size="small" />
                            {/* <span className="msg-status"></span> */}
                          </div>
                          <div className="usr-mg-info">
                            <h3>{item.product}</h3>
                            <p>
                              {user.userName === item.buyerUserName
                                ? item.sellerUserName
                                : user.userName === item.sellerUserName
                                ? item.buyerUserName
                                : "Not Defined"}
                            </p>
                          </div>
                        </div>
                      </li>
                    )
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
