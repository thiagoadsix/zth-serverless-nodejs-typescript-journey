import { v4 as uuid } from "uuid";

import { Auditable } from "./auditable";

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export class Reservation extends Auditable {
  id: string;
  customerId: string;
  hotelId: string;
  roomNumber: number;
  checkInDate: String;
  checkOutDate: String;
  totalPrice: number;
  status: ReservationStatus;

  constructor(
    customerId: string,
    hotelId: string,
    roomNumber: number,
    checkInDate: String,
    checkOutDate: String,
    totalPrice: number,
    status: ReservationStatus
  ) {
    super();
    this.id = uuid();
    this.customerId = customerId;
    this.hotelId = hotelId;
    this.roomNumber = roomNumber;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.totalPrice = totalPrice;
    this.status = status;
  }
}
