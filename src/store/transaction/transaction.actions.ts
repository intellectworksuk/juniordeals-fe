import { createAsyncThunk } from "@reduxjs/toolkit";
import Apiconfig from "../../config/Apiconfig";
import {
  Paging,
  RedemptionResponse,
  TransactionData,
  TransactionRedeemData,
  TransactionResponse,
} from "../../types";
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

export const redeemCredits = createAsyncThunk(
  "wallet/redeemCredits",
  async (values: any, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.transaction.redeemCredits;

      let transaction: TransactionRedeemData = {};

      transaction = JSON.parse(JSON.stringify(values));

      const {
        data: { result },
      } = await http.post<{ result: RedemptionResponse }>(url, transaction);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchAllTransactions = createAsyncThunk(
  "wallet/fetchAllTransactions",
  async (values: any, thunkAPI) => {
    try {
      let url = Apiconfig.endpoints.transaction.fetchAllTransactions;

      if (values.pageNo && values.pageSize) {
        if (Number(values.pageNo) > 0) {
          url += `?pageNumber=${values.pageNo}`;
          url += `&pageSize=${values.pageSize}`;
        }
      }

      const {
        data: { result, paging },
      } = await http.get<{ result: TransactionResponse; paging: Paging }>(url);
      return { result, paging };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchAllRedemptions = createAsyncThunk(
  "wallet/fetchAllRedemptions",
  async (_, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.transaction.fetchAllRedemptions;

      const {
        data: { result },
      } = await http.get<{ result: RedemptionResponse }>(url);

      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const approveRedemption = createAsyncThunk(
  "wallet/approveRedemption",
  async (id: bigint, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.transaction.approveRedemption}/${id}`;

      const {
        data: { result },
      } = await http.put<{ result: RedemptionResponse }>(url);

      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const rejectRedemption = createAsyncThunk(
  "wallet/rejectRedemption",
  async (values: any, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.transaction.rejectRedemption}/${values.recordId}`;

      const {
        data: { result },
      } = await http.put<{ result: RedemptionResponse }>(url, {
        Comments: values.reason,
      });

      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
