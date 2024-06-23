import { createSlice } from "@reduxjs/toolkit";
import { AccountType, CostumesType, DetailsType } from "../../types";
import {
  accountDetails,
  getAccounts,
  getCostume,
  getOneAccount,
} from "../actions/account.action";

type StatesType = {
  error: null | string;
  loading: boolean;
  allAccounts: AccountType[] | null;
  account: AccountType | null;
  details: DetailsType | null;
  costume: [] | null;
};

const INIT_STATE: StatesType = {
  error: null,
  loading: false,
  allAccounts: null,
  account: null,
  details: null,
  costume: null,
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
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтов";
      })
      .addCase(getAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(getOneAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтa";
      })
      .addCase(getOneAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(accountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(accountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтa";
      })
      .addCase(accountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCostume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCostume.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.costume = action.payload;
      })
      .addCase(getCostume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default accountsSlice.reducer;
