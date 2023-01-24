import {
  Col,
  Row,
  Space,
  List,
  Tabs,
  Divider,
  Tag,
  InputNumber,
  Select,
  TabsProps,
  Skeleton,
  Typography,
  Badge,
  Avatar,
} from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import kid1img from "../../assets/img/kid-1.png";
import kid2img from "../../assets/img/kid-2.png";
import kid3img from "../../assets/img/kid-3.png";
import dealimg from "../../assets/img/deal-img.png";
import * as routes from "../../../constants/routes";
import { UserType } from "../../../enums";
import { useEffect, useState } from "react";
import * as AuthService from "../../../store/auth/auth.actions";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { UserProductsListPage } from "./UserProducts";
import { DealResponse } from "../../../types";
import useEffectOnce from "../../../hooks/useEffectOnce";
import * as DealService from "../../../store/deal/deal.actions";
import { InboxDealLister, OutboxDealLister } from "../../Components/DealLister";
import { UserWallet } from "../../Components/UserWallet";
import { SaveFilled, SaveOutlined } from "@ant-design/icons";
import * as ConfigService from "../../../store/config/config.actions";
import { ProfileMainCard } from "./ProfileCard";
import { KidDivFlex } from "../../Components/KidDivFlex";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../../util/notifications";
import {
  clearDealStateError,
  clearDealStateStatus,
} from "../../../store/deal/deal.slice";
import { store } from "../../../store";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import * as ProductService from "../../../store/product/product.actions";
import * as TransactionService from "../../../store/transaction/transaction.actions";
import {
  clearTransactionStateError,
  clearTransactionStateStatus,
} from "../../../store/transaction/transaction.slice";

interface ParentProfilePageProps {
  signupType: UserType.PARENT;
}

export const ParentProfilePage = (props: ParentProfilePageProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const navigate = useNavigate();

  const {
    status: dealStatus,
    error: dealError,
    parentDeals,
    childDeals,
  } = useAppSelector((state) => state.deal);

  const [newParentDealCount, setNewParentDealCount] = useState<number>(0);

  const {
    status: tranStatus,
    error: tranError,
    transactions,
  } = useAppSelector((state) => state.transaction);

  const {
    user,
    error: authError,
    status: authStatus,
  } = useAppSelector((state) => state.auth);

  const [activeTabIndex, setActiveTabIndex] = useState<string>("1");

  const childrenData = user.children;

  const onTabIndexChanged: TabsProps["onChange"] = (key) => {
    initActiveTab(key);

    setActiveTabIndex(key);
  };

  useEffectOnce(() => {
    dispatch(DealService.fetchUserDeals());
  });

  useEffect(() => {
    if (location.state) {
      initActiveTab(location.state.activeTabIndex);

      setActiveTabIndex(location.state.activeTabIndex);
    }
  }, [location.state]);

  useEffect(() => {
    if (dealError) {
      displayErrorMessage(dealError);
      dispatch(clearDealStateError());
    }
  }, [dispatch, dealError]);

  useEffect(() => {
    if (dealStatus === "sendParentApprovalResolved") {
      displaySuccessNotification("Marked successfully");
      dispatch(DealService.fetchUserDeals());
      dispatch(DealService.fetchChildUserDeals());
    }
    if (dealStatus === "markConfirmationResolved") {
      displaySuccessNotification("Received successfully");
      dispatch(DealService.fetchUserDeals());
      dispatch(DealService.fetchChildUserDeals());
    }
    if (dealStatus === "sendSellerApprovalResolved") {
      displaySuccessNotification("Deal has been confirmed");
      dispatch(DealService.fetchUserDeals());
      dispatch(DealService.fetchChildUserDeals());
    }
    if (dealStatus.endsWith("Resolved")) {
      dispatch(clearDealStateStatus());
    }
    if (dealStatus === "fetchUserDealsResolved") {
      if (parentDeals && parentDeals.length > 0) {
        setNewParentDealCount(
          parentDeals.filter((pd) => pd.seenBySeller === false).length
        );
      }
      dispatch(clearDealStateStatus());
    }
  }, [dispatch, dealStatus]);

  useEffect(() => {
    if (tranError) {
      displayErrorMessage(tranError);
      dispatch(clearTransactionStateError());
    }
  }, [dispatch, tranError]);

  useEffect(() => {
    if (tranStatus === "transferCreditsResolved") {
      displaySuccessNotification("Credits have been transferred successfully.");
      dispatch(AuthService.fetchChildrenProfile());
      dispatch(clearTransactionStateStatus());
    }
    if (tranStatus === "redeemCreditsResolved") {
      displaySuccessNotification("Your request has been sent for approval.");
      dispatch(AuthService.loadCurrentProfile());
      dispatch(clearTransactionStateStatus());
    }
  }, [dispatch, tranStatus]);

  const selectBefore = (
    <Select defaultValue="add" style={{ width: 60 }}>
      <Select.Option value="add">+</Select.Option>
      <Select.Option value="minus">-</Select.Option>
    </Select>
  );

  const initActiveTab = (key: string) => {
    if (key === "1") {
      if (user.userType === UserType.PARENT) {
        dispatch(AuthService.fetchChildrenProfile());
      }
    } else if (key === "2") {
      dispatch(ProductService.fetchUserProducts());
    } else if (key === "3" || key === "4") {
      dispatch(DealService.fetchUserDeals());

      // if (user.userType === UserType.PARENT) {
      //   dispatch(DealService.fetchChildUserDeals());
      // }
    } else if (key === "5") {
      dispatch(ConfigService.fetchChargesSetup());
      dispatch(AuthService.loadCurrentProfile());
      dispatch(
        TransactionService.fetchAllTransactions({ pageNo: 1, pageSize: 10 })
      );
    }
  };

  useScrollToTop();

  return (
    <>
      <div id="row">
        <div className="col-lg-12">
          <Tabs
            type="card"
            centered
            activeKey={activeTabIndex}
            onChange={onTabIndexChanged}
            items={[
              {
                label: "Profile",
                key: "1",
                children: <ProfileTabPan />,
              },
              {
                label: "My Products",
                key: "2",
                children: <UserProductsListPage />,
              },
              {
                label: (
                  <>
                    <Typography.Text> Deal Inbox</Typography.Text>{" "}
                    {newParentDealCount > 0 && (
                      <Badge
                        className="site-badge-count-109"
                        count={newParentDealCount + " +"}
                        style={{ backgroundColor: "tomato" }}
                      />
                    )}
                  </>
                ),
                key: "3",
                children: (
                  <>
                    {dealStatus === "fetchUserDealsPending" ? (
                      <Skeleton active />
                    ) : (
                      <DealInboxTabPan
                        parentDeals={parentDeals}
                        childDeals={childDeals}
                      />
                    )}
                  </>
                ),
              },
              {
                label: "Deal Outbox",
                key: "4",
                children: (
                  <>
                    {dealStatus === "fetchUserDealsPending" ? (
                      <Skeleton active />
                    ) : (
                      <DealOutboxTabPan
                        parentDeals={parentDeals}
                        childDeals={childDeals}
                      />
                    )}
                  </>
                ),
              },
              {
                label: "User Wallet",
                key: "5",
                children: <UserWallet />,
              },
            ]}
          ></Tabs>
        </div>
      </div>
    </>
  );
};

