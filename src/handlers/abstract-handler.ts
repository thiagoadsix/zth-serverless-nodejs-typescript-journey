import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { validate } from "class-validator";

export abstract class AbstractHandler<T extends object> {
  abstract processRequest(event: APIGatewayProxyEvent): Promise<any>;

  abstract createInputInstance(input: T): T;

  handler: APIGatewayProxyHandler = async (event, _context) => {
    try {
      const parsedBody = event.body ? JSON.parse(event.body) : {};
      const inputInstance = this.createInputInstance(parsedBody);
      const validationErrors = await validate(inputInstance);

      if (validationErrors.length) {
        return this.createResponse(400, { validationErrors });
      }

      const output = await this.processRequest({ ...event, body: parsedBody });

      return this.createResponse(200, output);
    } catch (error) {
      if (error instanceof Error) {
        return this.createResponse(400, { message: error.message });
      } else {
        return this.createResponse(500, {
          message: "An unexpected error occurred",
          error: JSON.stringify(error, null, 2),
        });
      }
    }
  };

  protected createResponse(
    statusCode: number,
    body: any
  ): APIGatewayProxyResult {
    return {
      statusCode,
      body: JSON.stringify(body),
    };
  }
}
