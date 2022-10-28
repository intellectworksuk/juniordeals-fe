import { Form, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useEffectOnce from "../../../hooks/useEffectOnce";
import * as AuthService from "../../../store/auth/auth.actions";
import { ProductResponse } from "../../../types";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../../util/notifications";
import userNotOnlineImg from "../../assets/img/user-not-online.jpg";
import * as routes from "../../../constants/routes";
import {
  clearAuthError,
  clearAuthStatus,
} from "../../../store/auth/auth.slice";

const { Item } = Form;

interface SendEmailNotificationProps {
  product: ProductResponse;
  barterProduct: ProductResponse;
}

export const SendEmailNotification = (props: SendEmailNotificationProps) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const { status: authStatus } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const onFormSubmit = (formData: any) => {
    console.log(formData);

    dispatch(AuthService.sendNotification(formData));
  };

  const onFinishFailed = () => {
    displayErrorMessage("Please complete all required form fields!");
    return;
  };

  useEffectOnce(() => {
    form.setFieldsValue({
      UserId: props.product.userId,
      ProductTitle: props.product.title,
    });
  });

  return (
    <>
      <div className="text-center">
        <div className="row">
          <img src={userNotOnlineImg} alt="" style={{ width: "230px" }} />
        </div>
        <div className="row">
          <h2>Please send an email to notify about this product.</h2>
        </div>
        <div className="row">
          <Form
            form={form}
            onFinish={onFormSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
                <Item name="UserId" hidden={true}>
                  <input />
                </Item>
                <Item name="ProductTitle" hidden={true}>
                  <input />
                </Item>
                <Item
                  name="Message"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please enter details to notify user about the product",
                    },
                    ({ getFieldValue }) => ({
                      validator(_rule, value) {
                        if (!value || !value.includes("script")) {
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
                    placeholder="Special Description for the item"
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
                  disabled={authStatus === "sendNotificationPending"}
                >
                  <span id="button-text">
                    {authStatus === "sendNotificationPending" ? (
                      <Spin size="small" />
                    ) : (
                      "Notify"
                    )}
                  </span>
                </button>
              </div>
              {/* <div className="col-lg-3">
                <button
                  className="formBtnCtrl"
                  type="button"
                  onClick={() =>
                    navigate(routes.START_DEAL, {
                      state: {
                        product: props.product,
                        barterProduct: props.barterProduct,
                      },
                    })
                  }
                >
                  Start Deal
                </button>
              </div> */}
              <div className="col-lg-3"></div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
