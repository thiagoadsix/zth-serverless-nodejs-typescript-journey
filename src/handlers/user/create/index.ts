import { APIGatewayProxyEvent } from "aws-lambda";

import { CreateUserUsecase } from "../../../usecases/user/create-user-usecase";

import { createUserUsecaseFactory } from "../../../factories/user/create-user-usecase-factory";

import { AbstractHandler } from "../../abstract-handler";

import { CreateUserInput } from "./input";

export class CreateUserHandler extends AbstractHandler<CreateUserInput> {
  private readonly createUserUsecase: CreateUserUsecase;

  constructor() {
    super();
    this.createUserUsecase = createUserUsecaseFactory();
  }

  async processRequest(event: APIGatewayProxyEvent): Promise<any> {
    return await this.createUserUsecase.execute(event.body as any);
  }

  createInputInstance(input: CreateUserInput): CreateUserInput {
    return new CreateUserInput(input.name, input.email, input.password);
  }
}

export const handler = new CreateUserHandler().handler;
