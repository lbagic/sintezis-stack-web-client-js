// @generated by protoc-gen-es v0.1.1 with parameter "target=js+dts"
// @generated from file proto/models/country.proto (package elude.proto, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import type {Continent} from "./continent_pb.js";

/**
 * Country message is returned as part of Country CRUD rpc calls. Contains info about a country.
 *
 * @generated from message elude.proto.Country
 */
export declare class Country extends Message<Country> {
  /**
   * Country id.
   *
   * @generated from field: int32 id = 1;
   */
  id: number;

  /**
   * Country name.
   *
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * Country 2 letter iso code (e.g. HR).
   *
   * @generated from field: string iso_code = 3;
   */
  isoCode: string;

  /**
   * Country 3 letter iso code (e.g. HRV).
   *
   * @generated from field: string iso_code_3 = 4;
   */
  isoCode3: string;

  /**
   * Country 3 letter international code (e.g. CRO).
   *
   * @generated from field: string ioc_code = 5;
   */
  iocCode: string;

  /**
   * Country dial code.
   *
   * @generated from field: string dial_code = 6;
   */
  dialCode: string;

  /**
   * Country continent id.
   *
   * @generated from field: int32 continent_id = 7;
   */
  continentId: number;

  /**
   * Country continent data.
   *
   * @generated from field: elude.proto.Continent continent = 8;
   */
  continent?: Continent;

  /**
   * If true country is used.
   *
   * @generated from field: bool is_active = 9;
   */
  isActive: boolean;

  constructor(data?: PartialMessage<Country>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "elude.proto.Country";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Country;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Country;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Country;

  static equals(a: Country | PlainMessage<Country> | undefined, b: Country | PlainMessage<Country> | undefined): boolean;
}

