import { createAsyncThunk } from "@reduxjs/toolkit";
import Apiconfig from "../../config/Apiconfig";
import { CategoryResponse, ConfigResponse } from "../../types";
import http from "../../util/http";

export const fetchChargesSetup = createAsyncThunk(
  "config/fetchChargesSetup",
  async (_, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.setup.fetchChargesSetup;

      const {
        data: { result },
      } = await http.get<{ result: ConfigResponse[] }>(url);

      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "setup/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.setup.fetchCategoryList}`;
      const {
        data: { result },
      } = await http.get<{ result: CategoryResponse[] }>(url);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
