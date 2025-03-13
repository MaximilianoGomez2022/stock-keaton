import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false, // Estado inicial del login
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginTrue: (state) => {
      state.isLogin = true;
    },
    loginFalse: (state) => {
      state.isLogin = false;
    }
  },
});

export const { loginTrue, loginFalse } = loginSlice.actions;
export default loginSlice.reducer;