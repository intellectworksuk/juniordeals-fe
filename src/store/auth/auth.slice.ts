import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types";
import * as AuthService from "./auth.actions";
import * as Util from "../../util/helper";

export const initialState: AuthState = Object.freeze({
  isAuthenticated: false,
  error: "",
  status: "idle",
  user: {},
  paymentId: "",
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = "";
    },
    clearAuthStatus: (state) => {
      state.status = "idle";
    },
    resetAuthState: (state) => {
      state = {
        isAuthenticated: false,
        error: "",
        status: "idle",
        user: {},
        paymentId: "",
      };
    },
  },

  extraReducers: (builder) => {
    // builder.addCase(AuthService.loadCurrentUser.pending, (state) => {
    //   state.status = 'loadCurrentUserPending'
    // })
    // builder.addCase(
    //   AuthService.loadCurrentUser.fulfilled,
    //   (state, { payload }) => {
    //     state.isAuthenticated = true

    //     state.status = 'loadCurrentUserResolved'

    //     state.user = payload

    //     // state.user.profile.id = payload.profile.id;
    //   },
    // )
    // builder.addCase(
    //   AuthService.loadCurrentUser.rejected,
    //   (state, { payload }: { payload: any }) => {
    //     // state.error = Util.parseErrorMessage(payload);

    //     state.status = 'loadCurrentUserRejected'

    //     // state.isAuthenticated = false;
    //   },
    // )

    builder.addCase(AuthService.loadCurrentProfile.pending, (state) => {
      state.status = "loadCurrentProfilePending";
    });
    builder.addCase(
      AuthService.loadCurrentProfile.fulfilled,
      (state, { payload }) => {
        state.status = "loadCurrentProfileResolved";

        state.user.availableCredits = payload.availableCredits;
        state.user.fullName = payload.fullName;
        state.user.address = payload.address;
        state.user.image = payload.image;
        state.user.phoneNumber = payload.phoneNumber;

        // state.user.profile.id = payload.profile.id;
      }
    );
    builder.addCase(
      AuthService.loadCurrentProfile.rejected,
      (state, { payload }: { payload: any }) => {
        // state.error = Util.parseErrorMessage(payload);

        state.status = "loadCurrentProfileRejected";
      }
    );

    builder.addCase(AuthService.activateAccount.pending, (state) => {
      state.status = "activateAccountPending";
    });

    builder.addCase(
      AuthService.activateAccount.fulfilled,
      (state, { payload }) => {
        state.status = "activateAccountResolved";
        // state.profile = payload;
        state.error = "";
      }
    );

    builder.addCase(
      AuthService.activateAccount.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "activateAccountRejected";
      }
    );

    builder.addCase(AuthService.createAccount.pending, (state) => {
      state.status = "userSignedUpPending";
    });
    builder.addCase(
      AuthService.createAccount.fulfilled,
      (state, { payload }) => {
        state.status = "userSignedUp";
        // state.profile = payload;
        state.error = "";
      }
    );
    builder.addCase(
      AuthService.createAccount.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "userSignedUpRejected";
      }
    );

    builder.addCase(AuthService.updateAccount.pending, (state) => {
      state.status = "userUpdatedPending";
    });
    builder.addCase(
      AuthService.updateAccount.fulfilled,
      (state, { payload }) => {
        state.status = "userUpdatedResolved";
        // state.profile = payload;
        state.error = "";
      }
    );
    builder.addCase(
      AuthService.updateAccount.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "userUpdatedRejected";
      }
    );

    builder.addCase(AuthService.logIn.pending, (state) => {
      state.status = "loggedInPending";
    });

    builder.addCase(AuthService.logIn.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      state.status = "loggedIn";

      state.user = payload;

      state.error = "";
    });

    builder.addCase(
      AuthService.logIn.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        console.log(state.error);

        state.isAuthenticated = false;
        state.status = "loggedInRejected";
      }
    );

    builder.addCase(AuthService.logOut.pending, (state) => {
      state.status = "loggedOutPending";
    });
    builder.addCase(AuthService.logOut.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.status = "loggedOut";
      state.user = {};
    });
    builder.addCase(
      AuthService.logOut.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "loggedOutRejected";
        state.user = {};
      }
    );

    builder.addCase(AuthService.sendNotification.pending, (state) => {
      state.status = "sendNotificationPending";
    });
    builder.addCase(AuthService.sendNotification.fulfilled, (state) => {
      state.status = "sendNotificationResolved";
    });
    builder.addCase(
      AuthService.sendNotification.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "sendNotificationRejected";
      }
    );

    builder.addCase(AuthService.forgetPassword.pending, (state) => {
      state.status = "forgetPasswordPending";
    });
    builder.addCase(AuthService.forgetPassword.fulfilled, (state) => {
      state.status = "forgetPasswordResolved";
    });
    builder.addCase(
      AuthService.forgetPassword.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "forgetPasswordRejected";
      }
    );

    builder.addCase(AuthService.resetPassword.pending, (state) => {
      state.status = "resetPasswordPending";
    });
    builder.addCase(AuthService.resetPassword.fulfilled, (state) => {
      state.status = "resetPasswordResolved";
    });
    builder.addCase(
      AuthService.resetPassword.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "resetPasswordRejected";
      }
    );

    builder.addCase(AuthService.fetchChildrenProfile.pending, (state) => {
      state.status = "fetchChildrenProfilePending";
    });
    builder.addCase(
      AuthService.fetchChildrenProfile.fulfilled,
      (state, { payload }) => {
        state.status = "fetchChildrenProfileResolved";

        state.user.children = Util.fill(payload);
      }
    );
    builder.addCase(
      AuthService.fetchChildrenProfile.rejected,
      (state, { payload }: { payload: any }) => {
        // state.error = Util.parseErrorMessage(payload);

        state.status = "fetchChildrenProfileRejected";
      }
    );

    builder.addCase(AuthService.initPaymentIntent.pending, (state) => {
      state.status = "initPaymentIntentPending";
    });
    builder.addCase(
      AuthService.initPaymentIntent.fulfilled,
      (state, { payload }) => {
        state.status = "initPaymentIntentResolved";
        state.paymentId = payload.clientSecret;
        state.error = "";
      }
    );
    builder.addCase(
      AuthService.initPaymentIntent.rejected,
      (state, { payload }: { payload: any }) => {
        state.status = "initPaymentIntentRejected";
        state.error = Util.parseErrorMessage(payload);
      }
    );

    builder.addCase(AuthService.confirmPaymentIntent.pending, (state) => {
      state.status = "confirmPaymentIntentPending";
    });
    builder.addCase(
      AuthService.confirmPaymentIntent.fulfilled,
      (state, { payload }) => {
        state.status = "confirmPaymentIntentResolved";
        state.error = "";
      }
    );
    builder.addCase(
      AuthService.confirmPaymentIntent.rejected,
      (state, { payload }: { payload: any }) => {
        state.status = "confirmPaymentIntentRejected";
        state.error = Util.parseErrorMessage(payload);
      }
    );

    builder.addCase(AuthService.saveContactUs.pending, (state) => {
      state.status = "saveContactUsPending";
    });
    builder.addCase(
      AuthService.saveContactUs.fulfilled,
      (state, { payload }) => {
        state.status = "saveContactUsResolved";
        state.error = "";
      }
    );
    builder.addCase(
      AuthService.saveContactUs.rejected,
      (state, { payload }: { payload: any }) => {
        state.status = "saveContactUsRejected";
        state.error = Util.parseErrorMessage(payload);
      }
    );
  },
});

// actions from slice
export const { clearAuthError, clearAuthStatus } = authSlice.actions;

// The reducer
export default authSlice.reducer;
