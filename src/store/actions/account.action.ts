import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AccountChange,
  AccountType,
  CostumesType,
  DetailsType,
} from "../../types";
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

export const accountDetails = createAsyncThunk(
  "account/accountDetails",
  async ({ data, account }: { data: DetailsType; account: AccountType }) => {
    const formData = {
      owners: data.owners,
      seal: data.seal,
      puzzle: data.puzzle,
      crystals: data.crystals,
      unlockS: data.unlockS,
      unlockA: data.unlockA,
      author: account.id,
    };
    try {
      const { response }: any = await axios.post(
        "http://localhost:8000/details",
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAccountDetails = createAsyncThunk(
  "accounts/getAccountDetails",
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/details/${accountId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Ошибка получения деталей аккаунта");
      }
    }
  }
);

export const addUserCostume = createAsyncThunk(
  "account/addCostume",
  async ({ data, id }: { data: CostumesType; id: string }) => {
    const newData = {
      costume: data.costume,
      category: data.category,
      author: data.author,
      bigAuthor: id,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:8000/userCostumes",
        newData
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCostume = createAsyncThunk("accounts/getCostume", async () => {
  try {
    const response = await axios.get("http://localhost:8000/costumes");
    return response.data
  } catch (error) {
    console.log(error);
  }
});

export const getCostumeS = createAsyncThunk("accounts/getCostume", async () => {
  try {
    const response = await axios.get("http://localhost:8000/costume-s");
    const filteredCostumes = response.data.filter((cost: CostumesType) => cost.category === "S")
    return filteredCostumes
  } catch (error) {
    console.log(error);
  }
});

export const getCostumeSS = createAsyncThunk("accounts/getCostume", async () => {
  try {
    const response = await axios.get("http://localhost:8000/costume-ss");
    const filteredCostumes = response.data.filter((cost: CostumesType) => cost.category === "SS")
    return filteredCostumes
  } catch (error) {
    console.log(error);
  }
});

export const getCostumeA = createAsyncThunk("accounts/getCostume", async () => {
  try {
    const response = await axios.get("http://localhost:8000/costume-a");
    const filteredCostumes = response.data.filter((cost: CostumesType) => cost.category === "A")
    return filteredCostumes
  } catch (error) {
    console.log(error);
  }
});

export const deleteOneCostume = createAsyncThunk(
  "accounts/deleteAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/userCostumes/${id}`);
      window.location.reload();
      return id;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Ошибка удаления костюма!");
      }
    }
  }
);

export const getUserCostumeS = createAsyncThunk(
  "account/getUserCostumes",
  async (accountId: string) => {
    try {
      const { data } = await axios.get("http://localhost:8000/userCostumes-s");

      const filteredData = data.filter((costume: CostumesType) => {
        return costume.bigAuthor === accountId && costume.category === "S"
      });
      console.log("Отфильтрованные данные:", filteredData);
      return filteredData;
    } catch (error) {
      console.log("Ошибка при получении данных:", error);
    }
  }
);

export const getUserCostumeSS = createAsyncThunk(
  "account/getUserCostumes",
  async (accountId: string) => {
    try {
      const { data } = await axios.get("http://localhost:8000/userCostumes-ss");

      const filteredData = data.filter((costume: CostumesType) => {
        return costume.bigAuthor === accountId && costume.category === "SS";
      });
      console.log("Отфильтрованные данные:", filteredData);
      return filteredData;
    } catch (error) {
      console.log("Ошибка при получении данных:", error);
    }
  }
);

export const getUserCostumeA = createAsyncThunk(
  "account/getUserCostumes",
  async (accountId: string) => {
    try {
      const { data } = await axios.get("http://localhost:8000/userCostumes-a");

      const filteredData = data.filter((costume: CostumesType) => {
        return costume.bigAuthor === accountId && costume.category === "A";
      });
      console.log("Отфильтрованные данные:", filteredData);
      return filteredData;
    } catch (error) {
      console.log("Ошибка при получении данных:", error);
    }
  }
);
