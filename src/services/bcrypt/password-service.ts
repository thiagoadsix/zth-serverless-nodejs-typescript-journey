import bcrypt from "bcryptjs";

import { PasswordServiceContract } from "../../contracts/service/password-service-contract";

export class PasswordService implements PasswordServiceContract {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, this.saltRounds);

      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);

      throw new Error("Could not hash password");
    }
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error("Error comparing password:", error);

      throw new Error("Could not compare password");
    }
  }
}
