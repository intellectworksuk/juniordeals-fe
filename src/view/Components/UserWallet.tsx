import { SaveOutlined } from "@ant-design/icons";
import { Form, InputNumber, Select, Skeleton, Typography } from "antd";
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

const { Paragraph, Text, Title } = Typography;

export const UserWallet = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const [inputCredits, setInputCredits] = useState<number>();

  const { user } = useAppSelector((state) => state.auth);

  const { setups } = useAppSelector((state) => state.config);
  const { transactions, status: tranStatus } = useAppSelector(
    (state) => state.transaction
  );

  const transferCredits = (values: TransactionData) => {
    dispatch(TransactionService.transferCredits(values));
    // dispatch(
    //   TransactionService.transferCredits({
    //     ReceiverId: user.id,
    //     AvailableCredits: values.AvailableCredits,
    //     Operator: values.Operator,
    //     Credit:
    //       values.Operator === "add" ? values.Credits! * -1 : values.Credits,
    //   })
    // );
  };

  useEffectOnce(() => {
    if (transactions && transactions.length == 0) {
      dispatch(ConfigService.fetchChargesSetup());

      dispatch(TransactionService.fetchAllTransactions());
    }
  });

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
            <img src={wallet_card} style={{ margin: "16px", width: "50%" }} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
            <hr />
            <div className="order-ammount">
              <div className="flex-img-text-bal">
                <img
                  className="coin-ico"
                  style={{ margin: "16px", width: "48px" }}
                  src={moneybag_coins}
                />
                <span>
                  <strong>Your Points in wallet</strong>
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
                  navigate(routes.START_PAY, {
                    state: { credits: inputCredits },
                  })
                }
                onChangeCredits={setInputCredits}
                showOperator={false}
              ></TransactionControl>
            )}
            <hr />
          </div>
        </div>
        {user.children?.map((kid: User) => (
          <div className="row" key={Math.random()}>
            <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
              <hr />
              <div className="order-ammount">
                <div className="flex-img-text-bal">
                  <img
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
              <hr />
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
            <div className="table-responsive">
              <>
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
                          <th>Received Credits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((tran, index) => (
                          <tr key={index.toString()}>
                            <td>{tran.id}</td>
                            <td>{tran.receiver.fullName}</td>
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
                                {tran.deal && tran.deal.dealCredits} Points
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
