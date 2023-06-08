import { Reservation } from "../../entities/reservation";

export interface ReservationRepositoryContract {
  isRoomAvailable(
    hotelId: string,
    roomNumber: number,
    checkInDate: string,
    checkOutDate: string
  ): Promise<boolean>;
  create(reservation: Reservation): Promise<Reservation>;
}
