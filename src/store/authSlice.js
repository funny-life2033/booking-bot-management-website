import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../utils/config";

export const getUsers = createAsyncThunk("getUsers", async () => {
  try {
    const res = await Axios.get("/");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isConnected: false,
    error: null,
    isLoading: false,
    users: [],
  },
  reducers: {
    connect: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    connected: (state) => {
      state.isLoading = false;
      state.isConnected = true;
    },
    connectFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    disconnect: (state) => {
      state.isConnected = false;
    },
  },
});

export const { connect, connected, connectFailed, initError, disconnect } =
  userSlice.actions;
export default userSlice.reducer;
