export type RegisterType = {
  email: string;
  nickname: string;
  password: string;
  passwordRepeat: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type NewUser = {
  email: string;
  nickname: string;
  password: string;
  id: number;
};

export type ProfileData = {
  email: string;
  nickname: string;
  image: string;
};
