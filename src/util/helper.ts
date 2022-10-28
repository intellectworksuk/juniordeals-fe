import { store } from "../store";

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
    if (payload.response && payload.response.data) {
      stateError =
        payload.response.data.errors &&
        payload.response.data.errors[0] &&
        payload.response.data.errors[0].message;
    }
  }

  if (stateError === undefined) {
    var error = JSON.parse(JSON.stringify(payload));

    console.log(JSON.stringify(error));

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
