import { Form, Spin } from "antd";
import { useLocation } from "react-router-dom";
import { UserType } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useEffectOnce from "../../hooks/useEffectOnce";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import * as AuthService from "../../store/auth/auth.actions";
import { CreateAccountData, User } from "../../types";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../util/notifications";
import { AvatarUpload, GoogleMapEmbed } from "../Components";
import moment from "moment";
import { useEffect, useState } from "react";
import { clearAuthError, clearAuthStatus } from "../../store/auth/auth.slice";

const { Item } = Form;

export const EditProfilePage = () => {
  const [form] = Form.useForm();

  const location = useLocation();

  const { userLoc } = (location.state as any) || {};

  const { status: authStatus, error: authError } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  const onFormSubmit = (formData: CreateAccountData) => {
    dispatch(AuthService.updateAccount(formData));
  };

  const onFinishFailed = () => {
    displayErrorMessage("Please complete all required form fields!");
    return;
  };

  const imageSelectCallback = (file: any) => {
    if (file) form.setFieldsValue({ image: file.response.result });
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

  const notifyLocationChange = (location: any) => {
    setPinLocation(location);
  };

  useEffectOnce(() => {
    form.setFieldsValue({ image: userLoc.image });
    form.setFieldsValue({ fullName: userLoc.fullName });
    form.setFieldsValue({ address: userLoc.address });
    form.setFieldsValue({ phoneNumber: userLoc.phoneNumber });
  });

  // useEffect(() => {
  //   if (authError) {
  //     displayErrorMessage(authError);
  //     dispatch(clearAuthError());
  //   }
  // }, [dispatch, authError]);

  useEffect(() => {
    if (authStatus === "userUpdatedResolved") {
      displaySuccessNotification("User profile has been updated");

      if (userLoc.userType === UserType.PARENT) {
        dispatch(AuthService.loadCurrentProfile());
      } else if (userLoc.userType === UserType.CHILD) {
        dispatch(AuthService.fetchChildrenProfile());
      }

      dispatch(clearAuthStatus());
    }
  }, [dispatch, authStatus]);

  useScrollToTop();

  return (
    <>
      <h3>EDIT PROFILE</h3>
      <Form
        form={form}
        onFinish={onFormSubmit}
        onFinishFailed={onFinishFailed}
        size="small"
        autoComplete="off"
      >
        <div className="row formRow">
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
        </div>

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

        {/* {userLoc.userType === UserType.CHILD && (
          <div className="row">
            <div className="col-lg-12">
              <Item
                name="dob"
                rules={[
                  {
                    required: true,
                    message: 'Please enter what defines your date of birth!',
                  },
                ]}
              >
                <input
                  type="date"
                  className="inpCtrl"
                  max={moment().format('YYYY-MM-DD')}
                />
              </Item>
            </div>
          </div>
        )} */}

        <div className="row">
          <div className="col-lg-12">
            <Item name="address">
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

        <div className="row">
          <div className="col-lg-12">
            <button
              type="submit"
              className="formBtnCtrl"
              disabled={authStatus === "userSignedUpPending"}
            >
              <span id="button-text">
                {authStatus === "userSignedUpPending" ? (
                  <Spin size="small" />
                ) : (
                  "Update Profile"
                )}
              </span>
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};
