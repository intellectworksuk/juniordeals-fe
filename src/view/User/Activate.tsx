import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import * as AuthService from "../../store/auth/auth.actions";
import * as routes from "../../constants/routes";
import { displayErrorMessage } from "../../util/notifications";
import { clearAuthStatus } from "../../store/auth/auth.slice";
import activateImg from "../assets/img/account-activated.jpeg";

export const AccountActivate = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const { status, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = searchParams.get("token")?.replaceAll(" ", "+");
    const email = searchParams.get("email");

    if (token && email) {
      dispatch(AuthService.activateAccount({ token, email }));
    }
  }, [dispatch]);

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (status === "activateAccountRejected") {
      // displayErrorMessage(error);
      setErrorMessage(true);
      // dispatch(clearAuthStatus());
    }

    if (status === "activateAccountResolved") {
      // displayErrorMessage(error);
      setSuccessMessage(true);

      dispatch(clearAuthStatus());
    }
  }, [status]);

  return (
    <>
      {successMessage ? (
        <>
          <br />
          <br />
          <br />
          <img src={activateImg} />
          <br />
          <br />
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <button
                type="button"
                className="btn-round btn-block"
                onClick={() => navigate(routes.LOGIN, { replace: true })}
              >
                Sign In
              </button>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </>
      ) : (
        <>
          {errorMessage ? (
            <>
              <br />
              <br />
              <br />
              <br />
              <br />
              <h3>Error has been occured, Contact help desk.</h3>
              <br />
              <br />
              <br />
              <br />
              <br />
            </>
          ) : (
            <></>
          )}
          {errorMessage ? console.log(error) : ""}
        </>
      )}
    </>
  );
};
