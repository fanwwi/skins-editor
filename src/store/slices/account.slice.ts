import { createSlice } from "@reduxjs/toolkit";
import {
  AccountType,
  AssessoirsType,
  CardsType,
  CostumesType,
  DetailsType,
} from "../../types";
import {
  accountDetails,
  getAccounts,
  getAssessoirs,
  getCard,
  getCostume,
  getOneAccount,
  getUserAss,
  getUserCostumes,
} from "../actions/account.action";

type StatesType = {
  error: null | string;
  loading: boolean;
  allAccounts: AccountType[] | null;
  account: AccountType | null;
  details: DetailsType | null;
  allCostumes: CostumesType[] | null;
  userCostumes: CostumesType[] | null;
  allAssessoirs: AssessoirsType[] | null;
  userAss: AssessoirsType[] | null;
  userCard: CardsType | null;
};

const INIT_STATE: StatesType = {
  error: null,
  loading: false,
  allAccounts: null,
  account: null,
  details: null,
  allCostumes: null,
  userCostumes: null,
  allAssessoirs: null,
  userAss: null,
  userCard: null,
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
        state.allCostumes = action.payload;
      })
      .addCase(getCostume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserCostumes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCostumes.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.userCostumes = payload;
      })
      .addCase(getUserCostumes.rejected, (state) => {
        state.loading = false;
        console.log(state.error);
      })
      .addCase(getAssessoirs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAssessoirs.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.allAssessoirs = payload;
      })
      .addCase(getAssessoirs.rejected, (state) => {
        state.loading = false;
        console.log(state.error);
      })
      .addCase(getUserAss.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAss.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.userAss = payload;
      })
      .addCase(getUserAss.rejected, (state) => {
        state.loading = false;
        console.log(state.error);
      })
      .addCase(getCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCard.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.userCard = payload;
      })
      .addCase(getCard.rejected, (state) => {
        state.loading = false;
        console.log(state.error);
      });
  },
});

export default accountsSlice.reducer;
