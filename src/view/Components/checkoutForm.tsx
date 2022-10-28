import React, { useState, useEffect, FormEvent } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { Form, Spin } from "antd";
import useEffectOnce from "../../hooks/useEffectOnce";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import * as AuthService from "../../store/auth/auth.actions";
import { displayErrorMessage } from "../../util/notifications";
import { Navigate, useNavigate } from "react-router-dom";
import * as routes from "../../constants/routes";
import { store } from "../../store";

var elementStyles = {
  style: {
    base: {
      color: "#fff",
      fontWeight: 600,
      fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",

      ":focus": {
        color: "#424770",
      },

      "::placeholder": {
        color: "#9BACC8",
      },

      ":focus::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "#fff",
      ":focus": {
        color: "#FA755A",
      },
      "::placeholder": {
        color: "#FFCCA5",
      },
    },
  },
};

var elementClasses = {
  focus: "focus",
  empty: "empty",
  invalid: "invalid",
};

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      fontFamily: "Arial, sans-serif",
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

interface CheckoutFormProps {
  credits: number;
}

export const CheckoutForm = (props: CheckoutFormProps) => {
  const dispatch = useAppDispatch();
  const {
    status: authStatus,
    error: authError,
    user,
    paymentId,
  } = useAppSelector((state) => state.auth);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  //   useEffect(() => {
  // Create PaymentIntent as soon as the page loads
  //     window
  //       .fetch("/create-payment-intent", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         // body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //       })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setClientSecret(data.clientSecret);
  //       });
  //   }, []);

  // useEffectOnce(() => {
  //   dispatch(AuthService.initPaymentIntent());
  // });

  useEffect(() => {
    if (authStatus === "initPaymentIntentResolved") {
      setClientSecret(paymentId!);
    }
    if (authStatus === "confirmPaymentIntentResolved") {
      // navigate(routes.LOGIN);
      dispatch(AuthService.loadCurrentProfile());
    }
    if (authError && authError.length > 0) {
      displayErrorMessage(authError);
    }
  }, [authStatus, authError]);

  const handleChange = async (event: any) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setProcessing(true);

    try {
      const payload = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement) || { token: "" },
        },
      });

      if (payload?.error) {
        displayErrorMessage(`Payment failed ${payload.error.message}`);

        setError(`Payment failed ${payload.error.message}`);

        setProcessing(false);
      } else {
        dispatch(
          AuthService.confirmPaymentIntent({
            Id: payload?.paymentIntent.id,
            Credits: props.credits,
            UserId: user.id,
          })
        );

        setError("");

        setProcessing(false);

        setSucceeded(true);
      }
    } catch (err) {
      displayErrorMessage(`Payment failed`);

      setError(`Payment failed`);

      setProcessing(false);
    }
  };

  return (
    // <Form id="payment-form" onFinish={handleSubmit}>
    <>
      <div className="form-group">
        <label htmlFor="card-element">Credit or debit card</label>
        <div
          id="card-element"
          className="form-control"
          style={{ height: "2.4em", paddingTop: ".7em" }}
        >
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
        </div>
        {/* <label htmlFor="card-element">Card Expiry</label>
        <div
          id="card-element"
          className="form-control"
          style={{ height: "2.4em", paddingTop: ".7em" }}
        >
          <CardExpiryElement />
        </div>
        <label htmlFor="card-element">Card Cvc</label>
        <div
          id="card-element"
          className="form-control"
          style={{ height: "2.4em", paddingTop: ".7em" }}
        >
          <CardCvcElement />
        </div> */}
      </div>
      {/* <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      /> */}
      {/* <div className="row">
        <div className="col-lg-6"></div>
        <div className="col-lg-6">
          <CardNumberElement  />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6"></div>
        <div className="col-lg-6">
          <CardExpiryElement  />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6"></div>
        <div className="col-lg-6">
          <CardCvcElement  />
        </div>
      </div> */}
      <br />
      <div className="row">
        <div className="col-lg-12">
          <button
            className="formBtnCtrl"
            disabled={processing || disabled || succeeded}
            id="submit"
            onClick={handleSubmit}
          >
            <span id="button-text">
              {processing ? <Spin size="small" /> : "Pay now"}
            </span>
          </button>
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded.
          </p>
        </div>
      </div>
    </>
  );
};
