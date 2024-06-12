import { createAsyncThunk } from "@reduxjs/toolkit";
import { $axios } from "../../helpers/axios";
import { RegisterType } from "../../types";

interface RegisterPayload {
  data: RegisterType;
  navigate?: ((path: string) => void) | undefined;
}

export const Register = createAsyncThunk(
  "user/register",
  async ({ data, navigate }: RegisterPayload) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("nickname", data.nickname);
    formData.append("password", data.password);
    formData.append("password_confirm", data.passwordRepeat);
    console.log(formData);

    try {
      const response = await $axios.post("user/registration/", formData);
      navigate?.("/isregistered");
      return response
    } catch (error: any) {
      if (error.response) {
        console.log("Error response:", error.response.data);
      } else if (error.request) {
        console.log("Error request:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
    }
  }
);
