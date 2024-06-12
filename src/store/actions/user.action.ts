import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { $axios } from "../../helpers/axios";
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
    };
    console.log(userData);

    try {
      const response = await axios.post(
        "http://localhost:8000/users/",
        userData
      );
      navigate("/isregistered");
      localStorage.setItem("email", JSON.stringify(data.email));

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const Login = createAsyncThunk(
  "users/loginUser",
  async ({
    navigate,
  }: {
    data: LoginType;
    navigate: (path: string) => void;
  }) => {
    const email = localStorage.getItem("email");
    const response = await axios.get("http://localhost:8000/users");
    const users = response.data;
    console.log(users);

    const currentUser = users.filter((user: NewUser) => user.email == email);
    console.log(currentUser);

    if (currentUser) {
      navigate("/profile");
      return currentUser;
    } else {
      alert("Пожалуйста, зарегистрируйтесь");
      return;
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const email = localStorage.getItem("email");
    const response = await axios.get("http://localhost:8000/users");
    const users = response.data;
    const currentUser = users.find((user: NewUser) => user.email === email);
    return currentUser;
  }
);
