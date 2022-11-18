import { Elements } from "@stripe/react-stripe-js";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useEffectOnce from "../../hooks/useEffectOnce";
import getStripe from "../../util/stripe";
import { CheckoutForm } from "../Components";
import * as AuthService from "../../store/auth/auth.actions";
import { Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { displayErrorMessage } from "../../util/notifications";
import { useLocation } from "react-router-dom";
import { clearAuthError, clearAuthStatus } from "../../store/auth/auth.slice";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import * as ConfigService from "../../store/config/config.actions";

const { Text } = Typography;

export const CardPaymentPage = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const { error: authError } = useAppSelector((state) => state.auth);
  const { setups } = useAppSelector((state) => state.config);

  // const [isAuthError, setIsAuthError] = useState<boolean>(false);

  const { credits } = (location.state as any) || 0;

  // useEffect(() => {
  //   if (authError) {
  //     displayErrorMessage(authError);

  //     // setIsAuthError(authError === "");
  //   }
  // }, [dispatch, authError]);

  // useEffectOnce(() => {
  //   dispatch(AuthService.initPaymentIntent(credits));
  // navigate(routes.START_PAY, {
  //   state: { credits: inputCredits },
  // })
  //   dispatch(clearAuthError());
  // });

  useEffectOnce(() => {
    if (setups.charges.JDPoints <= 0) {
      dispatch(ConfigService.fetchChargesSetup());
    }
  });

  useScrollToTop();

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <h3>Payment</h3>
          <br />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {!authError ? (
            <Elements stripe={getStripe()}>
              <CheckoutForm credits={credits} />
            </Elements>
          ) : (
            <Tag color="red">
              Unable to generate payment token, Contact administrator.
            </Tag>
          )}
        </div>
      </div>
    </>
  );
};
