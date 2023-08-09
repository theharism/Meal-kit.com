import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    resetToken: (state, action) => {
      state.token = null;
    },
  },
});

export const { setToken, resetToken } = AuthSlice.actions;

export default AuthSlice.reducer;
