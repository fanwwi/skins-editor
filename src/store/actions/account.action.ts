import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccountType } from "../../types";
import axios from "axios";

export const createAccount = createAsyncThunk(
  "accounts/createAccount",
  async ({
    data,
    navigate,
  }: {
    data: AccountType;
    navigate: (path: string) => void;
  }) => {
    const id = localStorage.getItem("currentUser");
    const newAcc = {
      game: data.game,
      gameId: data.gameId,
      gameNickname: data.gameNickname,
      gameserver: data.gameServer,
      gameAccount: data.gameAccount,
      author: id,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:8000/accounts",
        newAcc
      );
      return data;
    } catch (error) {
      alert("Возникла ошибка при добавлении аккаунта!");
    }
  }
);

export const getAccounts = createAsyncThunk(
  "accounts/getAccounts",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/accounts");
      return response.data;
    } catch (error) {}
  }
);

export const getCurrentAccount = createAsyncThunk(
  "accounts/getCurrentAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<AccountType>(
        `http://localhost:8000/accounts/${id}`
      );
      return data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Ошибка получения аккаунта!");
      }
    }
  }
);

export const copyAccount = createAsyncThunk(
  "accounts/copyAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<AccountType>(
        `http://localhost:8000/accounts/${id}`
      );

      const response = await axios.post("http://localhost:8000/accounts", {
        ...data,
        id: undefined,
      });
      window.location.reload();
      return response.data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Ошибка копирования аккаунта!");
      }
    }
  }
);
