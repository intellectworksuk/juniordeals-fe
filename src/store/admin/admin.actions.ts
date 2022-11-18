import { createAsyncThunk } from "@reduxjs/toolkit";
import { onValue, ref } from "firebase/database";
import Apiconfig from "../../config/Apiconfig";
import { LOGIN } from "../../constants/routes";
import { DealStatusEnum } from "../../enums/deal.status.enum";
import {
  CreateQuizData,
  DealResponse,
  Paging,
  QuizCategoryResponse,
  QuizQuestionResponse,
  QuizResponse,
  User,
  UserStatsResponse,
} from "../../types";
import http from "../../util/http";

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (values: any, thunkAPI) => {
    try {
      let url = Apiconfig.endpoints.admin.fetchAllUsers;

      if (values.searchText && values.searchText.length > 0) {
        url += `?search=${values.searchText}`;
        if (values.pageNo && values.pageSize) {
          if (Number(values.pageNo) > 0) {
            url += `&pageNumber=${values.pageNo}`;
            url += `&pageSize=${values.pageSize}`;
          }
        }
      } else {
        if (values.pageNo && values.pageSize) {
          if (Number(values.pageNo) > 0) {
            url += `?pageNumber=${values.pageNo}`;
            url += `&pageSize=${values.pageSize}`;
          }
        }
      }

      const {
        data: { result, paging },
      } = await http.get<{ result: User[]; paging: Paging }>(url);
      return { result, paging };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchUserStats = createAsyncThunk(
  "user/fetchUserStats",
  async (_, thunkAPI) => {
    try {
      let url = Apiconfig.endpoints.admin.fetchUserStats;

      const {
        data: { result },
      } = await http.get<{ result: UserStatsResponse }>(url);
      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchAllDeals = createAsyncThunk(
  "deal/fetchAllDeals",
  async (status: number, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.admin.fetchAllDeals}?status=${status}`;

      const {
        data: { result },
      } = await http.get<{ result: DealResponse[] }>(url);

      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const sendAdminDealStatus = createAsyncThunk(
  "deal/sendAdminDealStatus",
  async (values: any, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.admin.sendAdminDealStatus}?id=${values.id}&status=${values.status}`;

      const {
        data: { result },
      } = await http.put<{ result: boolean }>(url);
      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  "user/updateUserStatus",
  async (values: any, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.admin.updateUserStatus}/${values.id}/${values.status}`;

      const {
        data: { result },
      } = await http.put<{ result: boolean }>(url);
      return { result: result, userid: values.id, status: values.status };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateUserState = createAsyncThunk(
  "user/updateUserState",
  async (values: any, thunkAPI) => {
    try {
      return { userid: values.id, status: values.status };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateUserCredits = createAsyncThunk(
  "user/updateUserCredits",
  async (values: any, thunkAPI) => {
    try {
      if (values.Operator === "minus") {
        return { userid: values.ReceiverId, credits: values.Credits * -1 };
      } else {
        return { userid: values.ReceiverId, credits: values.Credits };
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateDealStatus = createAsyncThunk(
  "user/updateDealStatus",
  async (values: any, thunkAPI) => {
    try {
      if (values.resp.meta.requestStatus === "fulfilled") {
        const statusStr = Object.entries(DealStatusEnum).find(
          (k: any) => k[1] === Number(values.resp.meta.arg.status)
        );
        return { dealId: values.deal.id, status: statusStr?.[0] };
      }
      return {};
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
