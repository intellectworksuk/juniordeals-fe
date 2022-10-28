import { Input, Skeleton, Space, Tabs, TabsProps, Tag } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ProductList } from "../Product";
// import * as DealService from "../../store/deal/deal.actions";
import * as AdminService from "../../store/admin/admin.actions";
import { useEffect, useState } from "react";
import { AdminDealLister } from "../Components/DealLister";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../util/notifications";
import { clearDealStateError } from "../../store/deal/deal.slice";
import { AdjustUserCreditPage } from "./AdjustCredist";
import { clearTransactionStateStatus } from "../../store/transaction/transaction.slice";
import { clearAdminStateStatus } from "../../store/admin/admin.slice";
import { UserDivFlex } from "../Components/UserDivFlex";
import useEffectOnce from "../../hooks/useEffectOnce";
import { onValue, ref } from "firebase/database";
import { useFireBase } from "../Components/ChatStore/firebase/config";
import { useLocation } from "react-router-dom";

const { Search } = Input;

export const AdminHomePage = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const {
    status: adminStatus,
    error: adminError,
    deals,
  } = useAppSelector((state) => state.admin);

  const { status: tranStatus, error: tranError } = useAppSelector(
    (state) => state.transaction
  );

  const [activeTabIndex, setActiveTabIndex] = useState<string>("1");

  const { activeUsersCount, inActiveUsersCount } = useAppSelector(
    (state) => state.admin
  );

  const onTabIndexChanged: TabsProps["onChange"] = (key) => {
    if (key === "1") {
    } else if (key === "2") {
      // dispatch(AdminService.fetchAllDeals(0))
    } else if (key === "3") {
      // dispatch(AdminService.fetchAllUsers());
    }

    setActiveTabIndex(key);
  };

  useEffect(() => {
    if (adminError) {
      displayErrorMessage(adminError);
      dispatch(clearDealStateError());
    }
  }, [dispatch, adminError]);

  useEffect(() => {
    if (tranError) {
      displayErrorMessage(tranError);
      dispatch(clearDealStateError());
    }
  }, [dispatch, tranError]);

  useEffect(() => {
    if (tranStatus === "transferCreditsResolved") {
      displaySuccessNotification("Transaction successful");
      // dispatch(AdminService.fetchAllUsers());
      dispatch(clearTransactionStateStatus());
    }
  }, [dispatch, tranStatus]);

  useEffect(() => {
    if (adminStatus === "sendAdminDealStatusResolved") {
      // dispatch(AdminService.fetchAllDeals(0));
      dispatch(clearAdminStateStatus());
    }
    if (adminStatus === "updateUserStatusResolved") {
      displaySuccessNotification("Account status has been changed");

      dispatch(AdminService.fetchUserStats());

      dispatch(clearAdminStateStatus());
    }
  }, [dispatch, adminStatus]);

  const [auth, fs, db] = useFireBase();

  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  useEffectOnce(() => {
    const starCountRef = ref(db, "/status/");
    onValue(starCountRef, (snapshot) => {
      // const data = snapshot.val();
      let onlineUserCount: number = 0;
      snapshot.forEach((status) => {
        if (status.val().state === "online") {
          ++onlineUserCount;
        }
      });

      setOnlineUsers(onlineUserCount);
    });

    dispatch(AdminService.fetchUserStats());
  });

  useEffect(() => {
    if (location.state) {
      setActiveTabIndex(location.state.activeTabIndex);
    }
  }, [location.state]);

  return (
    <>
      <div className="row">
        <div className="col-lg-8 col-lg-offset-4">
          <Space direction="horizontal">
            <Tag color="darkgreen">{`${activeUsersCount} Active Users`}</Tag>
            <Tag color="orange">{`${onlineUsers} Online Users`}</Tag>
            <Tag color="red">{`${inActiveUsersCount} In active Users`}</Tag>
          </Space>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-12">
          <Tabs
            centered
            type="card"
            tabPosition="top"
            activeKey={activeTabIndex}
            onChange={onTabIndexChanged}
            items={[
              {
                label: "Products",
                key: "1",
                children: <ProductList />,
              },
              {
                label: "Manage Deals",
                key: "2",
                children: (
                  <>
                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6">
                        <select
                          className="inpCtrl"
                          onChange={(e) =>
                            dispatch(
                              AdminService.fetchAllDeals(Number(e.target.value))
                            )
                          }
                        >
                          <option value="-1">Select Deal Status</option>
                          <option value="1">Created</option>
                          <option value="2">Approved by buyer</option>
                          <option value="3">Approved by seller</option>
                          <option value="6">Mark as complete</option>
                          <option value="5">Cancel</option>
                        </select>
                      </div>
                      <div className="col-lg-3"></div>
                    </div>
                    {adminStatus === "fetchAllDealsPending" ? (
                      <Skeleton active />
                    ) : (
                      <div className="row">
                        <div className="col-lg-12">
                          <AdminDealLister
                            deals={deals}
                            onDealResponse={(resp, deal) =>
                              dispatch(
                                AdminService.updateDealStatus({
                                  resp: resp,
                                  deal: deal,
                                })
                              )
                            }
                          />
                        </div>
                      </div>
                    )}
                  </>
                ),
              },
              {
                label: "Manage Credits",
                key: "3",
                children: (
                  <>
                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6">
                        <Search
                          onSearch={(searchText) =>
                            dispatch(AdminService.fetchAllUsers(searchText))
                          }
                          size="large"
                          enterButton
                        />
                      </div>
                      <div className="col-lg-3"></div>
                    </div>
                    {adminStatus === "fetchAllUsersPending" ? (
                      <Skeleton active />
                    ) : (
                      <AdjustUserCreditPage />
                    )}
                  </>
                ),
              },
              {
                label: "Manage Users",
                key: "4",
                children: (
                  <>
                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6">
                        <Search
                          onSearch={(searchText) =>
                            dispatch(AdminService.fetchAllUsers(searchText))
                          }
                          size="large"
                          enterButton
                        />
                      </div>
                      <div className="col-lg-3"></div>
                    </div>
                    {adminStatus === "fetchAllUsersPending" ? (
                      <Skeleton active />
                    ) : (
                      <UserDivFlex />
                    )}
                  </>
                ),
              },
            ]}
          ></Tabs>
        </div>
      </div>
    </>
  );
};
