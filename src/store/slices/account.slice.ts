import { createSlice } from "@reduxjs/toolkit";
import {
  AccountType,
  CharactersType,
  CostumesType,
  DetailsType,
} from "../../types";
import {
  accountDetails,
  getAccounts,
  getOneAccount,
  getUserCostumeS,
  getUserCostumeSS,
  getUserCostumeA,
  getCostumeS,
  getCostumeSS,
  getCostumeA,
  getCostume,
} from "../actions/account.action";

type StatesType = {
  error: null | string;
  loading: boolean;
  allAccounts: AccountType[] | null;
  account: AccountType | null;
  details: DetailsType | null;
  userCostumeS: CostumesType[] | null;
  userCostumeSS: CostumesType[] | null;
  userCostumeA: CostumesType[] | null;
  costumeS: CostumesType[] | null;
  costumeSS: CostumesType[] | null;
  costumeA: CostumesType[] | null;
  allCostumes: CostumesType[] | null;
};

const INIT_STATE: StatesType = {
  error: null,
  loading: false,
  allAccounts: null,
  account: null,
  details: null,
  userCostumeS: null,
  userCostumeSS: null,
  userCostumeA: null,
  costumeS: null,
  costumeSS: null,
  costumeA: null,
  allCostumes: null,
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
      .addCase(getCostumeS.fulfilled, (state, action) => {
        state.loading = false;
        state.costumeS = action.payload;
      })
      .addCase(getCostumeS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтa";
      })
      .addCase(getCostumeS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCostumeSS.fulfilled, (state, action) => {
        state.loading = false;
        state.costumeSS = action.payload;
      })
      .addCase(getCostumeSS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтa";
      })
      .addCase(getCostumeSS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCostumeA.fulfilled, (state, action) => {
        state.loading = false;
        state.costumeA = action.payload;
      })
      .addCase(getCostumeA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтa";
      })
      .addCase(getCostumeA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCostumeA.fulfilled, (state, action) => {
        state.loading = false;
        state.userCostumeA = action.payload;
      })
      .addCase(getUserCostumeA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтa";
      })
      .addCase(getUserCostumeA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCostumeSS.fulfilled, (state, action) => {
        state.loading = false;
        state.userCostumeSS = action.payload;
      })
      .addCase(getUserCostumeSS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтa";
      })
      .addCase(getUserCostumeSS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCostumeS.fulfilled, (state, action) => {
        state.loading = false;
        state.userCostumeS = action.payload;
      })
      .addCase(getUserCostumeS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтa";
      })
      .addCase(getUserCostumeS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCostume.fulfilled, (state, action) => {
        state.loading = false;
        state.allCostumes = action.payload;
      })
      .addCase(getCostume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтa";
      })
      .addCase(getCostume.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default accountsSlice.reducer;
