import { createSlice } from "@reduxjs/toolkit";
import {
  AccountType,
  AssessoirsType,
  CardsType,
  CostumesType,
  DetailsType,
  IconsType,
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
        state.allAccounts = action.payload;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтов";
      })
      .addCase(getAccounts.pending, (state) => {
        state.error = null;
      })
      .addCase(getOneAccount.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(getOneAccount.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтa";
      })
      .addCase(getOneAccount.pending, (state) => {
        state.error = null;
      })
      .addCase(accountDetails.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(accountDetails.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка при загрузки аккаунтa";
      })
      .addCase(getCostume.fulfilled, (state, action) => {
        state.error = null;
        state.allCostumes = action.payload;
      })
      .addCase(getCostume.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getUserCostumes.fulfilled, (state, { payload }) => {
        state.userCostumes = payload;
      })
      .addCase(getUserCostumes.rejected, (state) => {
        console.log(state.error);
      })
      .addCase(getAssessoirs.fulfilled, (state, { payload }) => {
        state.allAssessoirs = payload;
      })
      .addCase(getAssessoirs.rejected, (state) => {
        console.log(state.error);
      })
      .addCase(getUserAss.fulfilled, (state, { payload }) => {
        state.userAss = payload;
      })
      .addCase(getUserAss.rejected, (state) => {
        console.log(state.error);
      })
      .addCase(getCard.fulfilled, (state, { payload }) => {
        state.userCard = payload;
      })
      .addCase(getCard.rejected, (state) => {
        console.log(state.error);
      });
  },
});

export default accountsSlice.reducer;
