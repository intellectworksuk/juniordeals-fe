import { Form, Space, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import * as AuthService from "../../store/auth/auth.actions";
import { clearAuthError, clearAuthStatus } from "../../store/auth/auth.slice";
import { CreateAccountData } from "../../types";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../util/notifications";
import { AvatarUpload, GoogleLocationInput, GoogleMapEmbed } from "../../view";
import * as routes from "../../constants/routes";
import { SingleUpload } from "../Components/SingleFileUpload";
import signin_right from "../assets/img/parent-signin-right.webp";
import useEffectOnce from "../../hooks/useEffectOnce";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import moment from "moment";

const { Item } = Form;

interface SignUpPageProps {
  signupType: UserType;
}

export const SignUpPage = (props: SignUpPageProps) => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const onFormSubmit = (formData: CreateAccountData) => {
    dispatch(AuthService.createAccount(formData));
  };

  const onFinishFailed = () => {
    displayErrorMessage("Please complete all required form fields!");
    return;
  };

  // useEffect(() => {
  //   if (error) {
  //     displayErrorMessage(error);
  //     dispatch(clearAuthError());
  //   }
  // }, [dispatch, error]);

  // useEffect(() => {
  //   if (status === "userSignedUp") {
  //     displaySuccessNotification(
  //       "Account has been created, Please check your email for the activation."
  //     );

  //     navigate(routes.LOGIN);

  //     dispatch(clearAuthStatus());
  //   }
  // }, [dispatch, status]);

  useEffect(() => {
    if (props.signupType === UserType.CHILD) {
      form.setFieldsValue({ userType: UserType.CHILD });
    } else if (props.signupType === UserType.PARENT) {
      form.setFieldsValue({ userType: UserType.PARENT });
    }
    form.setFieldsValue({ salutation: "Dear" });
  }, []);

  const notifyLocationChange = (location: any) => {
    setPinLocation(location);
  };

  const [{ lat, lng, pinpoint }, setPinLocation] = useState<any>({
    lat: "",
    lng: "",
    pinpoint: "",
  });

  useEffect(() => {
    form.setFieldsValue({ address: pinpoint });
    form.setFieldsValue({ longitude: lng });
    form.setFieldsValue({ latitude: lat });
  }, [pinpoint]);

  const imageSelectCallback = (file: any) => {
    if (file) form.setFieldsValue({ image: file.response.result });
  };

  useScrollToTop();

  return (
    <>
      <h3>
        {props.signupType === UserType.PARENT
          ? "PARENT'S SIGN UP FORM"
          : "CHILD'S SIGN UP FORM"}
        <br />
      </h3>
      <Form
        form={form}
        onFinish={onFormSubmit}
        onFinishFailed={onFinishFailed}
        size="small"
        autoComplete="off"
        initialValues={{
          salutation: "Dear",
          fullName: "",
          dob: "",
          userType: "",
          userName: "",
          password: "",
          confirm: "",
          address: "",
          phoneNumber: "",
          hearAboutUs: "0",
          longitude: "0",
          latitude: "0",
        }}
      >
        {/* <div className="row formRow">
          <div className="col-lg-3"></div>
          <div className="col-lg-6" style={{ textAlign: "center" }}>
            <Item name="image" hidden={true}>
              <input />
            </Item>
            <AvatarUpload
              type="user"
              buttonSize={150}
              userImageType="parent"
              onImageSelect={imageSelectCallback}
            />
          </div>
          <div className="col-lg-3"></div>
        </div> */}

        {/* <div className="row">
          <div className="col-lg-12"> */}
        <Item name="salutation" hidden={true}>
          <select className="inpCtrl">
            <option value="0">Salutations</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mr.">Mr.</option>
            <option value="Dear">Dear</option>
            <option value="Sir">Sir</option>
          </select>
        </Item>
        {/* </div>
        </div> */}
        <div className="row">
          <div className="col-lg-12">
            <Item
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please enter what defines your Full name!",
                },
              ]}
            >
              <input
                maxLength={30}
                type="text"
                className="inpCtrl"
                placeholder="Full Name"
                autoComplete="off"
              />
            </Item>
          </div>
        </div>

        {props.signupType === UserType.CHILD && (
          <div className="row">
            <div className="col-lg-12">
              <Item
                name="dob"
                rules={[
                  {
                    required: true,
                    message: "Please enter what defines your date of birth!",
                  },
                ]}
              >
                <input
                  type="date"
                  className="inpCtrl"
                  max={moment().format("YYYY-MM-DD")}
                />
              </Item>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-lg-12">
            <Item name="userType" hidden={true}>
              <input></input>
            </Item>
            <Item
              name="userName"
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
                placeholder={
                  props.signupType === UserType.PARENT
                    ? "Parent's Email ID"
                    : "Child's Email ID"
                }
                autoComplete="off"
              />
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Item
              name="password"
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
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    if (!value || getFieldValue("password") === value) {
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
            <Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address",
                },
              ]}
            >
              <input readOnly className="inpCtrl" placeholder="Address"></input>
            </Item>
            <GoogleMapEmbed onLocationChange={notifyLocationChange} />
            <Item name="longitude" hidden={true}>
              <input></input>
            </Item>
            <Item name="latitude" hidden={true}>
              <input></input>
            </Item>
            {/* <Map location={location} zoomLevel={17} />  */}
          </div>
        </div>

        <div className="row formRow">
          <div className="col-lg-12">
            <Item
              name="phoneNumber"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please enter what defines your Phone number!",
                },
              ]}
            >
              <input
                maxLength={15}
                className="inpCtrl"
                placeholder="Phone Number"
                autoComplete="off"
              />
            </Item>
          </div>
        </div>

        {/* {props.signupType === UserType.CHILD && (
          <div className="row formRow">
            <div className="col-lg-12">
              <Item
                name="parentApprovalRequired"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please allow if children require approval",
                  },
                ]}
              >
                <Space>
                  <input
                    type="checkbox"
                    className="inpCtrl"
                    placeholder="Phone Number"
                  />
                  Take my approval before making any deal or selling any product
                </Space>
              </Item>
            </div>
          </div>
        )} */}

        <div className="row">
          <div className="col-lg-12">
            <Item name="hearAboutUs">
              <select className="inpCtrl">
                <option value="0">How did you hear about us?</option>
                <option value="1">Through a Friend</option>
                <option value="2">Through a Website</option>
              </select>
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <button
              type="submit"
              className="formBtnCtrl"
              disabled={status === "userSignedUpPending"}
            >
              <span id="button-text">
                {status === "userSignedUpPending" ? (
                  <Spin size="small" />
                ) : (
                  "Register"
                )}
              </span>
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};
