// @generated by protoc-gen-es v0.1.1 with parameter "target=js+dts"
// @generated from file proto/models/connected_city.proto (package elude.proto, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import type {City} from "./city_pb.js";

/**
 * ConnectedCity message is deprecated.
 *
 * @generated from message elude.proto.ConnectedCity
 * @deprecated
 */
export declare class ConnectedCity extends Message<ConnectedCity> {
  /**
   * @generated from field: int32 id = 1;
   */
  id: number;

  /**
   * @generated from field: int32 departure_city_id = 2;
   */
  departureCityId: number;

  /**
   * @generated from field: int32 destination_city_id = 3;
   */
  destinationCityId: number;

  /**
   * @generated from field: elude.proto.City departure_city = 4;
   */
  departureCity?: City;

  /**
   * @generated from field: elude.proto.City destination_city = 5;
   */
  destinationCity?: City;

  constructor(data?: PartialMessage<ConnectedCity>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "elude.proto.ConnectedCity";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConnectedCity;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConnectedCity;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConnectedCity;

  static equals(a: ConnectedCity | PlainMessage<ConnectedCity> | undefined, b: ConnectedCity | PlainMessage<ConnectedCity> | undefined): boolean;
}

