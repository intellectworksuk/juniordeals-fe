import { store } from "../store";
import Axios from "axios";
import Apiconfig from "../config/Apiconfig";
// import * as status from "../constants/http-status";
import * as AuthService from "../store/auth/auth.actions";
import { displayErrorMessage } from "./notifications";

const http = Axios.create({
  baseURL: Apiconfig.baseURI,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * intercepts any response and checks the response from our api for a 401 status in the response. ie. the token has now expired and is no longer valid, or no valid token was sent.
If such a status exists then we log out the user and clear the profile from redux state.
 */
http.interceptors.response.use(
  (res: any) => res,
  (err: { response: { data: { status: string }; status: string } }) => {
    if (
      Number(err.response.data.status) === 401 ||
      Number(err.response.status) === 401
    ) {
      store.dispatch(AuthService.logOut());
    }

    return Promise.reject(err);
  }
);

http.interceptors.request.use(
  (config) => {
    const excludedPaths = ["login"];
    const excludedFields = [
      "specification",
      "userName",
      "password",
      "Password",
      "email",
      "Email",
      "confirm",
      "address",
      "longitude",
      "latitude",
      "productImages",
      "images",
      "image",
      "Image",
      "token",
      "Token",
      "StripeTransactionId",
      "ConfirmPassword",
      "InputQuizQuestions",
      "QuizQuestions",
    ];

    // const { token } = useToken();
    // const specialChars = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;`
    const specialChars = `/[!@#$%^&*()_=\[\]{};':"\\|<>\/?]/;`;

    if (!excludedPaths.some((path) => config.url?.includes(path))) {
      if (config.data) {
        let isSpecialCharsPresent = false;
        Object.entries(config.data).forEach(([k, v]) => {
          if (!excludedFields.some((field) => String(k) === field)) {
            isSpecialCharsPresent = specialChars
              .split("")
              .some((char) => String(v).includes(char));
            if (isSpecialCharsPresent) {
              throw new Axios.Cancel(
                "Request rejected due to illegal characters."
              );
            }
          }
        });
      }
    }

    if (config.headers === undefined) {
      config.headers = {};
    } else {
      var user = store.getState().auth.user;

      if (user && user.authToken) {
        // const { authToken } = JSON.parse(user!);

        config.headers["Authorization"] = `Bearer ${user.authToken}`;
      }
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

// Axios.interceptors.response.use(null, (error) => {
//   const { response } = error;
//   if (!response) {
//       // network error
//       console.error(error);
//       return;
//   }

//   if ([401, 403].includes(response.status) && accountService.accountValue) {
//       // auto logout if 401 or 403 response returned from api
//       accountService.logout();
//   }

//   const errorMessage = response.data?.message || response.statusText;
//   console.error('ERROR:', errorMessage);
// });

export default http;
