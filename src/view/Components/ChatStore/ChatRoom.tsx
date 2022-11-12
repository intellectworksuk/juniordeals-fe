import Messages from "./Messages";
// import Members from "./Members";
import "./Chat.css";
import { useAuthListener } from "./firebase/useAuthListener";
import { doc, addDoc, collection, updateDoc, getDoc } from "firebase/firestore";
import Textbox from "./TextBox";
import { ProductResponse } from "../../../types";
import { ChatList } from "./ChatList";
import { useState } from "react";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import { DealDonePage } from "../../DealFlow/DealDone";
import { useLocation } from "react-router-dom";
import { SendEmailNotification } from "./SendEmailNotification";

interface UserChatRoomProps {
  checkUserIsOnline: boolean;
}

export default function UserChatRoom(props: UserChatRoomProps) {
  // const current = useAuthListener();
  const location = useLocation();

  const [chatRoomID, setChatRoomID] = useState<string>();
  const [buyerId, setBuyerId] = useState<string>();

  // document.title = "Chat Console";

  const { product, barterProduct, chatUserType } =
    (location.state as any) || {};

  useScrollToTop();

  return (
    <div className="homepage">
      <aside>
        <div className="msg-block" style={{ padding: "10px", height: "620px" }}>
          <details>
            {props.checkUserIsOnline && (
              <>
                <summary>Chat Group</summary>
                <ChatList
                  setRoomIdFromChatList={setChatRoomID}
                  setBuyerIdFromChatList={setBuyerId}
                />
              </>
            )}
          </details>
        </div>
      </aside>
      <main>
        <div className="row text-center">
          <div className="col-lg-12">
            <h4>{product.title}</h4>
          </div>
        </div>

        {props.checkUserIsOnline ? (
          <>
            <Messages chatRoomID={chatRoomID!} />
            <Textbox chatRoomID={chatRoomID!} />
          </>
        ) : (
          <SendEmailNotification
            product={product}
            barterProduct={barterProduct}
          />
        )}
      </main>
      <aside>
        {!chatUserType || chatUserType === "buyer" ? (
          <DealDonePage buyerId={buyerId!} showAsModal={false} />
        ) : (
          <div
            className="item-stage"
            style={{ padding: "10px", height: "620px" }}
          >
            <br />
            <table className="table table-hover table-striped">
              <caption>Purchase History</caption>
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Item Purchased</th>
                  <th>Spent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>Item Title Header Here</td>
                  <td>250 Coins</td>
                </tr>
                <tr>
                  <td>02</td>
                  <td>Item Title Header Here</td>
                  <td>1000 Coins&nbsp;</td>
                </tr>
                <tr>
                  <td>03</td>
                  <td>Item Title Header Here</td>
                  <td>500 Coins&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </aside>
    </div>
  );
}
