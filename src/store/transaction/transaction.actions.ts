import { createAsyncThunk } from "@reduxjs/toolkit";
import Apiconfig from "../../config/Apiconfig";
import { TransactionData, TransactionResponse } from "../../types";
import http from "../../util/http";

export const transferCredits = createAsyncThunk(
  "wallet/transferCredits",
  async (values: any, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.transaction.addTransferTransaction;

      let transaction: TransactionData = {};

      transaction = JSON.parse(JSON.stringify(values));

      if (values.Operator === "minus") {
        transaction.Credits = values.Credits * -1;
      }

      const {
        data: { result },
      } = await http.post<{ result: TransactionResponse }>(url, transaction);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchAllTransactions = createAsyncThunk(
  "wallet/fetchAllTransactions",
  async (_, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.transaction.fetchAllTransactions;

      const {
        data: { result },
      } = await http.get<{ result: TransactionResponse }>(url);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
