import { CustomerRepositoryContract } from "../../contracts/repository/customer-repository-contract";
import { HotelRepositoryContract } from "../../contracts/repository/hotel-repository-contract";
import { ReservationRepositoryContract } from "../../contracts/repository/reservation-repository-contract";

import { Reservation, ReservationStatus } from "../../entities/reservation";

export class CreateReservationUsecase {
  constructor(
    private readonly reservationRepository: ReservationRepositoryContract,
    private readonly customerRepository: CustomerRepositoryContract,
    private readonly hotelRepository: HotelRepositoryContract
  ) {
    this.reservationRepository = reservationRepository;
    this.customerRepository = customerRepository;
    this.hotelRepository = hotelRepository;
  }

  async execute(
    input: CreateReservationUsecase.Input
  ): Promise<CreateReservationUsecase.Output> {
    this.validateDates(input.checkInDate, input.checkOutDate);

    const customer = await this.customerRepository.getById(input.customerId);

    if (!customer) {
      throw new Error("Customer does not exist.");
    }

    const hotel = await this.hotelRepository.getById(input.hotelId);

    if (!hotel) {
      throw new Error("Hotel does not exist.");
    }

    await this.validateTotalPrice(input);

    const roomIsAvailable = await this.reservationRepository.isRoomAvailable(
      input.hotelId,
      input.roomNumber,
      input.checkInDate,
      input.checkOutDate
    );

    if (!roomIsAvailable) {
      throw new Error("Room is not available.");
    }

    const reservation: Reservation = new Reservation(
      input.customerId,
      input.hotelId,
      input.roomNumber,
      input.checkInDate,
      input.checkOutDate,
      input.totalPrice,
      "pending"
    );

    const response = await this.reservationRepository.create(reservation);

    return response;
  }

  private validateDates(checkInDate: string, checkOutDate: string): void {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn >= checkOut) {
      throw new Error("Check-out date must be later than check-in date.");
    }

    if (checkIn < new Date()) {
      throw new Error("Check-in date cannot be in the past.");
    }
  }

  private async validateTotalPrice(
    input: CreateReservationUsecase.Input
  ): Promise<void> {
    const roomPricePerNight = await this.hotelRepository.getRoomPricePerNight(
      input.hotelId,
      input.roomNumber
    );

    if (!roomPricePerNight) {
      throw new Error("Room does not exist.");
    }

    const checkInDate = new Date(input.checkInDate);
    const checkOutDate = new Date(input.checkOutDate);
    const numberOfNights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const expectedTotalPrice = numberOfNights * roomPricePerNight;

    if (input.totalPrice !== expectedTotalPrice) {
      throw new Error("Total price is incorrect.");
    }
  }
}

export namespace CreateReservationUsecase {
  export type Input = {
    customerId: string;
    hotelId: string;
    roomNumber: number;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    status: ReservationStatus;
  };

  export type Output = Reservation;
}
