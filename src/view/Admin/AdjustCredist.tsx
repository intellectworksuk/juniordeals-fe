import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { TransactionData, User } from "../../types";
import moneybag_coins from "../assets/img/moneybag_coins.jpeg";
import * as AdminService from "../../store/admin/admin.actions";
import * as TransactionService from "../../store/transaction/transaction.actions";
import { TransactionControl } from "../Components";
import { Input } from "antd";
import { useSafeDispatch } from "../../hooks/useSafeDIspatch";

const { Search } = Input;

export const AdjustUserCreditPage = () => {
  const dispatch = useAppDispatch();

  const { users } = useAppSelector((state) => state.admin);

  const transferCredits = (values: TransactionData) => {
    dispatch(TransactionService.transferCredits(values)).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        dispatch(AdminService.updateUserCredits(values));
      }
    });

    // dispatch(AdminService.updateUserCredits(values))
  };

  // const initSearch = (searchText: string) => {
  //   dispatch(AdminService.fetchAllUsers(searchText));
  // };

  return (
    <>
      {users.map((usr: User) => (
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
                  <strong>{usr.fullName} wallet</strong>
                </span>
              </div>
              <TransactionControl
                user={usr}
                onSave={transferCredits}
                showOperator={true}
              ></TransactionControl>
              <h4 className="text-right">{usr.availableCredits}</h4>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
