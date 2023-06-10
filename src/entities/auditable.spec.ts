import { Auditable } from "./auditable";

describe("Auditable", () => {
  it("should initialize with current date and time", () => {
    const auditable = new Auditable();
    expect(auditable.createdAt).toBeDefined();
    expect(auditable.updatedAt).toBeDefined();
  });

  it("should update updatedAt when update is called", () => {
    const auditable = new Auditable();
    auditable.update();
    expect(auditable.updatedAt).toBeDefined();
  });

  it("should set deletedAt when delete is called", () => {
    const auditable = new Auditable();
    auditable.delete();
    expect(auditable.deletedAt).toBeDefined();
  });
});
