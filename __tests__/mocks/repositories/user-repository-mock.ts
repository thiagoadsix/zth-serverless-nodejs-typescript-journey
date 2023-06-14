import { User } from "../../../src/entities/user";

import { UserRepositoryContract } from "../../../src/contracts/repository/user-repository-contract";

export class UserRepositoryMock implements UserRepositoryContract {
  private users: User[] = [];

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async createUser(user: User): Promise<void> {
    this.users.push(user);
  }
}
