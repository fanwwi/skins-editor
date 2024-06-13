import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../actions/user.action";
import { NewUser, ProfileData } from "../../types";

type StatesType = {
  error: null | string;
  loading: boolean;
  allUsers: null | any;
  user: null | NewUser;
  currentUser: null | ProfileData;
};

const INIT_STATE: StatesType = {
  error: null,
  loading: false,
  allUsers: null,
  user: null,
  currentUser: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: INIT_STATE,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("tokens");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
