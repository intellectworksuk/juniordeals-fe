import { createAsyncThunk } from "@reduxjs/toolkit";
import Apiconfig from "../../config/Apiconfig";
import { DealStatus } from "../../enums/deal.status.enum";
import {
  CreateDealData,
  CreateProductData,
  DealConfirmationData,
  DealResponse,
  ProductCategoryResponse,
  ProductResponse,
  User,
} from "../../types";
import http from "../../util/http";

export const createDeal = createAsyncThunk(
  "deal/add",
  async (values: any, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.deal.createDeal;

      let deal: CreateDealData = {};

      deal = JSON.parse(JSON.stringify(values));

      const {
        data: { result },
      } = await http.post<{ result: DealResponse }>(url, deal);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const sendParentApproval = createAsyncThunk(
  "deal/sendParentApproval",
  async (id: bigint, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.deal.parrentApproval}?id=${id}&status=2`;

      const {
        data: { result },
      } = await http.put<{ result: boolean }>(url);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const sendSellerDealApproval = createAsyncThunk(
  "deal/sendSellerDealApproval",
  async (values: any, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.deal.sellerApproval}/${values.Id}`;

      let deal: CreateDealData = {};

      deal = JSON.parse(JSON.stringify(values));

      deal.Status = 3;
      deal.DealAmountPaidBy = "Buyer";

      const {
        data: { result },
      } = await http.put<{ result: DealResponse }>(url, deal);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchUserDeals = createAsyncThunk(
  "deal/fetchUserDeals",
  async (_, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.deal.fetchUserDeals;

      const {
        data: { result },
      } = await http.get<{ result: DealResponse[] }>(url);

      // const result = [
      //   {
      //     title: "this is my test deal",
      //     status: DealStatus.PENDING,
      //     productName: "My Product",
      //     buyerName: "Some buyer",
      //     dealAmount: 100.0,
      //     deliveryDate: "2022-08-01",
      //     comments: "these are some sample comments",
      //   },
      //   {
      //     title: "this is my test deal",
      //     status: DealStatus.APPROVED,
      //     productName: "My Product",
      //     buyerName: "Some buyer",
      //     dealAmount: 100.0,
      //     deliveryDate: "2022-08-01",
      //     comments: "these are some sample comments",
      //   },
      // ];

      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserDealByID = createAsyncThunk(
  "deal/fetchUserDealByID",
  async (id: bigint, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.deal.fetchUserDeals}/${id}`;

      const {
        data: { result },
      } = await http.get<{ result: DealResponse[] }>(url);

      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchChildUserDeals = createAsyncThunk(
  "deal/fetchChildUserDeals",
  async (_, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.deal.fetchChildUserDeals;

      const {
        data: { result },
      } = await http.get<{ result: DealResponse[] }>(url);

      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const markDealAsComplete = createAsyncThunk(
  "deal/markDealAsComplete",
  async (id: bigint, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.deal.parrentApproval}?id=${id}&status=6`;

      const {
        data: { result },
      } = await http.put<{ result: boolean }>(url);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const markConfirmation = createAsyncThunk(
  "deal/markConfirmation",
  async (values: any, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.deal.markConfirmation;

      let dealConfirmation: DealConfirmationData = {};

      dealConfirmation = JSON.parse(JSON.stringify(values));

      const {
        data: { result },
      } = await http.put<{ result: boolean }>(url, values);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
