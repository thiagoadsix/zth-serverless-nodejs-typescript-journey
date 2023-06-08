import { HotelRepositoryContract } from "../../../src/contracts/repository/hotel-repository-contract";
import { Hotel } from "../../../src/entities/hotel";

export class HotelRepositoryMock implements HotelRepositoryContract {
  async getById(id: string): Promise<Hotel | null> {
    return new Hotel("Mock Hotel", "123 Mock Street", "A nice hotel");
  }

  async getRoomPricePerNight(
    hotelId: string,
    roomNumber: number
  ): Promise<number | null> {
    return 100;
  }
}
