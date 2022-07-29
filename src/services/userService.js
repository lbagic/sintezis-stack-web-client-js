// Based on example user type
// type User = {
//   id: number
//   userName: string
//   title: string
// }

// mocked imports
let IndexUserRequest,
  GetUserRequest,
  User,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest;

import { Grpc, hydrateGrpcModel } from "./grpc/Grpc";

export const userService = {
  indexUser() {
    return Grpc.snt
      .getUser(new IndexUserRequest())
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
      .createUser(new CreateUserRequest().setUser(model))
      .then((res) => res.toObject());
  },
  updateUser(partialData, existingData) {
    const model = new User();
    const data = { ...existingData, ...partialData };
    hydrateGrpcModel(model, data);
    return Grpc.snt
      .updateUser(new UpdateUserRequest().setUser(model))
      .then((res) => res.toObject());
  },
  deleteUser({ id }) {
    return Grpc.snt.deleteUser(new DeleteUserRequest().setId(id));
  },
};
