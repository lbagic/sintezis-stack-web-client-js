// @generated by protoc-gen-connect-web v0.2.1 with parameter "target=js+dts"
// @generated from file services/auth_service.proto (package elude.proto, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {AddSocialRequest, AuthRequest, ChangePasswordRequest, CheckAdditionalPermissionRequest, CheckPermissionRequest, CreateRoleRequest, CreateUserRequest, DeleteRoleRequest, DeleteUserRequest, GetPermissionsRequest, GetRoleRequest, GetRolesRequest, GetTitlesRequest, GetUserRequest, GetUsersRequest, LoginRequest, PasswordRecoverRequest, PasswordResetRequest, RegisterRequest, ResendConfirmationEmailRequest, UpdateRoleRequest, UpdateUserRequest, ValidateJwtTokenRequest, VerifyEmailRequest, VerifyRecoveryTokenRequest} from "../proto/auth/auth_request_pb.js";
import {AccountResponse, AddSocialResponse, AuthResponse, CheckPermissionResponse, PermissionsResponse, RoleResponse, RolesResponse, TitlesResponse, UserResponse, UsersResponse, ValidateJwtTokenResponse} from "../proto/auth/auth_response_pb.js";
import {MethodKind} from "@bufbuild/protobuf";
import {SendEmailsResponse} from "../proto/booking/booking_response_pb.js";

/**
 * @generated from service elude.proto.AuthController
 */
export declare const AuthController: {
  readonly typeName: "elude.proto.AuthController",
  readonly methods: {
    /**
     * @generated from rpc elude.proto.AuthController.Authorize
     */
    readonly authorize: {
      readonly name: "Authorize",
      readonly I: typeof AuthRequest,
      readonly O: typeof AuthResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.CheckPermission
     */
    readonly checkPermission: {
      readonly name: "CheckPermission",
      readonly I: typeof CheckPermissionRequest,
      readonly O: typeof CheckPermissionResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.CheckAdditionalPermission
     */
    readonly checkAdditionalPermission: {
      readonly name: "CheckAdditionalPermission",
      readonly I: typeof CheckAdditionalPermissionRequest,
      readonly O: typeof CheckPermissionResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.Register
     */
    readonly register: {
      readonly name: "Register",
      readonly I: typeof RegisterRequest,
      readonly O: typeof AccountResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.Login
     */
    readonly login: {
      readonly name: "Login",
      readonly I: typeof LoginRequest,
      readonly O: typeof AccountResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.VerifyEmail
     */
    readonly verifyEmail: {
      readonly name: "VerifyEmail",
      readonly I: typeof VerifyEmailRequest,
      readonly O: typeof AccountResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.PasswordRecover
     */
    readonly passwordRecover: {
      readonly name: "PasswordRecover",
      readonly I: typeof PasswordRecoverRequest,
      readonly O: typeof AccountResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.PasswordReset
     */
    readonly passwordReset: {
      readonly name: "PasswordReset",
      readonly I: typeof PasswordResetRequest,
      readonly O: typeof AccountResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.VerifyRecoveryToken
     */
    readonly verifyRecoveryToken: {
      readonly name: "VerifyRecoveryToken",
      readonly I: typeof VerifyRecoveryTokenRequest,
      readonly O: typeof AccountResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.GetUsers
     */
    readonly getUsers: {
      readonly name: "GetUsers",
      readonly I: typeof GetUsersRequest,
      readonly O: typeof UsersResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.GetUser
     */
    readonly getUser: {
      readonly name: "GetUser",
      readonly I: typeof GetUserRequest,
      readonly O: typeof UserResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.CreateUser
     */
    readonly createUser: {
      readonly name: "CreateUser",
      readonly I: typeof CreateUserRequest,
      readonly O: typeof UserResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.UpdateUser
     */
    readonly updateUser: {
      readonly name: "UpdateUser",
      readonly I: typeof UpdateUserRequest,
      readonly O: typeof UserResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.DeleteUser
     */
    readonly deleteUser: {
      readonly name: "DeleteUser",
      readonly I: typeof DeleteUserRequest,
      readonly O: typeof UserResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.ChangePassword
     */
    readonly changePassword: {
      readonly name: "ChangePassword",
      readonly I: typeof ChangePasswordRequest,
      readonly O: typeof AccountResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.AddSocial
     */
    readonly addSocial: {
      readonly name: "AddSocial",
      readonly I: typeof AddSocialRequest,
      readonly O: typeof AddSocialResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.GetTitles
     */
    readonly getTitles: {
      readonly name: "GetTitles",
      readonly I: typeof GetTitlesRequest,
      readonly O: typeof TitlesResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.GetRoles
     */
    readonly getRoles: {
      readonly name: "GetRoles",
      readonly I: typeof GetRolesRequest,
      readonly O: typeof RolesResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.GetRole
     */
    readonly getRole: {
      readonly name: "GetRole",
      readonly I: typeof GetRoleRequest,
      readonly O: typeof RoleResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.CreateRole
     */
    readonly createRole: {
      readonly name: "CreateRole",
      readonly I: typeof CreateRoleRequest,
      readonly O: typeof RoleResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.UpdateRole
     */
    readonly updateRole: {
      readonly name: "UpdateRole",
      readonly I: typeof UpdateRoleRequest,
      readonly O: typeof RoleResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.DeleteRole
     */
    readonly deleteRole: {
      readonly name: "DeleteRole",
      readonly I: typeof DeleteRoleRequest,
      readonly O: typeof RoleResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.GetPermissions
     */
    readonly getPermissions: {
      readonly name: "GetPermissions",
      readonly I: typeof GetPermissionsRequest,
      readonly O: typeof PermissionsResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.ValidateJwtToken
     */
    readonly validateJwtToken: {
      readonly name: "ValidateJwtToken",
      readonly I: typeof ValidateJwtTokenRequest,
      readonly O: typeof ValidateJwtTokenResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.AuthController.ResendConfirmationEmail
     */
    readonly resendConfirmationEmail: {
      readonly name: "ResendConfirmationEmail",
      readonly I: typeof ResendConfirmationEmailRequest,
      readonly O: typeof SendEmailsResponse,
      readonly kind: MethodKind.Unary,
    },
  }
};

