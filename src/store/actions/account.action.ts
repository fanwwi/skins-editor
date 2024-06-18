import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccountChange, AccountType } from "../../types";
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

export const getOneAccount = createAsyncThunk(
  "accounts/getOneAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/accounts/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Ошибка получения пользователя");
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

export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/accounts/${id}`);
      window.location.reload();
      return id;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Ошибка удаления аккаунта!");
      }
    }
  }
);

export const updateAccount =
  (accountId: string | number, formData: any) => async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/accounts/${accountId}`,
        formData
      );
      window.location.reload();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
