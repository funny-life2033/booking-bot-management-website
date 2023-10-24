import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
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
