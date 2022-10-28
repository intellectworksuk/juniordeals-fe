import { TransactionState } from "../../types";
import * as TransactionService from "./transaction.actions";
import * as Util from "../../util/helper";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: TransactionState = Object.freeze({
  status: "idle",
  transactions: [],
  error: "",
});

const transactionSlice = createSlice({
  name: "auth",
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

        state.transactions = Util.fill(payload);

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
  },
});

export const { clearTransactionStateError, clearTransactionStateStatus } =
  transactionSlice.actions;

export default transactionSlice.reducer;
