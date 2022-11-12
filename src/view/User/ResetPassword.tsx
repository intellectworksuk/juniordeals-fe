import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import * as AuthService from "../../store/auth/auth.actions";
import * as routes from "../../constants/routes";
import { Form, Spin } from "antd";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../util/notifications";
import useEffectOnce from "../../hooks/useEffectOnce";
import { clearAuthError, clearAuthStatus } from "../../store/auth/auth.slice";

const { Item } = Form;

export const ResetPasswordPage = () => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = searchParams.get("token")?.replaceAll(" ", "+");
    const email = searchParams.get("email");

    // if (token && email) {
    //   dispatch(AuthService.activateAccount({ token, email }));
    // }

    form.setFieldsValue({ Email: email });
    form.setFieldsValue({ Token: token });
  }, [searchParams]);

  const onFormSubmit = (formData: any) => {
    dispatch(AuthService.resetPassword(formData));
  };

  const onFinishFailed = () => {
    displayErrorMessage("Please complete all required form fields!");
    return;
  };

  // useEffect(() => {
  //   if (status === "resetPasswordRejected") {
  //     displayErrorMessage(error)

  //     clearAuthError();
  //   }
  // }, [status, error]);

  return (
    <>
      <div className="row">
        <h2>Reset Password</h2>
        {/* <h5>Just type the email address you used for signup and we will send you the reset link.</h5> */}
      </div>
      <br />
      <Form
        layout="vertical"
        form={form}
        onFinish={onFormSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row">
          <div className="col-lg-12">
            <Item name="Token" hidden={true}>
              <input></input>
            </Item>
            <Item
              label="Email"
              name="Email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <input
                maxLength={50}
                type="email"
                className="inpCtrl"
                placeholder={"Email ID"}
                autoComplete="off"
              />
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Item
              label="Password"
              name="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                // {
                //   min: 4,
                //   message: "Password must be minimum 4 characters long.",
                // },
                {
                  pattern:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                  message:
                    "Password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
                },
              ]}
              hasFeedback
            >
              <input
                type="password"
                className="inpCtrl"
                placeholder="Password"
                autoComplete="off"
              />
            </Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <Item
              label="ConfirmPassword"
              name="ConfirmPassword"
              dependencies={["Password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    if (!value || getFieldValue("Password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <input
                type="password"
                className="inpCtrl"
                placeholder="Confirm Password"
                autoComplete="off"
              />
            </Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <button
              type="submit"
              className="formBtnCtrl"
              disabled={status === "resetPasswordPending"}
            >
              <span id="button-text">
                {status === "resetPasswordPending" ? (
                  <Spin size="small" />
                ) : (
                  "Reset password"
                )}
              </span>
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};
