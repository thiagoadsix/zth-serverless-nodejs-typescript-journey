import { CustomerRepositoryContract } from "../../../src/contracts/repository/customer-repository-contract";
import { Customer } from "../../../src/entities/customer";

export class CustomerRepositoryMock implements CustomerRepositoryContract {
  async getById(id: string): Promise<Customer | null> {
    return new Customer("Mock Name", "mock@example.com", "1234567890");
  }
}
