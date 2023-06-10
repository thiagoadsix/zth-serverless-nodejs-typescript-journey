import bcrypt from "bcryptjs";

import { PasswordService } from "./password-service";

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe("PasswordService", () => {
  let passwordService: PasswordService;
  const password = "password";
  const hashedPassword = "hashedPassword";

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    passwordService = new PasswordService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("hashPassword", () => {
    it("should return a hashed password", async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await passwordService.hashPassword(password);

      expect(result).toEqual(hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });

    it("should throw an error if hashing fails", async () => {
      const error = new Error("Hashing error");
      (bcrypt.hash as jest.Mock).mockRejectedValue(error);

      await expect(passwordService.hashPassword(password)).rejects.toThrow(
        "Could not hash password"
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });
  });

  describe("comparePasswords", () => {
    it("should return true if the passwords match", async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await passwordService.comparePasswords(
        password,
        hashedPassword
      );

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    });

    it("should return false if the passwords do not match", async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await passwordService.comparePasswords(
        password,
        hashedPassword
      );

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    });

    it("should throw an error if comparison fails", async () => {
      const error = new Error("Could not compare password");
      (bcrypt.compare as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await expect(
        passwordService.comparePasswords(password, hashedPassword)
      ).rejects.toThrow("Could not compare password");
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    });
  });
});
