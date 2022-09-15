// @generated by protoc-gen-es v0.1.1 with parameter "target=js+dts"
// @generated from file proto/commons/image_data.proto (package elude.proto, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {proto3} from "@bufbuild/protobuf";
import {Auth} from "./auth_pb.js";
import {SessionInfo} from "./session_info_pb.js";
import {City} from "../models/city_pb.js";
import {Media} from "../models/media_pb.js";
import {Options} from "./options_pb.js";
import {Airline} from "../models/airline_pb.js";
import {Sticker} from "../models/sticker_pb.js";
import {Amenity} from "../models/amenity_pb.js";

/**
 * UpdateCityWithImageData is the data part of UpdateCityWithImageRequest
 *
 * @generated from message elude.proto.UpdateCityWithImageData
 */
export const UpdateCityWithImageData = proto3.makeMessageType(
  "elude.proto.UpdateCityWithImageData",
  () => [
    { no: 1, name: "auth", kind: "message", T: Auth },
    { no: 2, name: "session_info", kind: "message", T: SessionInfo },
    { no: 3, name: "city", kind: "message", T: City },
    { no: 4, name: "media", kind: "message", T: Media },
    { no: 5, name: "options", kind: "message", T: Options },
  ],
);

/**
 * UpdateAirlineWithImageData is the data part of UpdateAirlineWithImageRequest
 *
 * @generated from message elude.proto.UpdateAirlineWithImageData
 */
export const UpdateAirlineWithImageData = proto3.makeMessageType(
  "elude.proto.UpdateAirlineWithImageData",
  () => [
    { no: 1, name: "auth", kind: "message", T: Auth },
    { no: 2, name: "session_info", kind: "message", T: SessionInfo },
    { no: 3, name: "airline", kind: "message", T: Airline },
    { no: 4, name: "media", kind: "message", T: Media },
    { no: 5, name: "options", kind: "message", T: Options },
  ],
);

/**
 * UpdateStickerWithImageData is the data part of UpdateStickerWithImageRequest
 *
 * @generated from message elude.proto.UpdateStickerWithImageData
 */
export const UpdateStickerWithImageData = proto3.makeMessageType(
  "elude.proto.UpdateStickerWithImageData",
  () => [
    { no: 1, name: "auth", kind: "message", T: Auth },
    { no: 2, name: "session_info", kind: "message", T: SessionInfo },
    { no: 3, name: "sticker", kind: "message", T: Sticker },
    { no: 4, name: "media", kind: "message", T: Media },
    { no: 5, name: "options", kind: "message", T: Options },
  ],
);

/**
 * UpdateAmenityWithImageData is the data part of UpdateAmenityWithImageRequest
 *
 * @generated from message elude.proto.UpdateAmenityWithImageData
 */
export const UpdateAmenityWithImageData = proto3.makeMessageType(
  "elude.proto.UpdateAmenityWithImageData",
  () => [
    { no: 1, name: "auth", kind: "message", T: Auth },
    { no: 2, name: "session_info", kind: "message", T: SessionInfo },
    { no: 3, name: "amenity", kind: "message", T: Amenity },
    { no: 4, name: "media", kind: "message", T: Media },
    { no: 5, name: "options", kind: "message", T: Options },
  ],
);

