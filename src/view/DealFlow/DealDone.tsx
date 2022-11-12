import { Badge, Form, InputNumber, Space, Spin } from "antd";
import { useEffect, useState } from "react";
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
  DealProductResponse,
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
import { NONAME } from "dns";

const { Item } = Form;

interface DealDonePageProps {
  filler?: DealResponse;
  onDone?: AsyncThunk<DealResponse, any, {}>;
  buyerId?: string;
  showAsModal?: boolean;
}

export const DealDonePage = (props: DealDonePageProps) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const location = useLocation();

  const dispatch = useAppDispatch();

  let {
    product: productFromLocation,
    barterProduct: barterProductFromLocation,
  } = (location.state as any) || {};

  const {
    status: dealStatus,
    error: dealError,
    parentDeals,
  } = useAppSelector((state) => state.deal);

  const [normalProductValue, setNormalProductValue] = useState<number>(0);
  const [barterProductValue, setBarterProductValue] = useState<number>(0);

  const [normalProduct, setNormalProduct] = useState<DealProductResponse>();
  const [barterProduct, setBarterProduct] = useState<DealProductResponse>();

  const [dealPaidBuy, setDealPaidBuy] = useState<string>("");

  const onFormSubmit = (formData: CreateDealData) => {
    if (props.onDone) {
      dispatch(props.onDone(formData));
    } else {
      dispatch(DealService.createDeal(formData));
    }
  };

  const onFinishFailed = () => {
    displayErrorMessage("Please complete all required form fields!");
    return;
  };

  useEffect(() => {
    if (!props.filler) {
      if (dealError) {
        displayErrorMessage(dealError);
        dispatch(clearDealStateError());
      }
    }
  }, [dispatch, dealError]);

  useEffect(() => {
    if (dealStatus === "createDealResolved") {
      displaySuccessNotification("Deal has been created");

      dispatch(clearDealStateStatus());

      form.resetFields();
    }
    // if (dealStatus === "createDealRejected") {
    //   displayErrorMessage(dealError);
    //   dispatch(clearDealStateStatus());
    // }
  }, [dispatch, dealStatus]);

  useEffect(() => {
    if (normalProduct) {
      form.setFieldsValue({
        ProductId: normalProduct.id,
        ProductQuantity: normalProduct.quantity,
        DealCredits: normalProduct.rate,
        DealAmountPaidBy: "Buyer",
      });
      setNormalProductValue(normalProduct.quantity);
    }

    if (barterProduct) {
      form.setFieldsValue({
        BarterProductId: barterProduct.id,
        BarterProductQuantity: barterProduct.quantity,
        DealCredits: Math.abs(barterProduct.rate - normalProduct?.rate!),
        DealAmountPaidBy: dealPaidBuy,
      });
      setBarterProductValue(barterProduct?.quantity);
    }
  }, [normalProduct, barterProduct]);

  useEffectOnce(() => {
    if (props.filler) {
      form.setFieldsValue({
        Id: props.filler.id,
        ProductId: props.filler.productId,
        ProductQuantity: props.filler.productQuantity,
        BarterProductQuantity:
          props.filler.barterProduct && props.filler.barterProductQuantity,
        BuyerId: props.filler.buyerId,
        DealCredits: props.filler.dealCredits,
        DeliveryDate: moment(props.filler.deliveryDate),
        Comments: props.filler.comments,
      });
      setNormalProduct(props.filler.product);
      setBarterProduct(props.filler.barterProduct);

      setNormalProductValue(props.filler.product.quantity);
      setBarterProductValue(props.filler.barterProduct?.quantity!);
    } else {
      setNormalProduct(productFromLocation);
      setBarterProduct(barterProductFromLocation);
    }
  });

  const updateNormalProductValue = (value: any) => {
    setNormalProductValue(value);
  };

  const updateBarterProductValue = (value: any) => {
    setBarterProductValue(value);
  };

  useEffect(() => {
    form.setFieldsValue({
      DealCredits: barterProduct
        ? Math.abs(
            barterProductValue * barterProduct.rate -
              normalProductValue * normalProduct?.rate!
          )
        : normalProductValue * normalProduct?.rate!,
    });
    if (barterProduct) {
      setDealPaidBuy(
        barterProduct.rate === normalProduct?.rate!
          ? ""
          : barterProductValue * barterProduct.rate >
            normalProductValue * normalProduct?.rate!
          ? "Seller"
          : "Buyer"
      );
    } else {
      setDealPaidBuy("Buyer");
    }
  }, [normalProductValue, barterProductValue]);

  useEffect(() => {
    form.setFieldsValue({ DealAmountPaidBy: dealPaidBuy });
  }, [dealPaidBuy]);

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
            {!props.showAsModal && (
              <>
                <h4>Create Deal</h4>
              </>
            )}
            <div className="row">
              <div className="col-lg-12">
                <Space direction="vertical">
                  <Item
                    label={`${normalProduct?.title} Quantity`}
                    name="ProductQuantity"
                    rules={[
                      {
                        required: true,
                        message: "Please enter product quantity!",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      readOnly={props.filler !== undefined}
                      style={{ width: 200 }}
                      onChange={updateNormalProductValue}
                    />
                  </Item>
                  {barterProduct && (
                    <Item
                      label={`${barterProduct.title} Quantity`}
                      name="BarterProductQuantity"
                      rules={[
                        {
                          required: true,
                          message: "Please enter barter product quantity!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        readOnly={props.filler !== undefined}
                        style={{ width: 200 }}
                        onChange={updateBarterProductValue}
                      />
                    </Item>
                  )}
                </Space>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Item name="Id" hidden={true}>
                  <input />
                </Item>
                <Item name="ProductId" hidden={true}>
                  <input />
                </Item>
                <Item name="BarterProductId" hidden={true}>
                  <input />
                </Item>
                <Item name="BuyerId" hidden={true}>
                  <input />
                </Item>
                <Item name="DealAmountPaidBy" hidden={true}>
                  <input />
                </Item>
                <Badge.Ribbon text={`${dealPaidBuy} to pay`} color="volcano">
                  <Item
                    label="Deal Points"
                    name="DealCredits"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter what defines the rate/price of the product",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      readOnly={props.filler !== undefined}
                      style={{ width: 200 }}
                    />
                  </Item>
                </Badge.Ribbon>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <Item
                  label="Delivery Date"
                  name="DeliveryDate"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your expected delivery date!",
                    },
                  ]}
                >
                  <input
                    type="date"
                    className="inpCtrl"
                    placeholder="Delivery date"
                    min={moment().format("YYYY-MM-DD")}
                  />
                </Item>
                <Item
                  name="Comments"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_rule, value) {
                        if (!value || !value.includes("<script>")) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Invalid input found!");
                      },
                    }),
                  ]}
                >
                  <textarea
                    maxLength={100}
                    className="inpCtrl"
                    placeholder="Any other notes"
                  ></textarea>
                </Item>
                <button
                  className="formBtnCtrl"
                  type="submit"
                  disabled={[
                    "createDealPending",
                    "sendSellerApprovalPending",
                  ].includes(dealStatus)}
                >
                  <span id="button-text">
                    {[
                      "createDealPending",
                      "sendSellerApprovalPending",
                    ].includes(dealStatus) ? (
                      <Spin size="small" />
                    ) : (
                      "Mark Deal"
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-lg-12">
                <button className="btn-round btn-block" type="submit">
                  Mark Deal
                </button>
              </div>
            </div> */}
          </Form>
        </div>
      </div>
    </>
  );
};
