import { DealProductResponse, DealResponse, User } from "../../types";
import md1 from "../assets/img/md1.jpg";
import * as DealService from "../../store/deal/deal.actions";
import * as AdminService from "../../store/admin/admin.actions";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  Avatar,
  Image,
  List,
  Modal,
  Space,
  Spin,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { DealDonePage } from "../DealFlow/DealDone";
import { useEffect, useState } from "react";
import { UserType } from "../../enums";
import { store } from "../../store";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../util/notifications";
import { DealReceivePage } from "../DealFlow/DealReceive";
import { DealStatus, DealStatusEnum } from "../../enums/deal.status.enum";
import inoutImg from "../assets/img/in-out.jpg";
import outinImg from "../assets/img/out-in.jpg";
import moment from "moment";
import { ProductAvatar } from "./ProductAvatar";

interface DealListerProps {
  deals: DealResponse[];
  onDealResponse?: (resp: any, deal: DealResponse) => void;
}

interface DealTemplateProps {
  deal: DealResponse;
  user: User;
  dealStatus: string;
  listType?: "inbox" | "outbox" | "all";
  onDealResponse?: (resp: any, deal: DealResponse) => void;
}

const { Paragraph, Text, Title } = Typography;

export const AdminDealLister = (props: DealListerProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const { status: dealStatus, error: dealError } = useAppSelector(
    (state) => state.deal
  );

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={props.deals}
        renderItem={(deal) => (
          <List.Item>
            <List.Item.Meta
              title={<></>}
              description={
                <DealTemplate
                  deal={deal}
                  user={user}
                  dealStatus={dealStatus}
                  listType="all"
                  onDealResponse={props.onDealResponse}
                />
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export const InboxDealLister = (props: DealListerProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const { status: dealStatus, error: dealError } = useAppSelector(
    (state) => state.deal
  );

  const inboxdeals = props.deals.filter(
    (d) =>
      BigInt(d.sellerId!) === BigInt(user.id!) ||
      user.children?.some((c) => BigInt(c.id!) === BigInt(d.sellerId!))
  );

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={inboxdeals}
        renderItem={(deal) => (
          <List.Item>
            <List.Item.Meta
              title={<></>}
              description={
                <DealTemplate
                  deal={deal}
                  user={user}
                  dealStatus={dealStatus}
                  listType="inbox"
                />
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export const OutboxDealLister = (props: DealListerProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const { status: dealStatus, error: dealError } = useAppSelector(
    (state) => state.deal
  );

  const outboxdeals = props.deals.filter(
    (d) =>
      BigInt(d.buyerId!) === BigInt(user.id!) ||
      user.children?.some((c) => BigInt(c.id!) === BigInt(d.buyerId))
  );

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={outboxdeals}
        renderItem={(deal) => (
          <List.Item>
            <List.Item.Meta
              title={<></>}
              description={
                <DealTemplate
                  deal={deal}
                  user={user}
                  dealStatus={dealStatus}
                  listType="outbox"
                />
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

const DealTemplate = (props: DealTemplateProps) => {
  const deal = props.deal;
  const user = props.user;
  const dealStatus = props.dealStatus;

  // const sendParentDealApproval = () => {
  //   dispatch(DealService.sendParentApproval(deal.id!));
  // };

  // const markDealAsComplete = () => {
  //   dispatch(DealService.markDealAsComplete(deal.id!));
  // };

  // const sendForApproval = (values: any) => {
  //   dispatch(DealService.sendSellerDealApproval(values));
  // };

  return (
    <>
      <section className="sec-customer-cart">
        <div className="cust-cart">
          <div className="generic-lister">
            <div className="list-item">
              <h2>
                <p>{deal.id}</p>
              </h2>
              <DealInfo
                deal={deal}
                user={user}
                dealStatus={dealStatus}
                listType={props.listType}
              />

              {props.listType && (
                <>
                  {[UserType.SUPER_ADMIN, UserType.ADMIN].includes(
                    Number(user.userType)
                  ) ? (
                    <AdminDealInfoStatus
                      deal={deal}
                      user={user}
                      dealStatus={dealStatus}
                      onDealResponse={props.onDealResponse}
                    />
                  ) : props.listType === "inbox" ? (
                    <InboxDealInfoStatus
                      deal={deal}
                      user={user}
                      dealStatus={dealStatus}
                    />
                  ) : props.listType === "outbox" ? (
                    <OutboxDealInfoStatus
                      deal={deal}
                      user={user}
                      dealStatus={dealStatus}
                    />
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const DealInfo = (props: DealTemplateProps) => {
  const deal = props.deal;

  return (
    <>
      {deal.barterProduct ? (
        <>
          {props.listType === "outbox" ? (
            <>
              <BarterProductItemDescription
                deal={deal}
                user={props.user}
                dealStatus={props.dealStatus}
              />
              <Avatar
                size={128}
                style={{ backgroundColor: "rgb(255,255,255)" }}
              >
                <Image preview={false} src={inoutImg} />
              </Avatar>
              <NormalProductItemDescription
                deal={deal}
                user={props.user}
                dealStatus={props.dealStatus}
              />
            </>
          ) : (
            <>
              <NormalProductItemDescription
                deal={deal}
                user={props.user}
                dealStatus={props.dealStatus}
              />
              <Avatar
                size={128}
                style={{ backgroundColor: "rgb(255,255,255)" }}
              >
                <Image preview={false} src={inoutImg} />
              </Avatar>
              <BarterProductItemDescription
                deal={deal}
                user={props.user}
                dealStatus={props.dealStatus}
              />
            </>
          )}
        </>
      ) : (
        <NormalProductItemDescription
          deal={deal}
          user={props.user}
          dealStatus={props.dealStatus}
        />
      )}
      <div className="item-price">
        <Space direction="horizontal">
          <small>
            <b>Deal Credits: </b>
          </small>
          <h3>{deal.dealCredits}</h3>
        </Space>
      </div>
    </>
  );
};

const InboxDealInfoStatus = (props: DealTemplateProps) => {
  const dispatch = useAppDispatch();
  const deal = props.deal;
  const user = props.user;
  const dealStatus = props.dealStatus;

  const [isDealDoneModalVisible, setIsDealDoneModalVisible] = useState(false);
  const [isDealReceiveModalVisible, setIsDealReceiveModalVisible] =
    useState(false);
  const [modalDeal, setModalDeal] = useState<DealResponse>();

  const showDealDoneModal = (item: DealResponse) => {
    setIsDealDoneModalVisible(true);
    setIsDealReceiveModalVisible(false);

    setModalDeal(item);
  };

  const showDealReceiveModal = (item: DealResponse) => {
    setIsDealDoneModalVisible(false);
    setIsDealReceiveModalVisible(true);

    setModalDeal(item);
  };

  const handleOk = () => {
    setIsDealDoneModalVisible(false);
    setIsDealReceiveModalVisible(false);
  };

  const handleCancel = () => {
    setIsDealDoneModalVisible(false);
    setIsDealReceiveModalVisible(false);
  };

  return (
    <>
      <div>
        {deal.status === DealStatus.Created &&
        user?.userType === UserType.PARENT ? (
          <button
            className="btn-round btn-block"
            type="button"
            onClick={() => DealService.sendParentApproval(deal.id!)}
            disabled={dealStatus === "sendParentApprovalPending"}
          >
            <span id="button-text">
              {dealStatus === "sendParentApprovalPending" ? (
                <Spin size="small" />
              ) : (
                "Approve"
              )}
            </span>
          </button>
        ) : deal.status === DealStatus.Created &&
          user?.userType === UserType.CHILD ? (
          <Tag color="orange">
            <Tooltip title="Waiting for Parent's Receipt">
              <Text>Waiting</Text>
            </Tooltip>
          </Tag>
        ) : deal.status === DealStatus.ApprovedByBuyer ? (
          <button
            className="btn-round btn-block"
            type="button"
            onClick={() => showDealDoneModal(deal)}
          >
            Confirm
          </button>
        ) : deal.status === DealStatus.ApprovedBySeller &&
          !deal.buyerConfirmation ? (
          <Tag color="orange">
            <Tooltip title="Waiting for Buyer's Receipt">
              <Text>Waiting</Text>
            </Tooltip>
          </Tag>
        ) : deal.status === DealStatus.ApprovedBySeller &&
          deal.barterProductId &&
          !deal.sellerConfirmation ? (
          <button
            className="btn-round btn-block"
            type="button"
            onClick={() => showDealReceiveModal(deal)}
          >
            Receive
          </button>
        ) : (
          <Tag color="green">
            {deal.status.startsWith("Complete") ? "Completed" : deal.status}
          </Tag>
        )}
      </div>
      <Modal
        width={1000}
        centered
        title="Approve Deal"
        open={isDealDoneModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <DealDonePage
          filler={deal}
          onDone={DealService.sendSellerDealApproval}
          showAsModal={true}
        />
      </Modal>
      <Modal
        width={1000}
        centered
        title="Receive Deal"
        open={isDealReceiveModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <DealReceivePage filler={deal} />
      </Modal>
    </>
  );
};

const OutboxDealInfoStatus = (props: DealTemplateProps) => {
  const dispatch = useAppDispatch();
  const deal = props.deal;
  const user = props.user;
  const dealStatus = props.dealStatus;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalDeal, setModalDeal] = useState<DealResponse>();

  const showModal = (item: DealResponse) => {
    setIsModalVisible(true);

    setModalDeal(item);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div>
        {deal.status === DealStatus.Created &&
        user?.userType === UserType.PARENT ? (
          <button
            className="btn-round btn-block"
            type="button"
            onClick={() => dispatch(DealService.sendParentApproval(deal.id!))}
            disabled={dealStatus === "sendParentApprovalPending"}
          >
            <span id="button-text">
              {dealStatus === "sendParentApprovalPending" ? (
                <Spin size="small" />
              ) : (
                "Approve"
              )}
            </span>
          </button>
        ) : deal.status === DealStatus.Created &&
          user?.userType === UserType.CHILD ? (
          <Tag color="orange">
            <Tooltip title="Waiting for Parent's Approval">
              <Text>Waiting</Text>
            </Tooltip>
          </Tag>
        ) : deal.status === DealStatus.ApprovedBySeller &&
          !deal.buyerConfirmation ? (
          <button
            className="btn-round btn-block"
            type="button"
            onClick={() => showModal(deal)}
          >
            Receive
          </button>
        ) : deal.status === DealStatus.ApprovedByBuyer ? (
          <Tag color="orange">
            <Tooltip title="Waiting for Seller's Approval">
              <Text>Waiting</Text>
            </Tooltip>
          </Tag>
        ) : deal.status === DealStatus.ApprovedBySeller ||
          (deal.barterProductId && !deal.sellerConfirmation) ? (
          <Tag color="orange">
            <Tooltip title="Waiting for Seller's Receipt">
              <Text>Waiting</Text>
            </Tooltip>
          </Tag>
        ) : (
          <Tag color="green">
            {deal.status.startsWith("Complete") ? "Completed" : deal.status}
          </Tag>
        )}
      </div>
      <Modal
        width={1000}
        centered
        title="Receive Deal"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <DealReceivePage filler={deal} />
      </Modal>
    </>
  );
};

const AdminDealInfoStatus = (props: DealTemplateProps) => {
  const dispatch = useAppDispatch();

  const deal = props.deal;
  const dealStatus = props.dealStatus;

  const [adminDealStatus, setAdminDealStatus] = useState<number>(-1);
  const [selectAdminStatusDiable, setSelectAdminStatusDiable] =
    useState<boolean>(true);

  useEffect(() => {
    if (adminDealStatus > 0) {
      setSelectAdminStatusDiable(false);
    }
  }, [adminDealStatus]);

  return (
    <>
      {DealStatusEnum[deal.status] < 4 && (
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical">
            <Tag
              color={
                deal.status === DealStatus.Created
                  ? "orange"
                  : deal.status === DealStatus.Complete
                  ? "darkgreen"
                  : [
                      String(DealStatus.Cancelled),
                      String(DealStatus.Rejected),
                    ].includes(deal.status)
                  ? "red"
                  : "orange"
              }
            >
              <b>{deal.status}</b>
            </Tag>
            <select
              className="inpCtrl"
              onChange={(e) => setAdminDealStatus(Number(e.target.value))}
            >
              <option value="-1">Select Status</option>
              {DealStatusEnum[deal.status] === 1 && (
                <option value="2">Approved by buyer</option>
              )}
              {DealStatusEnum[deal.status] === 2 && (
                <option value="3">Approved by seller</option>
              )}
              {DealStatusEnum[deal.status] === 3 && (
                <option value="6">Mark as complete</option>
              )}
              {DealStatusEnum[deal.status] < 4 && (
                <option value="5">Cancel</option>
              )}
            </select>

            <button
              className="btn-round btn-block"
              type="button"
              onClick={() =>
                dispatch(
                  AdminService.sendAdminDealStatus({
                    id: deal.id!,
                    status: adminDealStatus,
                  })
                ).then(
                  (resp) =>
                    props.onDealResponse && props.onDealResponse(resp, deal)
                )
              }
              disabled={
                selectAdminStatusDiable ||
                dealStatus === "sendAdminDealStatusPending"
              }
            >
              <span id="button-text">
                {dealStatus === "sendAdminDealStatusPending" ? (
                  <Spin size="small" />
                ) : (
                  "Update"
                )}
              </span>
            </button>
          </Space>
        </div>
      )}
      {DealStatusEnum[deal.status] > 3 && (
        <div>
          <Tag
            color={
              deal.status === DealStatus.Created
                ? "orange"
                : deal.status === DealStatus.Complete
                ? "darkgreen"
                : [
                    String(DealStatus.Cancelled),
                    String(DealStatus.Rejected),
                  ].includes(deal.status)
                ? "red"
                : "orange"
            }
          >
            <b>{deal.status}</b>
          </Tag>
        </div>
      )}
    </>
  );
};

const BarterProductItemDescription = (props: DealTemplateProps) => {
  const deal = props.deal;
  return (
    <>
      <div className="item-description">
        <ProductAvatar productImage={deal.barterProduct?.productImage} />
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: 0,
          }}
        >
          {deal.barterProduct?.title}
        </p>
        <p></p>
        <p>
          <small>
            <b>Delivery Date: </b>
            {moment(deal.buyerDeliveryDate).format("MM-DD-YYYY")}
          </small>
        </p>
        <p>
          <small>
            <b>
              <p className="itemDesc">
                Product Points:{"   "}
                <Tag
                  color="darkgreen"
                  style={{ width: "50px", textAlign: "center" }}
                >
                  <b> {deal.barterProduct?.rate!}</b>
                </Tag>
              </p>
            </b>
          </small>
        </p>
        <p style={{ marginBottom: 0 }}>
          <small>
            <b>Comments: </b> <br />
            {deal.buyerComments}
          </small>
        </p>
      </div>
    </>
  );
};

const NormalProductItemDescription = (props: DealTemplateProps) => {
  const deal = props.deal;
  return (
    <>
      <div className="item-description">
        <ProductAvatar productImage={deal.product.productImage} />
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: 0,
          }}
        >
          {deal.product.title}
        </p>
        <p></p>
        <p>
          <small>
            <b>Delivery Date: </b>
            {moment(deal.sellerDeliveryDate).format("MM-DD-YYYY")}
          </small>
        </p>
        <p>
          <small>
            <b>
              <p className="itemDesc">
                Product Points:{"   "}
                <Tag
                  color="darkgreen"
                  style={{ width: "50px", textAlign: "center" }}
                >
                  <b> {deal.product.rate!}</b>
                </Tag>
              </p>
            </b>
          </small>
        </p>
        <p style={{ marginBottom: 0 }}>
          <small>
            <b>Comments: </b> <br />
            {deal.sellerComments}
          </small>
        </p>
      </div>
    </>
  );
};
