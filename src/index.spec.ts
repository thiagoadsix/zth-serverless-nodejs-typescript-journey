import { sum } from "./index";

describe("Testing sum", () => {
  it("sum function", () => {
    const result = sum(4, 4);

    expect(result).toBe(8);
  });
});
