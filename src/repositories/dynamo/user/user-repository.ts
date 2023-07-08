import {
  QueryCommand,
  PutCommand,
  PutCommandInput,
} from "@aws-sdk/lib-dynamodb";

import { User } from "../../../entities/user";

import { UserRepositoryContract } from "../../../contracts/repository/user-repository-contract";

import dynamo from "../dynamo-client";

export class UserRepository implements UserRepositoryContract {
  private readonly tableName = "Users";

  async createUser(user: User): Promise<void> {
    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: { ...user },
    };

    const command = new PutCommand(params);

    try {
      await dynamo.send(command);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Could not create user");
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const params = {
      TableName: this.tableName,
      IndexName: "emailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const command = new QueryCommand(params);

    try {
      const result = await dynamo.send(command);

      if (!result.Items) {
        return;
      }

      return result.Items[0] as User;
    } catch (error) {
      console.error("Error getting user by email:", error);
      throw new Error("Could not get user by email");
    }
  }
}
