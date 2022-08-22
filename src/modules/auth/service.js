import {
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
} from "../../../util/gen/proto/auth/auth_request_pb";
import { AuthProviderEnum } from "../../../util/gen/proto/commons/enum_pb";
import { appleAuth } from "../../services/auth-providers/appleAuth";
import { facebookAuth } from "../../services/auth-providers/facebookAuth";
import { googleAuth } from "../../services/auth-providers/googleAuth";
import { twitterAuth } from "../../services/auth-providers/twitterAuth";
import { Grpc, grpcOptions } from "../../services/grpc";

export const authService = {
  login: ({ email, password }) =>
    Grpc.snt
      .login(
        new LoginRequest().setEmail(email).setPassword(password),
        grpcOptions({ useToasts: false })
      )
      .then((res) => res.toObject()),
  register: ({ email, password, passwordConfirmation }) =>
    Grpc.snt
      .register(
        new RegisterRequest()
          .setEmail(email)
          .setPassword(password)
          .setPasswordConfirmation(passwordConfirmation),
        grpcOptions({ useToasts: false })
      )
      .then((res) => res.toObject()),
  verifyEmail: ({ token }) =>
    Grpc.snt
      .verifyEmail(
        new VerifyEmailRequest().setToken(token),
        grpcOptions({ useToasts: false })
      )
      .then((res) => res.toObject()),
  googleLogin: () =>
    googleAuth
      .signIn()
      .then(({ credential }) =>
        Grpc.snt.login(
          new LoginRequest()
            .setToken(credential.idToken)
            .setProvider(AuthProviderEnum.GOOGLE),
          grpcOptions({ useToasts: false })
        )
      )
      .then((res) => res.toObject()),
  facebookLogin: () =>
    facebookAuth
      .signIn()
      .then(({ credential }) =>
        Grpc.snt.login(
          new LoginRequest()
            .setToken(credential.accessToken)
            .setProvider(AuthProviderEnum.FACEBOOK),
          grpcOptions({ useToasts: false })
        )
      )
      .then((res) => res.toObject()),
  twitterLogin: () =>
    twitterAuth
      .signIn()
      .then(({ credential }) =>
        Grpc.snt.login(
          new LoginRequest()
            .setToken(credential.accessToken)
            .setTokenSecret(credential.secret)
            .setProvider(AuthProviderEnum.TWITTER),
          grpcOptions({ useToasts: false })
        )
      )
      .then((res) => res.toObject()),
  appleLogin: () =>
    appleAuth
      .signIn()
      .then(({ credential }) =>
        Grpc.snt.login(
          new LoginRequest()
            .setToken(credential.idToken)
            .setProvider(AuthProviderEnum.APPLE),
          grpcOptions({ useToasts: false })
        )
      )
      .then((res) => res.toObject()),
  logout: () => Promise.resolve(),
};
