import { createSlice } from "@reduxjs/toolkit";
import * as ConfigService from "./config.actions";
import * as Util from "../../util/helper";
import { ConfigState } from "../../types";

export const initialState: ConfigState = Object.freeze({
  status: "idle",
  setups: {
    configs: [],
    categories: [],
    charges: { JDPoints: 0, Amount: 0, Currency: "" },
  },
  error: "",
});

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    clearConfigStateError: (state) => {
      state.error = "";
    },
    clearConfigStateStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ConfigService.fetchChargesSetup.pending, (state) => {
      state.status = "fetchChargesSetupPending";
      state.error = "";
    });
    builder.addCase(
      ConfigService.fetchChargesSetup.fulfilled,
      (state, { payload }) => {
        state.status = "fetchChargesSetupResolved";
        state.setups.configs = Util.fill(payload);

        if (state.setups.configs && state.setups.configs.length > 0) {
          const charge = state.setups.configs.find((c) => c.key === "Charges");

          state.setups.charges = JSON.parse(
            JSON.stringify(JSON.parse(String(charge?.value)))
          );
        }

        state.error = "";
      }
    );
    builder.addCase(
      ConfigService.fetchChargesSetup.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchChargesSetupRejected";
      }
    );

    builder.addCase(ConfigService.fetchCategories.pending, (state) => {
      state.status = "fetchCategoriesPending";
      state.error = "";
    });
    builder.addCase(
      ConfigService.fetchCategories.fulfilled,
      (state, { payload }) => {
        state.status = "fetchCategoriesResolved";
        state.setups.categories = Util.fill(payload);
        state.error = "";
      }
    );
    builder.addCase(
      ConfigService.fetchCategories.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchCategoriesRejected";
      }
    );
  },
});

// export const { clearDealStateError, clearDealStateStatus } = dealSlice.actions;

export default configSlice.reducer;
