import { Hotel } from "../../entities/hotel";

export interface HotelRepositoryContract {
  getById(id: string): Promise<Hotel | null>;
  getRoomPricePerNight(
    hotelId: string,
    roomNumber: number
  ): Promise<number | null>;
}
