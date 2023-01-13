import { TransactionState } from "../../types";
import * as TransactionService from "./transaction.actions";
import * as Util from "../../util/helper";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: TransactionState = Object.freeze({
  status: "idle",
  transactions: [],
  redemptions: [],
  tranPaging: {},
  redeemPaging: {},
  error: "",
});

const transactionSlice = createSlice({
  name: "trans",
  initialState,
  reducers: {
    clearTransactionStateError: (state) => {
      state.error = "";
    },
    clearTransactionStateStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(TransactionService.transferCredits.pending, (state) => {
      state.status = "transferCreditsPending";
      state.error = "";
    });
    builder.addCase(
      TransactionService.transferCredits.fulfilled,
      (state, { payload }) => {
        state.status = "transferCreditsResolved";

        state.transactions = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      TransactionService.transferCredits.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "transferCreditsRejected";
      }
    );
    
    builder.addCase(TransactionService.redeemCredits.pending, (state) => {
      state.status = "redeemCreditsPending";
      state.error = "";
    });
    builder.addCase(
      TransactionService.redeemCredits.fulfilled,
      (state, { payload }) => {
        state.status = "redeemCreditsResolved";

        // state.transactions = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      TransactionService.redeemCredits.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "redeemCreditsRejected";
      }
    );

    builder.addCase(
      TransactionService.fetchAllTransactions.pending,
      (state) => {
        state.status = "fetchAllTransactionsPending";
        state.error = "";
      }
    );
    builder.addCase(
      TransactionService.fetchAllTransactions.fulfilled,
      (state, { payload }) => {
        state.status = "fetchAllTransactionsResolved";

        state.transactions = Util.fill(payload.result);

        state.tranPaging = payload.paging;

        state.error = "";
      }
    );
    builder.addCase(
      TransactionService.fetchAllTransactions.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchAllTransactionsRejected";
      }
    );

    builder.addCase(
      TransactionService.fetchAllRedemptions.pending,
      (state) => {
        state.status = "fetchAllRedemptionsPending";
        state.error = "";
      }
    );
    builder.addCase(
      TransactionService.fetchAllRedemptions.fulfilled,
      (state, { payload }) => {
        state.status = "fetchAllRedemptionsResolved";

        state.redemptions = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      TransactionService.fetchAllRedemptions.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchAllRedemptionsRejected";
      }
    );

    builder.addCase(
      TransactionService.approveRedemption.pending,
      (state) => {
        state.status = "approveRedemptionPending";
        state.error = "";
      }
    );
    builder.addCase(
      TransactionService.approveRedemption.fulfilled,
      (state, { payload }) => {
        state.status = "approveRedemptionResolved";

        // state.redemptions = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      TransactionService.approveRedemption.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "approveRedemptionRejected";
      }
    );

    builder.addCase(
      TransactionService.rejectRedemption.pending,
      (state) => {
        state.status = "rejectRedemptionPending";
        state.error = "";
      }
    );
    builder.addCase(
      TransactionService.rejectRedemption.fulfilled,
      (state, { payload }) => {
        state.status = "rejectRedemptionResolved";

        // state.redemptions = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      TransactionService.rejectRedemption.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "rejectRedemptionRejected";
      }
    );
  },
});

export const { clearTransactionStateError, clearTransactionStateStatus } =
  transactionSlice.actions;

export default transactionSlice.reducer;
