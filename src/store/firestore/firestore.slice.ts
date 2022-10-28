import { createSlice } from "@reduxjs/toolkit";
import * as FireStoreActions from "./firestore.actions";

export const initialState: {
  status: string;
  error: string;
  onlineList: { [key: string]: string };
} = Object.freeze({
  status: "idle",
  error: "",
  onlineList: {}
});

const fireStoreSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FireStoreActions.sendMessage.pending, (state) => {
      state.status = "SendMessagePending";
    });
    builder.addCase(
      FireStoreActions.sendMessage.fulfilled,
      (state, { payload }) => {
        state.status = "SendMessageResolved";
        state.error = "";
      }
    );
    builder.addCase(
      FireStoreActions.sendMessage.rejected,
      (state, { payload }) => {
        state.status = "SendMessageRejected";
        state.error = payload as string;
      }
    );

    builder.addCase(FireStoreActions.isUserOnline.pending, (state) => {
      state.status = "IsUserOnlinePending";
    });
    builder.addCase(
      FireStoreActions.isUserOnline.fulfilled,
      (state, { payload }) => {
        state.status = "IsUserOnlineResolved";
        state.onlineList = payload;
        state.error = "";
      }
    );
    builder.addCase(
      FireStoreActions.isUserOnline.rejected,
      (state, { payload }) => {
        state.status = "IsUserOnlineRejected";
        state.error = payload as string;
      }
    );
  },
});

export default fireStoreSlice.reducer;
