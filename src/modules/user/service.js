import { Grpc, grpcOptions, hydrateGrpcModel } from "../../services/grpc/Grpc";

let IndexUserRequest,
  GetUserRequest,
  User,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest;

export const userService = {
  indexUser() {
    return Grpc.snt
      .getUser(new IndexUserRequest(), grpcOptions({ useToasts: false }))
      .then((res) => res.toObject());
  },
  getUser({ id }) {
    return Grpc.snt
      .getUser(new GetUserRequest().setId(id))
      .then((res) => res.toObject());
  },
  createUser({ userName, title }) {
    const model = new User().setUserName(userName).setTitle(title);
    return Grpc.snt
      .createUser(
        new CreateUserRequest().setUser(model),
        grpcOptions({ useToasts: false })
      )
      .then((res) => res.toObject());
  },
  updateUser(partialData, existingData) {
    const model = new User();
    const data = { ...existingData, ...partialData };
    hydrateGrpcModel(model, data);
    return Grpc.snt
      .updateUser(
        new UpdateUserRequest().setUser(model),
        grpcOptions({ useToasts: false })
      )
      .then((res) => res.toObject());
  },
  deleteUser({ id }) {
    return Grpc.snt.deleteUser(
      new DeleteUserRequest().setId(id),
      grpcOptions({ useToasts: false })
    );
  },
};
