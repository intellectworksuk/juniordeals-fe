import { Form, InputNumber, Rate, Spin } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useEffectOnce from "../../hooks/useEffectOnce";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import * as DealService from "../../store/deal/deal.actions";
import {
  clearDealStateError,
  clearDealStateStatus,
} from "../../store/deal/deal.slice";
import {
  CreateDealData,
  DealConfirmationData,
  DealResponse,
  ProductResponse,
} from "../../types";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../util/notifications";
import * as routes from "../../constants/routes";
import { AnyAction, AsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";

const { Item } = Form;

interface DealReceivePageProps {
  filler?: DealResponse;
  //   onDone?: AsyncThunk<DealResponse, any, {}>;
  buyerId?: string;
}

export const DealReceivePage = (props: DealReceivePageProps) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const location = useLocation();

  const dispatch = useAppDispatch();

  //   const { product } = (location.state as any) || {};

  const { status: dealStatus } = useAppSelector((state) => state.deal);

  const onFormSubmit = (formData: DealConfirmationData) => {
    // if (props.onDone) {
    //   dispatch(props.onDone(formData));
    // } else {
    dispatch(DealService.markConfirmation(formData));
    // }
  };

  const onFinishFailed = () => {
    displayErrorMessage("Please complete all required form fields!");
    return;
  };

  //   useEffect(() => {
  //     if (error) {
  //       displayErrorMessage(error);
  //     }
  //   }, [dispatch, error]);

  //   useEffect(() => {
  //     if (status === "createDealResolved") {
  //       displaySuccessNotification("Deal has been created");
  //     }

  //     return () => {
  //       dispatch(clearDealStateStatus());
  //     };
  //   }, [dispatch, status]);

  //   useEffect(() => {
  //     if (product) {
  //       form.setFieldsValue({ ProductId: product.id });
  //       form.setFieldsValue({ BuyerId: props.buyerId });
  //     }
  //   }, [product, props.buyerId]);

  useEffectOnce(() => {
    if (props.filler) {
      form.setFieldsValue({
        Id: props.filler.id,
        // ProductId: props.filler.productId,
        // ProductQuantity: props.filler.productQuantity,
        // BuyerId: props.filler.buyerId,
        // DealCredits: props.filler.dealCredits,
        // DeliveryDate: moment(props.filler.deliveryDate),
        // Comments: props.filler.comments,
      });
    }
  });

  useScrollToTop();

  return (
    <>
      <div className="center-text">
        <div className="item-stage" style={{ float: "none", padding: "10px" }}>
          <Form
            form={form}
            onFinish={onFormSubmit}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
          >
            <br />
            <h4>Deal Receive Confirmation</h4>
            <br />
            <div className="row">
              <div className="col-lg-12">
                <Item name="Id" hidden={true}>
                  <input />
                </Item>
                <Item name="Rating" label="Rating">
                  <Rate />
                </Item>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <Item name="Comments" rules={[
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || !value.includes("script")) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Invalid input found!"
                      );
                    },
                  })
                ]}>
                  <textarea maxLength={100}
                    className="inpCtrl"
                    placeholder="Any other notes"
                  ></textarea>
                </Item>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6">
                <button
                  className="formBtnCtrl"
                  type="submit"
                  disabled={dealStatus === "markConfirmationPending"}
                >
                  <span id="button-text">
                    {dealStatus === "markConfirmationPending" ? (
                      <Spin size="small" />
                    ) : (
                      "Mark as Received"
                    )}
                  </span>
                </button>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </Form>
          <button
            hidden={true}
            className="formBtnCtrl"
            onClick={() =>
              navigate(routes.DEAL_APPROVE, {
                state: {
                  productName: "Test Product",
                  buyerName: "Fawad",
                  amount: 100000,
                  dateOfDelivery: "2022-08-01",
                  comments: "test",
                },
              })
            }
          >
            Test Deal Approve
          </button>
        </div>
      </div>
    </>
  );
};
