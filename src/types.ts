export type RegisterType = {
  email: string;
  nickname: string;
  password: string;
  passwordRepeat: string;
  accounts: [];
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
  accounts: [];
};

export type ProfileData = {
  email: string;
  nickname: string;
  image: string;
  id: string;
  accounts: [];
};

export type AccountType = {
  game: string;
  gameId: string;
  gameNickname: string;
  gameServer: string;
  gameAccount: string;
  author: string;
  id: string;
};

export type AccountChange = {
  game: string;
  gameId: string;
  gameNickname: string;
  gameAccount: string;
};
