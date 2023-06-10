import { APIGatewayProxyEvent } from "aws-lambda";
import { validate } from "class-validator";

import { AbstractHandler } from "./abstract-handler";

jest.mock("class-validator", () => ({
  validate: jest.fn(),
}));

class TestHandler extends AbstractHandler<object> {
  processRequest(event: APIGatewayProxyEvent): Promise<any> {
    throw new Error("Test error");
  }

  createInputInstance(input: object): object {
    return input;
  }
}

describe("AbstractHandler", () => {
  let handler: TestHandler;
  let event: APIGatewayProxyEvent;

  beforeEach(() => {
    handler = new TestHandler();
    event = {
      body: JSON.stringify({}),
    } as APIGatewayProxyEvent;

    (validate as jest.Mock).mockClear();
  });

  it("should handle successful processRequest", async () => {
    handler.processRequest = () => Promise.resolve({ message: "Success" });
    (validate as jest.Mock).mockResolvedValue([]);

    const response = await handler.handler(event, {} as any, {} as any);

    expect(response?.statusCode).toBe(200);
    expect(JSON.parse(response?.body || "{}")).toEqual({
      message: "Success",
    });
    expect(validate).toHaveBeenCalled();
  });

  it("should handle undefined body", async () => {
    event = {} as APIGatewayProxyEvent;
    (validate as jest.Mock).mockResolvedValue([]);

    await handler.handler(event, {} as any, {} as any);

    expect(validate).toHaveBeenCalledWith({});
  });

  it("should handle validation errors", async () => {
    const mockValidationErrors = [
      {
        property: "test",
        constraints: { isNotEmpty: "test should not be empty" },
      },
    ];
    (validate as jest.Mock).mockResolvedValue(mockValidationErrors);

    const response = await handler.handler(event, {} as any, {} as any);

    expect(response?.statusCode).toBe(400);
    expect(JSON.parse(response?.body || "{}")).toEqual({
      validationErrors: mockValidationErrors,
    });
    expect(validate).toHaveBeenCalled();
  });

  it("should handle errors in processRequest", async () => {
    (validate as jest.Mock).mockResolvedValue([]);

    const response = await handler.handler(event, {} as any, {} as any);

    expect(response?.statusCode).toBe(400);
    expect(JSON.parse(response?.body || "{}")).toEqual({
      message: "Test error",
    });
    expect(validate).toHaveBeenCalled();
  });

  it("should handle unexpected errors", async () => {
    handler.processRequest = () => {
      throw 123;
    };
    (validate as jest.Mock).mockResolvedValue([]);

    const response = await handler.handler(event, {} as any, {} as any);

    expect(response?.statusCode).toBe(500);
    expect(JSON.parse(response?.body || "{}")).toEqual({
      message: "An unexpected error occurred",
      error: "123",
    });
    expect(validate).toHaveBeenCalled();
  });
});
