import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewUser, ProfileData, RegisterType } from "../../types";
import axios from "axios";

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
      id: Date.now().toString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/users/",
        userData
      );
      localStorage.setItem("currentUser", JSON.stringify(userData.id));

      navigate("/isregistered");
      return response;
    } catch (error) {
      navigate("/error/register");
    }
  }
);

export const checkUserExistsAndPassword = async (
  email: string,
  password: string
): Promise<{ exists: boolean; passwordMatch: boolean; userId?: string }> => {
  try {
    const response = await axios.get(
      `http://localhost:8000/users/?email=${email}`
    );
    if (response.data.length > 0) {
      const user = response.data[0];
      const passwordMatch = user.password === password;
      return { exists: true, passwordMatch, userId: user.id };
    } else {
      return { exists: false, passwordMatch: false };
    }
  } catch (error) {
    console.error(error);
    return { exists: false, passwordMatch: false };
  }
};

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ProfileData>(
        `http://localhost:8000/users/${id}`
      );
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

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (
    {
      userId,
      oldPassword,
      newPassword,
    }: { userId: string; oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const { data: user } = await axios.get<RegisterType>(
        `http://localhost:8000/users/${userId}`
      );

      if (user.password !== oldPassword) {
        return rejectWithValue("Старый пароль неверен");
      }

      await axios.patch(`http://localhost:8000/users/${userId}`, {
        password: newPassword,
      });

      return { ...user, password: newPassword };
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Ошибка смены пароля");
      }
    }
  }
);
