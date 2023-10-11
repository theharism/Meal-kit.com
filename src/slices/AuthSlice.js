import AsyncStorage from "@react-native-async-storage/async-storage";
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
      async function write() {
        await AsyncStorage.removeItem("token");
      }
      write();
    },
  },
});

export const { setToken, resetToken } = AuthSlice.actions;

export default AuthSlice.reducer;
