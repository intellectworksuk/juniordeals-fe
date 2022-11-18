import {
  ReactChild,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { store } from "../../store";
import { AccessDenied, LoginPage } from "../../view";
import * as routes from "../../constants/routes";
import { goOffline } from "firebase/database";
import { useFireBase } from "../../view/Components/ChatStore/firebase/config";
import { clearAuthStatus } from "../../store/auth/auth.slice";
import { UserType } from "../../enums";
import { clearProductState } from "../../store/product/product.slice";

export const ProtectedRoute = ({ children }: { children: any }) => {
  const mounted = useRef(false);

  const dispatch = useAppDispatch();

  const { isAuthenticated, status: authStatus } = useAppSelector(
    (state) => state.auth
  );

  const location = useLocation();

  const [auth, fs, db] = useFireBase();

  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (mounted.current) {
      if (authStatus === "loggedOut") {
        // localStorage.removeItem("user.auth");
        localStorage.removeItem("persist:auth");

        dispatch(clearProductState());

        goOffline(db);

        dispatch(clearAuthStatus());
      }
    }
  }, [dispatch, authStatus]);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to={routes.LOGIN}
      replace
      state={{ redirectURL: location.pathname }}
    />
  );
};

export const ProtectedAdminRoute = ({ children }: { children: any }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    // return <AccessDenied />;
    return <Navigate to={routes.LOGIN} />;
  }

  if (
    isAuthenticated &&
    ![UserType.SUPER_ADMIN, UserType.ADMIN].includes(Number(user.userType))
  ) {
    return <AccessDenied />;
  }

  return children ? children : <Outlet />;
};
