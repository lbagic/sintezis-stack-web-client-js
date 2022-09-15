// @generated by protoc-gen-connect-web v0.2.1 with parameter "target=js+dts"
// @generated from file services/hotel_service.proto (package elude.proto, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {BuildHotelRequest, CancelRequest, GetAbandonTripSearchRequest, GetPriceRequest, HotelDetailsRequest, ItineraryRequest, ReservationRequest, RetrieveRequest, RevalidateItineraryRequest} from "../proto/air_hotel_reservation_search/request_pb.js";
import {BuildHotelResponse, CancelResponse, GetAbandonTripSearchResponse, GetPriceResponse, HotelDetailsResponse, ItineraryResponse, ReservationResponse, RetrieveResponse, RevalidateItineraryResponse} from "../proto/air_hotel_reservation_search/response_pb.js";
import {MethodKind} from "@bufbuild/protobuf";

/**
 * It will send a request to multiple GDS provider and then stream back responses
 *
 * @generated from service elude.proto.HotelController
 */
export const HotelController = {
  typeName: "elude.proto.HotelController",
  methods: {
    /**
     * @generated from rpc elude.proto.HotelController.RunHotelSearch
     */
    runHotelSearch: {
      name: "RunHotelSearch",
      I: ItineraryRequest,
      O: ItineraryResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * @generated from rpc elude.proto.HotelController.CreateReservation
     */
    createReservation: {
      name: "CreateReservation",
      I: ReservationRequest,
      O: ReservationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelController.StreamCreateReservation
     */
    streamCreateReservation: {
      name: "StreamCreateReservation",
      I: ReservationRequest,
      O: ReservationResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * @generated from rpc elude.proto.HotelController.GetHotelDetails
     */
    getHotelDetails: {
      name: "GetHotelDetails",
      I: HotelDetailsRequest,
      O: HotelDetailsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelController.CancelReservation
     */
    cancelReservation: {
      name: "CancelReservation",
      I: CancelRequest,
      O: CancelResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelController.GetPrice
     */
    getPrice: {
      name: "GetPrice",
      I: GetPriceRequest,
      O: GetPriceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelController.RetrieveReservation
     */
    retrieveReservation: {
      name: "RetrieveReservation",
      I: RetrieveRequest,
      O: RetrieveResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelController.GetAbandonTripSearch
     */
    getAbandonTripSearch: {
      name: "GetAbandonTripSearch",
      I: GetAbandonTripSearchRequest,
      O: GetAbandonTripSearchResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelController.RevalidateItinerary
     */
    revalidateItinerary: {
      name: "RevalidateItinerary",
      I: RevalidateItineraryRequest,
      O: RevalidateItineraryResponse,
      kind: MethodKind.Unary,
    },
  }
};

/**
 * Generic server that can work with all of the adapter
 *
 * @generated from service elude.proto.HotelAdapter
 */
export const HotelAdapter = {
  typeName: "elude.proto.HotelAdapter",
  methods: {
    /**
     * @generated from rpc elude.proto.HotelAdapter.GetHotel
     */
    getHotel: {
      name: "GetHotel",
      I: ItineraryRequest,
      O: ItineraryResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelAdapter.BuildHotel
     */
    buildHotel: {
      name: "BuildHotel",
      I: BuildHotelRequest,
      O: BuildHotelResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelAdapter.GetHotelDetails
     */
    getHotelDetails: {
      name: "GetHotelDetails",
      I: HotelDetailsRequest,
      O: HotelDetailsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelAdapter.GetHotelMediaLinks
     */
    getHotelMediaLinks: {
      name: "GetHotelMediaLinks",
      I: ItineraryRequest,
      O: ItineraryResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelAdapter.CreateReservation
     */
    createReservation: {
      name: "CreateReservation",
      I: ReservationRequest,
      O: ReservationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelAdapter.CancelReservation
     */
    cancelReservation: {
      name: "CancelReservation",
      I: CancelRequest,
      O: CancelResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelAdapter.GetPrice
     */
    getPrice: {
      name: "GetPrice",
      I: GetPriceRequest,
      O: GetPriceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelAdapter.RetrieveReservation
     */
    retrieveReservation: {
      name: "RetrieveReservation",
      I: RetrieveRequest,
      O: RetrieveResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelAdapter.GetAbandonTripSearch
     */
    getAbandonTripSearch: {
      name: "GetAbandonTripSearch",
      I: GetAbandonTripSearchRequest,
      O: GetAbandonTripSearchResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc elude.proto.HotelAdapter.RevalidateItinerary
     */
    revalidateItinerary: {
      name: "RevalidateItinerary",
      I: RevalidateItineraryRequest,
      O: RevalidateItineraryResponse,
      kind: MethodKind.Unary,
    },
  }
};

