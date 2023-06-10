import { User } from "./user";

describe("User", () => {
  it("should initialize with given parameters", () => {
    const user = new User("John Doe", "john@example.com", "password");
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
    expect(user.password).toBe("password");
  });
});
