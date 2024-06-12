import { createSlice } from "@reduxjs/toolkit";

type StatesType = {
  error: null | string;
  loading: boolean;
  allUsers: null | any;
};

const INIT_STATE: StatesType = {
  error: null,
  loading: false,
  allUsers: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: INIT_STATE,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("tokens");
    },
  },
});
