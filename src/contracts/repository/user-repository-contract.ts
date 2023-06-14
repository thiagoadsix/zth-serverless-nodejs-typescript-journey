import { User } from "../../entities/user";

export interface UserRepositoryContract {
  createUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;
}
