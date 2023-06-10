import { User } from "./user";
import { Event } from "./event";

describe("Event", () => {
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
    expect(event.title).toBe("Test Event");
    expect(event.description).toBe("This is a test event");
    expect(event.location).toBe("Test Location");
    expect(event.price).toBe(100);
    expect(event.creator).toBe(user);
  });
});
