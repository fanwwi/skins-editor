import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { LoginType, NewUser } from "../../types";
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
      id: Number(data.id),
    };
    console.log(userData);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/",
        userData
      );
      navigate("/isregistered");
      localStorage.setItem("userEmail", JSON.stringify(userData.email));
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const checkUserExists = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `http://localhost:8000/users/?email=${email}`
    );
    return response.data.length > 0;
  } catch (error) {
    return false;
  }
};

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (id: string | number) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/users}/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
