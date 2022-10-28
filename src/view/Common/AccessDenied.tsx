import React, { useEffect } from "react";
import { Result, Button } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import * as routes from "../../constants/routes";
import useEffectOnce from "../../hooks/useEffectOnce";
import { useAppDispatch } from "../../hooks/reduxHooks";
import * as AuthService from "../../store/auth/auth.actions";

export const AccessDenied = () => {
  return (
    <>
      <div className="access-denied">
        <div className="container">
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <>
                <Link to={routes.HOME}>
                  <Button type="primary">Back to Dashboard</Button>
                </Link>
                <Link to={routes.LOGIN}>
                  <Button type="primary">Signin Again</Button>
                </Link>
              </>
            }
          />
        </div>
      </div>
    </>
  );
};
