import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCookie, hasCookie } from "cookies-next";

const initialState: {
  user: any;
  status: string;
  error: any;
} = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginTry: (state, action: PayloadAction<any>) => {
      state.status = "loading";
    },
    loginSuccess: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    loginFailed: (state, action: PayloadAction<any>) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    logoutTry: (state) => {
      state.status = 'loading';
    },
    logoutSuccess: (state) => {
      state.status = 'succeeded';
      state.user = null;
    },
    setUserDataFromCookie: (state, action: PayloadAction<any>) => {
        state.user= action.payload;
    }
  },
});

export const {
  loginTry,
  loginSuccess,
  loginFailed,
  logoutTry,
  logoutSuccess,
  setUserDataFromCookie,
} = userSlice.actions;

export default userSlice.reducer;