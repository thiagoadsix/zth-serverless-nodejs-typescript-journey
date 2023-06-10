import { User } from "./user";
import { Event } from "./event";
import { Registration } from "./registration";

describe("Registration", () => {
  it("should initialize with given parameters", () => {
    const user = new User("John Doe", "john@example.com", "password");
    const event = new Event(
      "Test Event",
      "This is a test event",
      new Date(),
      "Test Location",
      100,
      user
    );
    const registration = new Registration(user, event);
    expect(registration.user).toBe(user);
    expect(registration.event).toBe(event);
  });
});
