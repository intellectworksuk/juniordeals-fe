import {
  Button,
  Input,
  Pagination,
  Popconfirm,
  Skeleton,
  Space,
  Table,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ProductList } from "../Product";
// import * as DealService from "../../store/deal/deal.actions";
import * as AdminService from "../../store/admin/admin.actions";
import * as TransactionService from "../../store/transaction/transaction.actions";
import { useEffect, useRef, useState } from "react";
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
import * as ConfigService from "../../store/config/config.actions";
import * as ProductService from "../../store/product/product.actions";
import type { PaginationProps } from "antd";
import { useScrollToTop } from "../../hooks/useScrollToTop";

const { Search } = Input;

export const AdminHomePage = () => {
  const [reasonInputRef, setReasonInputRef] = useState<string>("");

  const location = useLocation();

  const dispatch = useAppDispatch();

  const {
    status: adminStatus,
    error: adminError,
    deals,
    usersPaging,
  } = useAppSelector((state) => state.admin);

  const { setups } = useAppSelector((state) => state.config);
  const {
    status: tranStatus,
    error: tranError,
    redemptions,
  } = useAppSelector((state) => state.transaction);

  const [activeTabIndex, setActiveTabIndex] = useState<string>("1");
  const [userSearchText1, setUserSearchText1] = useState<string>("");
  const [userSearchText2, setUserSearchText2] = useState<string>("");
  const [userCurrentPage, setUserCurrentPage] = useState<number>(1);

  const { activeUsersCount, inActiveUsersCount } = useAppSelector(
    (state) => state.admin
  );

  const {
    status: productStatus,
    error: productError,
    paging: productPaging,
  } = useAppSelector((state) => state.product);

  const onTabIndexChanged: TabsProps["onChange"] = (key) => {
    initActiveTab(key);

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
      displaySuccessNotification("Credits have been transferred successfully.");
      // dispatch(AdminService.fetchAllUsers());
      dispatch(clearTransactionStateStatus());
    }
    if (tranStatus === "approveRedemptionResolved") {
      displaySuccessNotification("Redeem request has been approved");
      dispatch(TransactionService.fetchAllRedemptions());
      dispatch(clearTransactionStateStatus());
    }
    if (tranStatus === "rejectRedemptionResolved") {
      displaySuccessNotification("Redeem request has been rejected");
      dispatch(TransactionService.fetchAllRedemptions());
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

    dispatch(
      ProductService.fetchAllProducts({
        pageNo: productPaging.pageNumber,
        pageSize: productPaging.pageSize,
      })
    );
  });

  useEffect(() => {
    if (location.state) {
      initActiveTab(location.state.activeTabIndex);

      setActiveTabIndex(location.state.activeTabIndex);
    }
  }, [location.state]);

  const onUserPageChange1: PaginationProps["onChange"] = (page, pageSize) => {
    dispatch(
      AdminService.fetchAllUsers({
        searchText: userSearchText1,
        pageNo: page,
        pageSize: pageSize,
      })
    );

    setUserCurrentPage(page);
  };

  const onUserPageChange2: PaginationProps["onChange"] = (page, pageSize) => {
    dispatch(
      AdminService.fetchAllUsers({
        searchText: userSearchText2,
        pageNo: page,
        pageSize: pageSize,
      })
    );

    setUserCurrentPage(page);
  };

  const initActiveTab = (key: string) => {
    if (key === "1") {
      dispatch(
        ProductService.fetchAllProducts({
          pageNo: productPaging.pageNumber,
          pageSize: productPaging.pageSize,
        })
      );
    } else if (key === "2") {
      // dispatch(AdminService.fetchAllDeals(0))
    } else if (key === "3") {
      dispatch(
        AdminService.fetchAllUsers({
          searchText: userSearchText1,
          pageNo: 1,
          pageSize: 10,
        })
      );
    } else if (key === "4") {
      dispatch(
        AdminService.fetchAllUsers({
          searchText: userSearchText2,
          pageNo: 1,
          pageSize: 10,
        })
      );
    } else if (key === "5") {
      dispatch(ConfigService.fetchChargesSetup());

      dispatch(TransactionService.fetchAllRedemptions());
    }
  };

  const onRejectConfirm = (ev: any, recordId: bigint) => {
    if (reasonInputRef.length > 0) {
      dispatch(
        TransactionService.rejectRedemption({
          recordId: recordId,
          reason: reasonInputRef,
        })
      );
      setReasonInputRef("");
    }
  };

  const onRejectCancel = (ev: any) => {
    console.log(ev);
  };

  useScrollToTop();

  return (
    <>
      <div className="row">
        <div className="col-lg-12 text-center">
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
                          <option value="1">Pending Approval</option>
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
                label: "Manage Points",
                key: "3",
                children: (
                  <>
                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6">
                        <Search
                          onSearch={(searchText) => {
                            setUserSearchText1(searchText);

                            setUserCurrentPage(1);

                            dispatch(
                              AdminService.fetchAllUsers({
                                searchText: searchText,
                                pageNo: 1,
                                pageSize: 10,
                              })
                            );
                          }}
                          size="large"
                          enterButton
                          placeholder="Enter user name"
                        />
                      </div>
                      <div className="col-lg-3"></div>
                    </div>
                    <br />
                    {adminStatus === "fetchAllUsersPending" ? (
                      <Skeleton active />
                    ) : (
                      <AdjustUserCreditPage />
                    )}
                    <br />
                    <div className="row">
                      <div className="col-lg-12  text-center">
                        <Pagination
                          current={userCurrentPage}
                          showSizeChanger={false}
                          onChange={onUserPageChange1}
                          total={usersPaging.totalCount}
                          showTotal={(total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`
                          }
                          // defaultPageSize={20}
                          // defaultCurrent={1}
                        />
                      </div>
                    </div>
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
                          onSearch={(searchText) => {
                            setUserSearchText2(searchText);

                            setUserCurrentPage(1);

                            dispatch(
                              AdminService.fetchAllUsers({
                                searchText: searchText,
                                pageNo: 1,
                                pageSize: 10,
                              })
                            );
                          }}
                          size="large"
                          enterButton
                          placeholder="Enter user name"
                        />
                      </div>
                      <div className="col-lg-3"></div>
                    </div>
                    <br />
                    {adminStatus === "fetchAllUsersPending" ? (
                      <Skeleton active />
                    ) : (
                      <UserDivFlex />
                    )}
                    <br />
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <Pagination
                          current={userCurrentPage}
                          showSizeChanger={false}
                          onChange={onUserPageChange2}
                          total={usersPaging.totalCount}
                          showTotal={(total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`
                          }
                          // defaultPageSize={20}
                          // defaultCurrent={1}
                        />
                      </div>
                    </div>
                  </>
                ),
              },
              {
                label: "Redeem Requests",
                key: "5",
                children: (
                  <>
                    {tranStatus === "fetchAllRedemptionsPending" ? (
                      <Skeleton active />
                    ) : (
                      <Table
                        pagination={{ total: redemptions.length, pageSize: 10 }}
                        columns={[
                          {
                            title: "id",
                            dataIndex: "id",
                            key: "id",
                            width: "5%",
                          },
                          {
                            title: "Name",
                            dataIndex: ["applicationUser", "fullName"],
                            key: "fullName",
                          },
                          {
                            title: (
                              <>
                                {"Available"} <br /> {"Credits"}
                              </>
                            ),
                            dataIndex: ["applicationUser", "availableCredits"],
                            key: "availableCredits",
                            width: "10%",
                            align: "center",
                            render: (value: Number) => (
                              <>
                                {value}
                                <br />
                                {
                                  <Tag
                                    color="LightSlateGray"
                                    style={{ fontSize: 10 }}
                                  >
                                    <b>
                                      {`${setups.charges.Currency} ${
                                        (Number(value) || 0) /
                                        (setups.charges.JDPoints === 0
                                          ? 1
                                          : setups.charges.JDPoints)
                                      }` || 0}
                                    </b>
                                  </Tag>
                                }
                              </>
                            ),
                          },
                          {
                            title: (
                              <>
                                {"Requested"} <br /> {"Credits"}
                              </>
                            ),
                            dataIndex: "credits",
                            key: "credits",
                            width: "10%",
                            align: "center",
                            render: (value: Number) => (
                              <>
                                {value}
                                <br />
                                {
                                  <Tag
                                    color="LightSlateGray"
                                    style={{ fontSize: 10 }}
                                  >
                                    <b>
                                      {`${setups.charges.Currency} ${
                                        (Number(value) || 0) /
                                        (setups.charges.JDPoints === 0
                                          ? 1
                                          : setups.charges.JDPoints)
                                      }` || 0}
                                    </b>
                                  </Tag>
                                }
                              </>
                            ),
                          },
                          {
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
                            width: "10%",
                            render: (text: string) => (
                              <Tag
                                color={
                                  text === "Approved"
                                    ? "green"
                                    : text === "Rejected"
                                    ? "red"
                                    : "orange"
                                }
                                key={text}
                              >
                                {text}
                              </Tag>
                            ),
                          },
                          {
                            title: "Comments",
                            dataIndex: "comments",
                            key: "comments",
                            width: "20%",
                            // render: (text: string) => (
                            //   <>
                            //     {text.substring(0, 30)}
                            //   </>
                            // ),
                          },
                          {
                            title: "Actions",
                            dataIndex: "id",
                            key: "actions",
                            width: "15%",
                            render: (_, record) => (
                              <>
                                {record.status === "Pending" && (
                                  <Space>
                                    <Button
                                      shape="round"
                                      onClick={() =>
                                        dispatch(
                                          TransactionService.approveRedemption(
                                            record.id
                                          )
                                        )
                                      }
                                    >
                                      Approve
                                    </Button>
                                    <Popconfirm
                                      title={
                                        <>
                                          <textarea
                                            className="inpCtrl"
                                            id="reasonInputRef"
                                            name="reasonInputRef"
                                            placeholder="Please specify reason of rejection?"
                                            onChange={(e) =>
                                              setReasonInputRef(e.target.value)
                                            }
                                          />
                                        </>
                                      }
                                      onConfirm={(e) =>
                                        onRejectConfirm(e, record.id)
                                      }
                                      onCancel={onRejectCancel}
                                      okText="Reject"
                                      cancelText="Cancel"
                                    >
                                      <Button
                                        shape="round"
                                        type="primary"
                                        danger
                                        // onClick={() =>
                                        //   dispatch(
                                        //     TransactionService.rejectRedemption(
                                        //       record.id
                                        //     )
                                        //   )
                                        // }
                                      >
                                        Reject
                                      </Button>
                                    </Popconfirm>
                                  </Space>
                                )}
                              </>
                            ),
                          },
                        ]}
                        dataSource={redemptions}
                      />
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

// const PopconfirmInputReason = () => {
//   return (<>
//   <div className="row">
//     <div className="col-lg-12">

//     </div>
//   </div>
//   </>)
// }