const ProfileTabPan = () => {
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  return (
    <>
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
          <h2 className="text-center headingPrimary">My Profile</h2>
          <h4 className="text-center subHeading">
            Checkout your profile and settings
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-lg-offset-3">
          <ProfileMainCard />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <KidDivFlex />
        </div>
      </div>

      {user.userType === UserType.PARENT && (
        <div className="row">
          <Divider />
          <div className="text-center">
            <Space>
              <button
                className="btn-round-sec btn-block"
                type="button"
                onClick={() => navigate(routes.CHILD_SIGNUP)}
              >
                Create Child Account
              </button>
            </Space>
          </div>
        </div>
      )}
    </>
  );
};

interface DealboxTabPanProps {
  parentDeals: DealResponse[];
  childDeals: DealResponse[];
}

const DealInboxTabPan = (props: DealboxTabPanProps) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const items = [];

  if (user.userType === UserType.PARENT) {
    items.push({
      label: "Parent Deals",
      key: "1",
      children: <InboxDealLister deals={props.parentDeals} />,
    });
    items.push({
      label: "Child Deals",
      key: "2",
      children: props.childDeals && (
        <InboxDealLister deals={props.childDeals} />
      ),
    });
  } else if (user.userType === UserType.CHILD) {
    items.push({
      label: "Child Deals",
      key: "2",
      children: props.childDeals && (
        <InboxDealLister deals={props.childDeals} />
      ),
    });
  }

  useEffectOnce(() => {
    if (user.userType === UserType.CHILD) {
      dispatch(DealService.fetchChildUserDeals());
    }
  });

  const onTabIndexChanged: TabsProps["onChange"] = (key) => {
    if (key === "2") {
      dispatch(DealService.fetchChildUserDeals());
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
          <h2 className="text-center headingPrimary">My Deals</h2>
          <h4 className="text-center subHeading">
            Check your deals with buyers
          </h4>
        </div>
      </div>
      <Tabs
        onChange={onTabIndexChanged}
        type="card"
        tabPosition="left"
        items={items}
      ></Tabs>
    </>
  );
};

const DealOutboxTabPan = (props: DealboxTabPanProps) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const items = [];

  if (user.userType === UserType.PARENT) {
    items.push({
      label: "Parent Deals",
      key: "1",
      children: <OutboxDealLister deals={props.parentDeals} />,
    });
    items.push({
      label: "Child Deals",
      key: "2",
      children: props.childDeals && (
        <OutboxDealLister deals={props.childDeals} />
      ),
    });
  } else if (user.userType === UserType.CHILD) {
    items.push({
      label: "Child Deals",
      key: "1",
      children: props.childDeals && (
        <OutboxDealLister deals={props.childDeals} />
      ),
    });
  }

  useEffectOnce(() => {
    if (user.userType === UserType.CHILD) {
      dispatch(DealService.fetchChildUserDeals());
    }
  });

  const onTabIndexChanged: TabsProps["onChange"] = (key) => {
    if (key === "2") {
      dispatch(DealService.fetchChildUserDeals());
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
          <h2 className="text-center headingPrimary">My Deals</h2>
          <h4 className="text-center subHeading">
            Check your deals with sellers
          </h4>
        </div>
      </div>
      <div className="row">
        <Tabs
          onChange={onTabIndexChanged}
          type="card"
          tabPosition="left"
          items={items}
        ></Tabs>
      </div>
    </>
  );
};
