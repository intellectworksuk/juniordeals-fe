import { Form, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useEffectOnce from "../../hooks/useEffectOnce";
import * as AuthService from "../../store/auth/auth.actions";
import { ProductResponse } from "../../types";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../util/notifications";
import userNotOnlineImg from "../../assets/img/user-not-online.jpg";
import * as routes from "../../constants/routes";
import { clearAuthError, clearAuthStatus } from "../../store/auth/auth.slice";

const { Item } = Form;

// interface ForgetPasswordPageProps {
//   product: ProductResponse;
//   barterProduct: ProductResponse;
// }

export const ForgetPasswordPage = (/*props: ForgetPasswordPageProps*/) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const { status: authStatus } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const onFormSubmit = (formData: any) => {
    dispatch(AuthService.forgetPassword(formData));
  };

  const onFinishFailed = () => {
    displayErrorMessage("Please complete all required form fields!");
    return;
  };

  // useEffectOnce(() => {
  //   form.setFieldsValue({
  //     UserId: props.product.userId,
  //     ProductTitle: props.product.title,
  //   });
  // });

  // useEffect(() => {
  //   if (authError) {
  //     displayErrorMessage(authError);
  //     dispatch(clearAuthError());
  //   }
  // }, [dispatch, authError]);

  // useEffect(() => {
  //   if (authStatus === "forgetPasswordResolved") {
  //     displaySuccessNotification(
  //       "Email sent, Please check your inbox for reset password link."
  //     );

  //     dispatch(clearAuthStatus());
  //   }
  // }, [dispatch, authStatus]);

  return (
    <>
      <div>
        <div className="row">
          <h2>Forget Password? Don't Worry!</h2>
          <h5>
            Just type the email address you used for signup and we will send you
            the reset link.
          </h5>
        </div>
        <br />
        <div className="row">
          <Form
            layout="vertical"
            form={form}
            onFinish={onFormSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="row">
              <div className="col-lg-12">
                <Item
                  label="Email"
                  name="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Email Id.",
                    },
                  ]}
                >
                  <input
                    maxLength={30}
                    className="inpCtrl"
                    placeholder="Your Email Id"
                  ></input>
                </Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <button
                  className="formBtnCtrl"
                  type="submit"
                  disabled={authStatus === "forgetPasswordPending"}
                >
                  <span id="button-text">
                    {authStatus === "forgetPasswordPending" ? (
                      <Spin size="small" />
                    ) : (
                      "Request Reset"
                    )}
                  </span>
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
