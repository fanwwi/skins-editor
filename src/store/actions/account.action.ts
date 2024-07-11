import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AccountChange,
  AccountType,
  AssessoirsType,
  CardsType,
  CostumesType,
  DetailsType,
  IconsType,
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
        "http://localhost:8001/accounts",
        newAcc
      );
      return data;
    } catch (error) {
      alert("Возникла ошибка при добавлении аккаунта!");
    }
  }
);

export const getGames = createAsyncThunk("account/getGames", async () => {
  try {
    const { data } = await axios.get("http://localhost:8001/games");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getServers = createAsyncThunk("account/getServers", async () => {
  try {
    const { data } = await axios.get("http://localhost:8001/servers");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getAccounts = createAsyncThunk(
  "accounts/getAccounts",
  async () => {
    try {
      const response = await axios.get("http://localhost:8001/accounts");
      return response.data;
    } catch (error) {}
  }
);

export const getOneAccount = createAsyncThunk(
  "accounts/getOneAccount",
  async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:8001/accounts/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const copyAccount = createAsyncThunk(
  "accounts/copyAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<AccountType>(
        `http://localhost:8001/accounts/${id}`
      );

      const response = await axios.post("http://localhost:8001/accounts", {
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
      await axios.delete(`http://localhost:8001/accounts/${id}`);
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
        `http://localhost:8001/accounts/${accountId}`,
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
        "http://localhost:8001/details",
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
        `http://localhost:8001/details/${accountId}`
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
        "http://localhost:8001/userCostumes",
        newData
      );
      window.location.reload();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCostume = createAsyncThunk("accounts/getCostume", async () => {
  try {
    const response = await axios.get("http://localhost:8001/costumes");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getAssessoirs = createAsyncThunk(
  "accounts/getAssessoirs",
  async () => {
    try {
      const response = await axios.get("http://localhost:8001/assessoirs");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addUserAss = createAsyncThunk(
  "account/addAss",
  async ({ data, id }: { data: AssessoirsType; id: string }) => {
    const newData = {
      assessoir: data.assessoir,
      character: data.character,
      bigAuthor: id,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:8001/userAssesoirs",
        newData
      );
      window.location.reload();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteOneCostume = createAsyncThunk(
  "accounts/deleteAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8001/userCostumes/${id}`);
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

export const deleteAss = createAsyncThunk(
  "accounts/deleteAss",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8001/userAssesoirs/${id}`);
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

export const getUserCostumes = createAsyncThunk(
  "account/getUserCostumes",
  async (accountId: string) => {
    try {
      const { data } = await axios.get("http://localhost:8001/userCostumes");

      const filteredData = data.filter((costume: CostumesType) => {
        return costume.bigAuthor === accountId;
      });
      console.log("Отфильтрованные данные:", filteredData);
      return filteredData;
    } catch (error) {
      console.log("Ошибка при получении данных:", error);
    }
  }
);

export const getUserAss = createAsyncThunk(
  "account/getUserAss",
  async (accountId: string) => {
    try {
      const { data } = await axios.get("http://localhost:8001/userAssesoirs");

      const filteredData = data.filter((ass: AssessoirsType) => {
        return ass.bigAuthor === accountId;
      });
      console.log("Отфильтрованные акссессуары:", filteredData);
      return filteredData;
    } catch (error) {
      console.log("Ошибка при получении данных:", error);
    }
  }
);

export const getCard = createAsyncThunk(
  "accounts/getCard",
  async (id: string) => {
    try {
      const { data } = await axios.get("http://localhost:8001/userCards", {
        responseType: "blob",
      });
      const filteredData = data.filter((card: CardsType) => card.author === id);
      return filteredData;
    } catch (error) {}
  }
);
