import { Customer } from "../../entities/customer";

export interface CustomerRepositoryContract {
  getById(id: string): Promise<Customer | null>;
}
