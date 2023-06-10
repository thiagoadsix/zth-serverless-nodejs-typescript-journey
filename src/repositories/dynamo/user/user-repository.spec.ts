import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";

import { User } from "../../../entities/user";

import dynamoClient from "./../dynamo-client";

import { UserRepository } from "./user-repository";

describe("UserRepository", () => {
  const dynamoMock = mockClient(dynamoClient);

  afterEach(() => {
    dynamoMock.reset();
    dynamoMock.resetHistory();
  });

  it("should create a user successfully", async () => {
    const mockUser: User = new User(
      "John Doe",
      "john.doe@email.com",
      "password"
    );

    dynamoMock.on(PutCommand).resolves({});

    const userRepository = new UserRepository();
    await userRepository.createUser(mockUser);
  });

  it("should throw an error when creating a user fails", async () => {
    const mockUser: User = new User(
      "John Doe",
      "john.doe@email.com",
      "password"
    );

    dynamoMock.on(PutCommand).rejects(new Error("DynamoDB error"));

    const userRepository = new UserRepository();
    await expect(userRepository.createUser(mockUser)).rejects.toThrow(
      "Could not create user"
    );
  });

  it("should get a user by email successfully", async () => {
    const mockEmail = "john.doe@email.com";
    const mockUser: User = new User(
      "John Doe",
      "john.doe@email.com",
      "password"
    );

    dynamoMock
      .on(QueryCommand, {
        TableName: "User",
        IndexName: "emailIndex",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": mockEmail,
        },
      })
      .resolves({ Items: [mockUser] });

    const userRepository = new UserRepository();
    const user = await userRepository.getUserByEmail(mockEmail);

    expect(user).toEqual(mockUser);
    expect(dynamoMock.calls()).toHaveLength(1);
  });

  it("should return undefined when getting a user by email that does not exist", async () => {
    const mockEmail = "john.doe@email.com";

    // Mock the QueryCommand to resolve with an object that does not contain Items
    dynamoMock.on(QueryCommand).resolves({});

    const userRepository = new UserRepository();
    const user = await userRepository.getUserByEmail(mockEmail);

    expect(user).toBeUndefined();
  });

  it("should throw an error when getting a user by email fails", async () => {
    const mockEmail = "john.doe@email.com";

    dynamoMock.on(QueryCommand).rejects(new Error("DynamoDB error"));

    const userRepository = new UserRepository();
    await expect(userRepository.getUserByEmail(mockEmail)).rejects.toThrow(
      "Could not get user by email"
    );
  });
});
