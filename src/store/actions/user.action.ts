import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { LoginType, NewUser, ProfileData } from "../../types";
import axios from "axios";
import { $axios } from "../../helpers/axios";


export const Register = createAsyncThunk(
  "user/register",
  async ({
    data,
    navigate,
  }: {
    data: NewUser;
    navigate: (path: string) => void;
  }) => {
    const userData = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      accounts: data.accounts,
      id: Date.now().toString(),
    };
    localStorage.setItem("currentUser", JSON.stringify(userData.id));
    console.log(userData);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/",
        userData
      );
      navigate("/isregistered");
      return response;
    } catch (error) {
      navigate("/error/register")
    }
  }
);

export const checkUserExists = async (
  id: string | number
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `http://localhost:8000/users/?email=${id}`
    );
    return response.data.length > 0;
  } catch (error) {
    return false;
  }
};

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ProfileData>(`http://localhost:8000/users/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Ошибка полуучения пользователя");
      }
    }
  }
);