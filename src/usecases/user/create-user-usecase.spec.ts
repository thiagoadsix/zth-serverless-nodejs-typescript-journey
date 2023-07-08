import { UserRepositoryMock } from "../../../__tests__/mocks/repositories/user-repository-mock";
import { PasswordServiceMock } from "../../../__tests__/mocks/services/password-service-mock";

import { User } from "../../entities/user";
import { Exception } from "../../exceptions/exception";
import { DomainException } from "../../exceptions/layers/domain";

import { CreateUserUsecase } from "./create-user-usecase";

describe("CreateUserUsecase", () => {
  let userRepository: UserRepositoryMock;
  let passwordService: PasswordServiceMock;
  let usecase: CreateUserUsecase;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    passwordService = new PasswordServiceMock();
    usecase = new CreateUserUsecase(userRepository, passwordService);
  });

  it("should create a new user", async () => {
    const input: CreateUserUsecase.Input = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);

    const createdUser = await userRepository.getUserByEmail(input.email);
    expect(createdUser).toBeDefined();
    expect(createdUser!.name).toBe(input.name);
    expect(createdUser!.email).toBe(input.email);
    expect(createdUser!.password).toBe(`hashed_${input.password}`);
  });

  it("should throw an error if user with the same email already exists", async () => {
    const existingUser = new User(
      "Existing User",
      "existing.user@example.com",
      "hashed_password"
    );
    userRepository.createUser(existingUser);

    const input: CreateUserUsecase.Input = {
      name: "John Doe",
      email: existingUser.email,
      password: "password123",
    };

    await expect(usecase.execute(input)).rejects.toThrow(
      new Exception(
        DomainException.USER_ALREADY_EXISTS.code,
        DomainException.USER_ALREADY_EXISTS.message
      )
    );
  });
});
