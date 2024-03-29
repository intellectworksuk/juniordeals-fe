import { SaveOutlined } from "@ant-design/icons";
import {
  Card,
  Form,
  InputNumber,
  Pagination,
  Select,
  Skeleton,
  Table,
  Tag,
  Typography,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { store } from "../../store";
import moneybag_coins from "../assets/img/moneybag_coins.jpeg";
import wallet_card from "../assets/img/wallet-card.jpeg";
import * as TransactionService from "../../store/transaction/transaction.actions";
import * as AuthService from "../../store/auth/auth.actions";
import useEffectOnce from "../../hooks/useEffectOnce";
import { TransactionData, User } from "../../types";
import { useEffect, useState } from "react";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../util/notifications";
import { TransactionControl } from "./TransactionControl";
import {
  clearTransactionStateError,
  clearTransactionStateStatus,
} from "../../store/transaction/transaction.slice";
import { useNavigate } from "react-router-dom";
import * as routes from "../../constants/routes";
import * as ConfigService from "../../store/config/config.actions";
import { UserType } from "../../enums";
import moment from "moment";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import type { PaginationProps } from "antd";
import { clearAuthStatus } from "../../store/auth/auth.slice";

const { Paragraph, Text, Title } = Typography;

export const UserWallet = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const [inputCredits, setInputCredits] = useState<number>();
  const [redeemInputCredits, setRedeemInputCredits] = useState<number>();
  const [currentTranPage, setTranCurrentPage] = useState(1);

  const { user, status: authStatus } = useAppSelector((state) => state.auth);

  const { setups } = useAppSelector((state) => state.config);
  const {
    transactions,
    redemptions,
    status: tranStatus,
    tranPaging,
  } = useAppSelector((state) => state.transaction);

  const transferCredits = (values: TransactionData) => {
    dispatch(TransactionService.transferCredits(values));
  };

  const transferRedeemCredits = (values: TransactionData) => {
    dispatch(TransactionService.redeemCredits(values));
  };

  useEffectOnce(() => {
    if (transactions && transactions.length === 0) {
      // dispatch(ConfigService.fetchChargesSetup());

      dispatch(
        TransactionService.fetchAllTransactions({ pageNo: 1, pageSize: 10 })
      );
      dispatch(TransactionService.fetchAllRedemptions());
    }
  });

  useEffect(() => {
    if (authStatus === "initPaymentIntentResolved") {
      navigate(routes.START_PAY, {
        state: { credits: inputCredits },
      });
      dispatch(clearAuthStatus());
    }
  }, [authStatus]);

  const onTranPageChange: PaginationProps["onChange"] = (page, pageSize) => {
    dispatch(
      TransactionService.fetchAllTransactions({
        pageNo: page,
        pageSize: pageSize,
      })
    );

    setTranCurrentPage(page);
  };

  useScrollToTop();

  return (
    <>
      <section className="sec-msg-system">
        <div className="row">
          <div
            className="col-lg-8 col-lg-offset-2 col-;
            md-8 col-md-offset-2 col-sm-12 col-xs-12"
          >
            <h2 className="text-center headingPrimary">My Wallet</h2>
            <h4 className="text-center subHeading">
              Buy items with Junior Deal Points
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 text-center">
            <img
              src={wallet_card}
              style={{ margin: "16px", width: "50%" }}
              alt=""
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
            <div className="order-ammount">
              <div className="flex-img-text-bal">
                <img
                  alt=""
                  className="coin-ico"
                  style={{ margin: "16px", width: "48px" }}
                  src={moneybag_coins}
                />
                <span>
                  <strong>Parent's Points in wallet</strong>
                  <br />
                  {setups.charges.JDPoints} Points ={" "}
                  {`${setups.charges["Currency"]} ${setups.charges.Amount}`}
                </span>
              </div>
              <h4 className="text-right">
                {user.availableCredits}
                <br />
                <small>
                  {`${setups.charges.Currency} ${
                    (Number(user.availableCredits) || 0) /
                    (setups.charges.JDPoints === 0
                      ? 1
                      : setups.charges.JDPoints)
                  }` || 0}
                </small>
              </h4>
            </div>
            {user.userType === UserType.PARENT && (
              <TransactionControl
                user={user}
                onSave={() =>
                  (inputCredits || 0) > 0 &&
                  dispatch(AuthService.initPaymentIntent(inputCredits!))
                }
                onChangeCredits={setInputCredits}
                showOperator={false}
              ></TransactionControl>
            )}
            <p className="text-center">
              <Tag color="green" style={{ fontSize: 16 }}>
                <b>
                  {`Points: ${
                    (Number(inputCredits) || 0) * setups.charges.JDPoints!
                  }` || 0}
                </b>
              </Tag>
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3  text-center">
            <Card
              type="inner"
              title="Points Redemption"
              style={{ width: "100%" }}
            >
              <p>
                <Tag color="green" style={{ fontSize: 16 }}>
                  <b>
                    {`${setups.charges.Currency} ${
                      (Number(redeemInputCredits) || 0) /
                      (setups.charges.JDPoints === 0
                        ? 1
                        : setups.charges.JDPoints)
                    }` || 0}
                  </b>
                </Tag>
              </p>
              <p>
                <TransactionControl
                  user={user}
                  type="out"
                  showComments={true}
                  onSave={transferRedeemCredits}
                  showOperator={false}
                  onChangeCredits={setRedeemInputCredits}
                ></TransactionControl>
              </p>
            </Card>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
            {(user.children?.length || 0) > 0 && (
              <span>
                <strong>Child Points in wallet</strong>
              </span>
            )}
          </div>
        </div>
        <hr />
        {user.children?.map((kid: User) => (
          <div className="row" key={Math.random()}>
            <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
              <div className="order-ammount">
                <div className="flex-img-text-bal">
                  <img
                    alt=""
                    className="coin-ico"
                    style={{ margin: "16px", width: "48px" }}
                    src={moneybag_coins}
                  />
                  <span>
                    <strong>{kid.fullName} wallet</strong>
                    <br />
                    {setups.charges.JDPoints} Points ={" "}
                    {`${setups.charges.Currency} ${setups.charges.Amount}`}
                  </span>
                </div>
                <h4 className="text-right">
                  {kid.availableCredits}
                  <br />
                  <small>
                    {`${setups.charges.Currency} ${
                      (Number(kid.availableCredits) || 0) /
                      (setups.charges.JDPoints === 0
                        ? 1
                        : setups.charges.JDPoints)
                    }` || 0}
                  </small>
                </h4>
              </div>
              <TransactionControl
                user={kid}
                onSave={transferCredits}
                showOperator={true}
              ></TransactionControl>
            </div>
          </div>
        ))}
        <hr />
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
            <div className="table-responsive" style={{ overflow: "hidden" }}>
              {tranStatus === "fetchAllTransactionsPending" ? (
                <Skeleton active />
              ) : (
                <>
                  <table className="table table-hover table-striped">
                    <caption>Purchase History</caption>
                    <thead>
                      <tr>
                        <th>Sr.</th>
                        <th>Received By</th>
                        <th>Date</th>
                        <th>Received Credits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tran, index) => (
                        <tr key={index.toString()}>
                          <td>{tran.id}</td>
                          <td>{tran.receiver.fullName}</td>
                          <td>
                            {moment(tran.createdOn).format(
                              "MM-DD-YYYY HH:mm:ss"
                            )}
                          </td>
                          <td>{tran.credits} Points</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br />
                  <table className="table table-hover table-striped">
                    <caption>Deal History</caption>
                    <thead>
                      <tr>
                        <th>Sr.</th>
                        <th>Item Purchased</th>
                        <th>Date</th>
                        <th>Spent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions
                        .filter((tran) => tran.deal !== undefined)
                        .map((tran, index) => (
                          <tr key={index.toString()}>
                            <td>{tran.id}</td>
                            <td>{tran.deal && tran.deal.product.title}</td>
                            <td>
                              {moment(tran.createdOn).format(
                                "MM-DD-YYYY HH:mm:ss"
                              )}
                            </td>
                            <td>{tran.deal && tran.deal.dealCredits} Points</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              )}
              <br />
              <div className="row">
                <div className="col-lg-12 text-right">
                  <Pagination
                    current={currentTranPage}
                    showSizeChanger={false}
                    onChange={onTranPageChange}
                    total={tranPaging.totalCount}
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`
                    }
                  />
                </div>
              </div>
              <br />
              <Table
                pagination={{ total: redemptions.length, pageSize: 10 }}
                columns={[
                  {
                    key: "Sr",
                    title: "Sr.",
                    dataIndex: "id",
                    width: "5%",
                  },
                  {
                    title: "Credits Requested",
                    dataIndex: "credits",
                    key: "credits",
                  },
                  {
                    title: "Date",
                    dataIndex: "createdOn",
                    key: "createdOn",
                    render: (value: string) => (
                      <Typography.Text>
                        {moment(value).format("MM-DD-YYYY HH:mm:ss")}
                      </Typography.Text>
                    ),
                  },
                  {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: (_, record) => (
                      <Tag
                        color={
                          record.status === "Approved"
                            ? "green"
                            : record.status === "Rejected"
                            ? "red"
                            : "orange"
                        }
                        key={Math.random()}
                      >
                        {record.status}
                      </Tag>
                    ),
                  },
                ]}
                dataSource={redemptions}
              />
              {/* <tbody>
                      {redemptions.map((tran, index) => (
                        <tr key={index.toString()}>
                          <td>{tran.id}</td>
                          <td>{tran.credits}</td>
                          <td>
                            {moment(tran.createdOn).format(
                              "MM-DD-YYYY HH:mm:ss"
                            )}
                          </td>
                          <td>
                            {
                              <Tag
                                color={
                                  tran.status === "Approved"
                                    ? "green"
                                    : tran.status === "Rejected"
                                    ? "red"
                                    : "orange"
                                }
                                key={Math.random()}
                              >
                                {tran.status}
                              </Tag>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
