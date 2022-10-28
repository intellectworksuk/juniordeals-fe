import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    if (process.env.REACT_APP_STRIPE_KEY) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    }
  }
  return stripePromise;
};

export default getStripe;
