import { createSlice } from "@reduxjs/toolkit";
import { AdminState } from "../../types";
import * as AdminService from "./admin.actions";
import * as Util from "../../util/helper";

export const initialState: AdminState = Object.freeze({
  error: "",
  status: "idle",
  activeUsersCount: 0,
  inActiveUsersCount: 0,
  users: [],
  deals: [],
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = "";
    },
    clearAdminStateStatus: (state) => {
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AdminService.fetchAllUsers.pending, (state) => {
      state.status = "fetchAllUsersPending";
    });
    builder.addCase(
      AdminService.fetchAllUsers.fulfilled,
      (state, { payload }) => {
        state.status = "fetchAllUsersResolved";

        state.users = Util.fill(payload);
      }
    );
    builder.addCase(
      AdminService.fetchAllUsers.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchAllUsersResolved";
      }
    );

    builder.addCase(AdminService.fetchUserStats.pending, (state) => {
      state.status = "fetchUserStatsPending";
    });
    builder.addCase(
      AdminService.fetchUserStats.fulfilled,
      (state, { payload }) => {
        state.status = "fetchUserStatsResolved";

        state.activeUsersCount = payload.activeUsers;
        state.inActiveUsersCount = payload.inActiveUsers;
      }
    );
    builder.addCase(
      AdminService.fetchUserStats.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchUserStatsResolved";
      }
    );

    builder.addCase(AdminService.fetchAllDeals.pending, (state) => {
      state.status = "fetchAllDealsPending";

      state.error = "";
    });
    builder.addCase(
      AdminService.fetchAllDeals.fulfilled,
      (state, { payload }) => {
        state.status = "fetchAllDealsResolved";

        state.deals = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      AdminService.fetchAllDeals.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchAllDealsRejected";
      }
    );

    builder.addCase(AdminService.sendAdminDealStatus.pending, (state) => {
      state.status = "sendAdminDealStatusPending";

      state.error = "";
    });
    builder.addCase(AdminService.sendAdminDealStatus.fulfilled, (state) => {
      state.status = "sendAdminDealStatusResolved";

      state.error = "";
    });
    builder.addCase(
      AdminService.sendAdminDealStatus.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "sendAdminDealStatusRejected";
      }
    );

    builder.addCase(AdminService.updateUserStatus.pending, (state) => {
      state.status = "updateUserStatusPending";

      state.error = "";
    });
    builder.addCase(
      AdminService.updateUserStatus.fulfilled,
      (state, { payload }) => {
        state.status = "updateUserStatusResolved";

        if (payload.result) {
          let currUser = state.users.find((u) => u.id === payload.userid);

          if (currUser) {
            currUser.isActive = payload.status;
          }
        }

        state.error = "";
      }
    );
    builder.addCase(
      AdminService.updateUserStatus.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "updateUserStatusRejected";
      }
    );

    builder.addCase(
      AdminService.updateUserState.fulfilled,
      (state, { payload }) => {
        let currUser = state.users.find((u) => u.id === payload.userid);

        if (currUser) {
          currUser.isActive = payload.status;
        }
      }
    );

    builder.addCase(
      AdminService.updateUserCredits.fulfilled,
      (state, { payload }) => {
        let currUser = state.users.find((u) => u.id === payload.userid);

        if (currUser) {
          currUser.availableCredits += payload.credits;
        }
      }
    );

    builder.addCase(
      AdminService.updateDealStatus.fulfilled,
      (state, { payload }) => {
        let currDeal = state.deals.find((d) => d.id === payload.dealId);

        if (currDeal) {
          currDeal.status = payload.status!;
        }
      }
    );
  },
});

// actions from slice
export const { clearAdminError, clearAdminStateStatus } = adminSlice.actions;

// The reducer
export default adminSlice.reducer;
