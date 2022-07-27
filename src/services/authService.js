import {
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
} from "../../../util/gen/proto/auth/auth_request_pb";
import { AuthProviderEnum } from "../../../util/gen/proto/commons/enum_pb";
import { AppleAuth } from "./auth-providers/AppleAuth";
import { FacebookAuth } from "./auth-providers/FacebookAuth";
import { GoogleAuth } from "./auth-providers/GoogleAuth";
import { TwitterAuth } from "./auth-providers/TwitterAuth";
import { Grpc } from "./base/Grpc";
import { grpcOptions } from "./base/Grpc.utils";

export const authService = {
  login: ({ email, password }) =>
    Grpc.snt
      .login(
        new LoginRequest().setEmail(email).setPassword(password),
        grpcOptions({ useToasts: false })
      )
      .then((res) => res.toObject()),
  register: ({ email, password, password_confirmation }) =>
    Grpc.snt
      .register(
        new RegisterRequest()
          .setEmail(email)
          .setPassword(password)
          .setPasswordConfirmation(password_confirmation),
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
    GoogleAuth.signIn()
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
    FacebookAuth.signIn()
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
    TwitterAuth.signIn()
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
    AppleAuth.signIn()
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
