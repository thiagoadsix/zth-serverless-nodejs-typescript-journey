import { ReservationRepositoryContract } from "../../../src/contracts/repository/reservation-repository-contract";
import { Reservation } from "../../../src/entities/reservation";

export class ReservationRepositoryMock
  implements ReservationRepositoryContract
{
  async create(reservation: Reservation): Promise<Reservation> {
    return new Reservation(
      reservation.customerId,
      reservation.hotelId,
      reservation.roomNumber,
      reservation.checkInDate,
      reservation.checkOutDate,
      reservation.totalPrice,
      reservation.status
    );
  }

  async isRoomAvailable(
    hotelId: string,
    roomNumber: number,
    checkInDate: string,
    checkOutDate: string
  ): Promise<boolean> {
    return true;
  }
}
