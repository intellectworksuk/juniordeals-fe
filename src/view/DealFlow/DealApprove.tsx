import { Form, Space, Spin } from "antd";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import styled from "styled-components";
import { DealResponse } from "../../types";
import { useLocation } from "react-router-dom";
import * as DealService from "../../store/deal/deal.actions";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../util/notifications";
import {
  clearDealStateError,
  clearDealStateStatus,
} from "../../store/deal/deal.slice";

const InputDisplayWrapper = styled.div`
  padding: 0.01em 16px;
  border-color: #2196f3 !important;
  color: #000 !important;
  background-color: #ddffff !important;
  border-left: 6px solid #ccc !important;
  display: block;
`;

export const DealApprovePage = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const deal = location.state as DealResponse;

  const { status: dealStatus, error: dealError } = useAppSelector(
    (state) => state.deal
  );

  const sendParentDealApproval = () => {
    dispatch(DealService.sendParentApproval(deal.id!));
  };

//   useEffect(() => {
//     if (dealError) {
// //      displayErrorMessage(dealError);
//       displaySuccessNotification("Record has been saved successfully");
//       dispatch(clearDealStateError());
//     }
//   }, [dispatch, dealError]);

  useEffect(() => {
    if (dealStatus === "sendParentApprovalResolved") {
      displaySuccessNotification("Deal has been approved");
      dispatch(clearDealStateStatus());
    }
  }, [dispatch, dealStatus]);

  useScrollToTop();

  return (
    <>
      <section className="sec-create-item">
        <div className="item-stage text-center">
          <h2>Approve Deal</h2>
          <br />
          <div className="row">
            <div className="col-lg-12">
              <div className="col-lg-3"></div>
              <div className="col-lg-3 text-left">
                <span>Product Name</span>
              </div>
              <div className="col-lg-3">
                <InputDisplayWrapper>
                  <p>{deal.productId}</p>
                </InputDisplayWrapper>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-lg-12">
              <div className="col-lg-3"></div>
              <div className="col-lg-3 text-left">
                <span>Buyer Name</span>
              </div>
              <div className="col-lg-3">
                <InputDisplayWrapper>
                  <p>{deal.buyerId}</p>
                </InputDisplayWrapper>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-lg-12">
              <div className="col-lg-3"></div>
              <div className="col-lg-3 text-left">
                <span>Deal Amount</span>
              </div>
              <div className="col-lg-3">
                <InputDisplayWrapper>
                  <p>{deal.dealCredits}</p>
                </InputDisplayWrapper>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-lg-12">
              <div className="col-lg-3"></div>
              <div className="col-lg-3 text-left">
                <span>Expected Delivery Date</span>
              </div>
              <div className="col-lg-3">
                <InputDisplayWrapper>
                  <p>{deal.deliveryDate}</p>
                </InputDisplayWrapper>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-lg-12">
              <div className="col-lg-3"></div>
              <div className="col-lg-3 text-left">
                <span>Comments</span>
              </div>
              <div className="col-lg-3">
                <InputDisplayWrapper>
                  <p>{deal.comments}</p>
                </InputDisplayWrapper>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <button
                className="formBtnCtrl"
                onClick={() => sendParentDealApproval()}
                disabled={dealStatus === "sendParentApprovalPending"}
              >
                <span id="button-text">
                  {dealStatus === "sendParentApprovalPending" ? (
                    <Spin size="small" />
                  ) : (
                    "Approve Deal"
                  )}
                </span>
              </button>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
      </section>
    </>
  );
};
