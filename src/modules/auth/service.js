import { Api } from "../../services/calls/Api";

export const authService = {
  loginByCredentials: ({ email, password }) =>
    Api.snt.post("/auth/login/by_credentials", { email, password }),
  registerByCredentials: ({ email, password, firstName, lastName }) =>
    Api.snt.post("/auth/register/by_credentials", {
      email,
      password,
      firstName,
      lastName,
    }),
};
