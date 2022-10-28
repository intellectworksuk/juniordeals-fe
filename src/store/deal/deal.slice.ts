import { createSlice } from "@reduxjs/toolkit";
import { DealState } from "../../types";
import * as DealService from "./deal.actions";
import * as Util from "../../util/helper";

export const initialState: DealState = Object.freeze({
  status: "idle",
  parentDeals: [],
  childDeals: [],
  allDeals: [],
  error: "",
});

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    clearDealStateError: (state) => {
      state.error = "";
    },
    clearDealStateStatus: (state) => {
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(DealService.createDeal.pending, (state) => {
      state.status = "createDealPending";
      state.error = "";
    });
    builder.addCase(DealService.createDeal.fulfilled, (state) => {
      state.status = "createDealResolved";
      state.error = "";
    });
    builder.addCase(
      DealService.createDeal.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "createDealRejected";
      }
    );

    builder.addCase(DealService.sendParentApproval.pending, (state) => {
      state.status = "sendParentApprovalPending";
      state.error = "";
    });
    builder.addCase(DealService.sendParentApproval.fulfilled, (state) => {
      state.status = "sendParentApprovalResolved";
      state.error = "";
    });
    builder.addCase(
      DealService.sendParentApproval.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "sendParentApprovalRejected";
      }
    );

    builder.addCase(DealService.sendSellerDealApproval.pending, (state) => {
      state.status = "sendSellerApprovalPending";
      state.error = "";
    });
    builder.addCase(DealService.sendSellerDealApproval.fulfilled, (state) => {
      state.status = "sendSellerApprovalResolved";
      state.error = "";
    });
    builder.addCase(
      DealService.sendSellerDealApproval.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "sendSellerApprovalRejected";
      }
    );

    builder.addCase(DealService.markConfirmation.pending, (state) => {
      state.status = "markConfirmationPending";
      state.error = "";
    });
    builder.addCase(DealService.markConfirmation.fulfilled, (state) => {
      state.status = "markConfirmationResolved";
      state.error = "";
    });
    builder.addCase(
      DealService.markConfirmation.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "markConfirmationRejected";
      }
    );

    builder.addCase(DealService.fetchUserDeals.pending, (state) => {
      state.status = "fetchUserDealsPending";
      state.error = "";
    });
    builder.addCase(
      DealService.fetchUserDeals.fulfilled,
      (state, { payload }) => {
        state.status = "fetchUserDealsResolved";

        state.parentDeals = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      DealService.fetchUserDeals.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchUserDealsRejected";
      }
    );

    builder.addCase(DealService.fetchUserDealByID.pending, (state) => {
      state.status = "fetchUserDealByIDPending";
      state.error = "";
    });
    builder.addCase(
      DealService.fetchUserDealByID.fulfilled,
      (state, { payload }) => {
        state.status = "fetchUserDealByIDResolved";

        let deal = state.parentDeals.find(
          (d) => BigInt(d.id!) === BigInt(d.id!)
        );

        if (deal) {
          deal = JSON.parse(JSON.stringify(deal));
        }

        state.error = "";
      }
    );
    builder.addCase(
      DealService.fetchUserDealByID.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchUserDealByIDRejected";
      }
    );

    builder.addCase(DealService.fetchChildUserDeals.pending, (state) => {
      state.status = "fetchChildUserDealsPending";
      state.error = "";
    });
    builder.addCase(
      DealService.fetchChildUserDeals.fulfilled,
      (state, { payload }) => {
        state.status = "fetchChildUserDealsResolved";

        state.childDeals = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      DealService.fetchChildUserDeals.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchChildUserDealsRejected";
      }
    );
  },
});

export const { clearDealStateError, clearDealStateStatus } = dealSlice.actions;

export default dealSlice.reducer;
