import { CreateUserUsecase } from "../../usecases/user/create-user-usecase";
import { UserRepository } from "../../repositories/dynamo/user/user-repository";
import { PasswordService } from "../../services/bcrypt/password-service";

import { createUserUsecaseFactory } from "./create-user-usecase-factory";

describe("createUserUsecaseFactory", () => {
  it("should return a CreateUserUsecase instance", () => {
    const usecase = createUserUsecaseFactory();

    expect(usecase).toBeInstanceOf(CreateUserUsecase);
  });

  it("should have UserRepository and PasswordService as dependencies", () => {
    const usecase = createUserUsecaseFactory();

    expect(usecase["userRepository"]).toBeInstanceOf(UserRepository);
    expect(usecase["passwordService"]).toBeInstanceOf(PasswordService);
  });
});
