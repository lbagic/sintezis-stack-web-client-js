// @generated by protoc-gen-connect-web v0.2.1 with parameter "target=js+dts"
// @generated from file services/health.proto (package grpc.health.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {HealthCheckRequest} from "../proto/health/healthcheck_request_pb.js";
import {HealthCheckResponse} from "../proto/health/healthcheck_response_pb.js";
import {MethodKind} from "@bufbuild/protobuf";
import {HealthCheckEludeResponse} from "../proto/health/healthcheck_elude_response_pb.js";

/**
 * @generated from service grpc.health.v1.Health
 */
export declare const Health: {
  readonly typeName: "grpc.health.v1.Health",
  readonly methods: {
    /**
     * Standard Health checks
     * https://github.com/grpc/grpc/blob/master/doc/health-checking.md
     *
     * Check method is used to do a basic service health check.
     *
     * @generated from rpc grpc.health.v1.Health.Check
     */
    readonly check: {
      readonly name: "Check",
      readonly I: typeof HealthCheckRequest,
      readonly O: typeof HealthCheckResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * Check method is used to do a basic service health check.
     *
     * @generated from rpc grpc.health.v1.Health.Watch
     */
    readonly watch: {
      readonly name: "Watch",
      readonly I: typeof HealthCheckRequest,
      readonly O: typeof HealthCheckResponse,
      readonly kind: MethodKind.ServerStreaming,
    },
    /**
     * Check method is used to do more detailed elude service health check in the errors field.
     *
     * @generated from rpc grpc.health.v1.Health.CheckElude
     */
    readonly checkElude: {
      readonly name: "CheckElude",
      readonly I: typeof HealthCheckRequest,
      readonly O: typeof HealthCheckEludeResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * Check method is used to do a connection service health check used by consul and k8s.
     *
     * @generated from rpc grpc.health.v1.Health.ConnectionCheck
     */
    readonly connectionCheck: {
      readonly name: "ConnectionCheck",
      readonly I: typeof HealthCheckRequest,
      readonly O: typeof HealthCheckResponse,
      readonly kind: MethodKind.Unary,
    },
  }
};

