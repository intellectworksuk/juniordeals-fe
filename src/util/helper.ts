import { store } from "../store";
import * as AuthService from "../store/auth/auth.actions";

export const getAuthToken = () => {
  var user = store.getState().auth.user;

  let token = undefined;

  if (user) {
    // const { authToken } = JSON.parse(user);
    token = user.authToken;
  }
  return token;
};

export const parseErrorMessage = (payload: any) => {
  let stateError = undefined;
  if (payload) {
    if (payload.response) {
      if (payload.response.data) {
        stateError =
          payload.response.data.errors &&
          payload.response.data.errors[0] &&
          payload.response.data.errors[0].message;
      } else {
        // if (payload.response.status === 401) {
        //   stateError = "You have signed out from your previous session, Pls. sign in again.";
        // }
        if (payload.response.status === 403) {
          stateError = "You don't have rights to access this resource.";
        }
      }
    }
  }

  if (stateError === undefined) {
    if (payload.message) {
      stateError = payload.message;
    } else {
      stateError = JSON.stringify(payload);
    }

    console.log(stateError);

    stateError = "Error occured, Pls. contact administrator";
  }

  return stateError;
};

export const fill = (payload: any) => {
  let arr = [];
  for (let index = 0; index < payload.length; index++) {
    arr.push(payload[index]);
  }
  return arr;
};

export const getEncodedString = (...inputStr: string[]): string => {
  const joinStr: string = inputStr.join();

  return window.btoa(unescape(encodeURIComponent(joinStr)));
};
