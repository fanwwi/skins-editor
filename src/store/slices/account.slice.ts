import { createSlice } from "@reduxjs/toolkit";
import { AccountType } from "../../types";
import { getAccounts, getCurrentAccount } from "../actions/account.action";

type StatesType = {
  error: null | string;
  loading: boolean;
  allAccounts: AccountType[] | null;
  account: AccountType | null;
};

const INIT_STATE: StatesType = {
  error: null,
  loading: false,
  allAccounts: null,
  account: null,
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.allAccounts = action.payload;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка загрузки аккаунтов";
      })
      .addCase(getAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default accountsSlice.reducer;
