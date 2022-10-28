import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserType } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { store } from "../../store";
import * as AuthService from "../../store/auth/auth.actions";
import { clearAuthError, clearAuthStatus } from "../../store/auth/auth.slice";
import { LoginData } from "../../types";
import { displayErrorMessage } from "../../util/notifications";
import * as routes from "../../constants/routes";
import { Form, Spin } from "antd";
import * as FirestoreService from "../../view/Components/ChatStore/firebase/fireStoreService";
import { useFireBase } from "../Components/ChatStore/firebase/config";
import { goOnline } from "firebase/database";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { Captcha } from "../Components/Captcha";

const { Item } = Form;

export const LoginPage = () => {
  const mounted = useRef(false);

  const { error, status, user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [captchaIsValid, setCaptchaIsValid] = useState<boolean>();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [auth, fs, db] = useFireBase();

  const onFormSubmit = ({ userName, password }: LoginData) => {
    if (captchaIsValid) {
      if (mounted.current) {
        dispatch(AuthService.logIn({ userName, password }));
      }
    } else {
      displayErrorMessage("Captcha is not valid");
    }
  };

  const onFinishFailed = () => {
    displayErrorMessage("Please complete all required form fields!");
    return;
  };

  const location = useLocation();

  const { redirectURL } = (location.state as any) || "";

  useEffect(() => {
    if (isAuthenticated) {
      if (user) {
        if (user.userType === UserType.PARENT) {
          navigate(routes.PARENT_HOME, { replace: true });
        } else if (user.userType === UserType.CHILD) {
          navigate(routes.CHILD_HOME, { replace: true });
        } else if (
          [UserType.ADMIN, UserType.SUPER_ADMIN].includes(user.userType!)
        ) {
          navigate(routes.ADMIN_HOME, { replace: true });
        }
      }

      // if (location.state) {
      //   navigate(redirectURL);
      // } else {
      //   if (user) {
      //     if (user.userType === UserType.PARENT) {
      //       navigate(routes.PARENT_HOME, { replace: true });
      //     } else if (user.userType === UserType.CHILD) {
      //       navigate(routes.CHILD_HOME, { replace: true });
      //     } else if (
      //       [UserType.ADMIN, UserType.SUPER_ADMIN].includes(user.userType!)
      //     ) {
      //       navigate(routes.ADMIN_HOME, { replace: true });
      //     }
      //   }
      // }
    }
  }, [navigate, isAuthenticated]);

  // useEffect(() => {
  //   if (error) {
  //     displayErrorMessage(error);

  //     dispatch(clearAuthError());
  //   }
  // }, [dispatch, error]);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (mounted.current) {
      if (status === "loggedIn") {
        // localStorage.setItem("user.auth", JSON.stringify(user));

        // dispatch(AuthService.loadCurrentUser());
        if (user.userType === UserType.PARENT) {
          dispatch(AuthService.fetchChildrenProfile());
        }

        // if (user.userType === UserType.SUPPLIER) {
        //   navigate(routes.SUPP_DASHBOARD);
        // } else if (user.userType === UserType.CUSTOMER) {
        //   navigate(routes.COMP_DASHBOARD);
        // }

        const manageUserPresence = async () => {
          await goOnline(db);
          await FirestoreService.manageUserPresence(
            auth,
            fs,
            db,
            user.id?.toString()!
          );
        };

        manageUserPresence();

        dispatch(clearAuthStatus());
      }
    }
  }, [dispatch, status]);

  useScrollToTop();

  return (
    <>
      <h3>
        USER ACCOUNT LOGIN
        <br />
      </h3>
      <Form
        onFinish={onFormSubmit}
        onFinishFailed={onFinishFailed}
        size="small"
        autoComplete="off"
        initialValues={{userName: '', password: ''}}
      >
        <div className="row">
          <div className="col-lg-12">
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
                maxLength={30}
                className="inpCtrl"
                type="text"
                placeholder="Enter Email ID"
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
                {
                  min: 4,
                  message: "Password must be minimum 4 characters long.",
                },
              ]}
              hasFeedback
            >
              <input
                type="password"
                className="inpCtrl"
                placeholder="Password"
              />
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3">
            <div className="col mt-3">
              <Captcha validate={(res) => setCaptchaIsValid(res)} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <button
              className="formBtnCtrl"
              disabled={status === "loggedInPending"}
            >
              <span id="button-text">
                {status === "loggedInPending" ? (
                  <Spin size="small" />
                ) : (
                  "Login Now"
                )}
              </span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Link to={routes.FORGET_PWD} className="btn btn-link">
              Forgot Password? click here to reset.
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
};
