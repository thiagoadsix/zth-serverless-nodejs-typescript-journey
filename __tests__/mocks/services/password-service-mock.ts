import { PasswordServiceContract } from "../../../src/contracts/service/password-service-contract";

export class PasswordServiceMock implements PasswordServiceContract {
  async hashPassword(password: string): Promise<string> {
    return `hashed_${password}`;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return password === hashedPassword;
  }
}
