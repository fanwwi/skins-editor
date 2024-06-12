import axios from "axios";

export const $axios = axios.create();

$axios.interceptors.request.use(async (config) => {
  config.baseURL =
    "https://stoplight.io/mocks/inventory-card/account-skins-card/3478289/";
  const tokens = JSON.parse(localStorage.getItem("tokens") as string);
  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

$axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = JSON.parse(localStorage.getItem("tokens") as string);
      if (tokens) {
        try {
          const { data } = await $axios.post("/account/token/refresh/", {
            refresh: tokens.refresh,
          });

          localStorage.setItem(
            "tokens",
            JSON.stringify({ ...tokens, access: data.access })
          );
          return $axios.request(originalRequest);
        } catch (error) {
          console.log("hello", error);
        }
      }
    }
  }
);
