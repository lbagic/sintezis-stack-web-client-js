// @generated by protoc-gen-es v0.1.1 with parameter "target=js+dts"
// @generated from file proto/auth/auth_response.proto (package elude.proto, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {proto3} from "@bufbuild/protobuf";
import {Auth} from "../commons/auth_pb.js";
import {User} from "../models/user_pb.js";
import {Options} from "../commons/options_pb.js";
import {SessionInfo} from "../commons/session_info_pb.js";
import {Status} from "../commons/status_pb.js";
import {Pagination} from "../commons/pagination_pb.js";
import {Title} from "../models/title_pb.js";
import {Role} from "../models/role_pb.js";
import {Permission} from "../models/permission_pb.js";

/**
 * AuthResponse is used in Authorize rpc calls. Contains user data.
 *
 * @generated from message elude.proto.AuthResponse
 */
export const AuthResponse = proto3.makeMessageType(
  "elude.proto.AuthResponse",
  () => [
    { no: 1, name: "auth", kind: "message", T: Auth },
    { no: 2, name: "user", kind: "message", T: User },
    { no: 3, name: "options", kind: "message", T: Options },
    { no: 4, name: "session_info", kind: "message", T: SessionInfo },
    { no: 5, name: "status", kind: "message", T: Status },
  ],
);

/**
 * CheckPermissionResponse is used in internal permission check rpc calls.
 *
 * @generated from message elude.proto.CheckPermissionResponse
 */
export const CheckPermissionResponse = proto3.makeMessageType(
  "elude.proto.CheckPermissionResponse",
  () => [
    { no: 1, name: "options", kind: "message", T: Options },
    { no: 2, name: "session_info", kind: "message", T: SessionInfo },
    { no: 3, name: "status", kind: "message", T: Status },
  ],
);

/**
 * AccountResponse is used in account auth rpc calls.
 *
 * @generated from message elude.proto.AccountResponse
 */
export const AccountResponse = proto3.makeMessageType(
  "elude.proto.AccountResponse",
  () => [
    { no: 1, name: "token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "user", kind: "message", T: User },
    { no: 3, name: "expires_in", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "status", kind: "message", T: Status },
    { no: 5, name: "session_info", kind: "message", T: SessionInfo },
  ],
);

/**
 * UsersResponse is used for GetUsers rpc call. Used to return all users from DB.
 *
 * @generated from message elude.proto.UsersResponse
 */
export const UsersResponse = proto3.makeMessageType(
  "elude.proto.UsersResponse",
  () => [
    { no: 1, name: "users", kind: "message", T: User, repeated: true },
    { no: 2, name: "status", kind: "message", T: Status },
    { no: 3, name: "session_info", kind: "message", T: SessionInfo },
    { no: 4, name: "pagination", kind: "message", T: Pagination },
  ],
);

/**
 * GetUserRequest is used for user rpc calls.
 *
 * @generated from message elude.proto.UserResponse
 */
export const UserResponse = proto3.makeMessageType(
  "elude.proto.UserResponse",
  () => [
    { no: 1, name: "user", kind: "message", T: User },
    { no: 2, name: "status", kind: "message", T: Status },
    { no: 3, name: "session_info", kind: "message", T: SessionInfo },
  ],
);

/**
 * AddSocialResponse is used for AddSocial rpc calls.
 *
 * @generated from message elude.proto.AddSocialResponse
 */
export const AddSocialResponse = proto3.makeMessageType(
  "elude.proto.AddSocialResponse",
  () => [
    { no: 1, name: "auth", kind: "message", T: Auth },
    { no: 2, name: "session_info", kind: "message", T: SessionInfo },
    { no: 3, name: "status", kind: "message", T: Status },
  ],
);

/**
 * TitlesResponse is used for GetTitles rpc call. Used to return all titles from DB.
 *
 * @generated from message elude.proto.TitlesResponse
 */
export const TitlesResponse = proto3.makeMessageType(
  "elude.proto.TitlesResponse",
  () => [
    { no: 1, name: "session_info", kind: "message", T: SessionInfo },
    { no: 2, name: "titles", kind: "message", T: Title, repeated: true },
    { no: 3, name: "status", kind: "message", T: Status },
  ],
);

/**
 * RoleResponse is used for role rpc calls.
 *
 * @generated from message elude.proto.RoleResponse
 */
export const RoleResponse = proto3.makeMessageType(
  "elude.proto.RoleResponse",
  () => [
    { no: 1, name: "role", kind: "message", T: Role },
    { no: 2, name: "status", kind: "message", T: Status },
    { no: 3, name: "session_info", kind: "message", T: SessionInfo },
  ],
);

/**
 * RolesResponse is used for GetRoles rpc calls. Used to return all roles from DB.
 *
 * @generated from message elude.proto.RolesResponse
 */
export const RolesResponse = proto3.makeMessageType(
  "elude.proto.RolesResponse",
  () => [
    { no: 1, name: "roles", kind: "message", T: Role, repeated: true },
    { no: 2, name: "status", kind: "message", T: Status },
    { no: 3, name: "session_info", kind: "message", T: SessionInfo },
  ],
);

/**
 * PermissionsResponse is used for GetPermissions rpc calls. Used to return all permissions from DB.
 * Every rpc method should have at least one unique permission
 *
 * @generated from message elude.proto.PermissionsResponse
 */
export const PermissionsResponse = proto3.makeMessageType(
  "elude.proto.PermissionsResponse",
  () => [
    { no: 1, name: "permissions", kind: "message", T: Permission, repeated: true },
    { no: 2, name: "status", kind: "message", T: Status },
    { no: 3, name: "session_info", kind: "message", T: SessionInfo },
  ],
);

/**
 * ValidateJwtTokenResponse is used for ValidateJwtToken rpc calls.
 *
 * @generated from message elude.proto.ValidateJwtTokenResponse
 */
export const ValidateJwtTokenResponse = proto3.makeMessageType(
  "elude.proto.ValidateJwtTokenResponse",
  () => [
    { no: 1, name: "auth", kind: "message", T: Auth },
    { no: 2, name: "valid", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "options", kind: "message", T: Options },
    { no: 4, name: "session_info", kind: "message", T: SessionInfo },
    { no: 5, name: "status", kind: "message", T: Status },
  ],
);

