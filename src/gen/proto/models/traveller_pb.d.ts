// @generated by protoc-gen-es v0.1.1 with parameter "target=js+dts"
// @generated from file proto/models/traveller.proto (package elude.proto, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import type {Title} from "./title_pb.js";
import type {User} from "./user_pb.js";

/**
 * Traveler message is returned for Traveller rpc calls and as a part of multiple other messages. Contains all the info about
 * a specific traveller.
 *
 * @generated from message elude.proto.Traveller
 */
export declare class Traveller extends Message<Traveller> {
  /**
   * Traveller id.
   *
   * @generated from field: int32 id = 1;
   */
  id: number;

  /**
   * Traveller first name.
   *
   * @generated from field: string first_name = 2;
   */
  firstName: string;

  /**
   * Traveller last name.
   *
   * @generated from field: string last_name = 3;
   */
  lastName: string;

  /**
   * Traveller date of birth.
   *
   * @generated from field: string date_of_birth = 4;
   */
  dateOfBirth: string;

  /**
   * Traveller email.
   *
   * @generated from field: string email = 6;
   */
  email: string;

  /**
   * Traveller user id.
   *
   * @generated from field: int32 user_id = 7;
   */
  userId: number;

  /**
   * Traveller title id.
   *
   * @generated from field: int32 title_id = 8;
   */
  titleId: number;

  /**
   * Traveller title data.
   *
   * @generated from field: elude.proto.Title title = 9;
   */
  title?: Title;

  /**
   * Traveller user data.
   *
   * @generated from field: elude.proto.User user = 10;
   */
  user?: User;

  /**
   * Traveller type (CNN/ADT/INF). Not used in DB.
   *
   * @generated from field: string traveler_type = 11;
   */
  travelerType: string;

  constructor(data?: PartialMessage<Traveller>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "elude.proto.Traveller";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Traveller;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Traveller;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Traveller;

  static equals(a: Traveller | PlainMessage<Traveller> | undefined, b: Traveller | PlainMessage<Traveller> | undefined): boolean;
}

