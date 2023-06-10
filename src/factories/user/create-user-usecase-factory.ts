import { CreateUserUsecase } from "../../usecases/user/create-user-usecase";

import { UserRepository } from "../../repositories/dynamo/user/user-repository";
import { PasswordService } from "../../services/bcrypt/password-service";

export const createUserUsecaseFactory = () => {
  const userRepository = new UserRepository();
  const passwordService = new PasswordService();

  return new CreateUserUsecase(userRepository, passwordService);
};
