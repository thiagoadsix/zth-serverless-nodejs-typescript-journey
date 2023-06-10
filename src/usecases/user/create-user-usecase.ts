import { User } from "../../entities/user";

import { UserRepositoryContract } from "../../contracts/repository/user-repository-contract";
import { PasswordServiceContract } from "../../contracts/service/password-service-contract";

export class CreateUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
    private readonly passwordService: PasswordServiceContract
  ) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
  }

  async execute(
    input: CreateUserUsecase.Input
  ): Promise<CreateUserUsecase.Output> {
    const existingUser = await this.userRepository.getUserByEmail(input.email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await this.passwordService.hashPassword(
      input.password
    );

    const newUser = new User(input.name, input.email, hashedPassword);

    await this.userRepository.createUser(newUser);

    const output: CreateUserUsecase.Output = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return output;
  }
}

export namespace CreateUserUsecase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = Pick<
    User,
    "id" | "name" | "email" | "createdAt" | "updatedAt"
  >;
}
