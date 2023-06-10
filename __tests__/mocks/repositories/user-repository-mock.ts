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

  async updateUser(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  async getUserById(userId: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === userId);
  }
}
