export type LoginValues = {
  usernames: string;
  password: string;
};
export type RegisterValues = {
  username: string;
  password: string;
  email: string;
};

export type AxiosError = Error & {
  response: {
    data: {
      message: string;
    };
  };
};
