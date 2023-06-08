import { CreateReservationUsecase } from "../../../src/usecases/reservation/create-reservation-usecase";
import {
  Reservation,
  ReservationStatus,
} from "../../../src/entities/reservation";

import { ReservationRepositoryMock } from "../../mocks/repositories/reservation-repository-mock";
import { HotelRepositoryMock } from "../../mocks/repositories/hotel-repository-mock";
import { CustomerRepositoryMock } from "../../mocks/repositories/customer-repository-mock";

describe("CreateReservationUsecase", () => {
  let reservationRepository: ReservationRepositoryMock;
  let customerRepository: CustomerRepositoryMock;
  let hotelRepository: HotelRepositoryMock;
  let usecase: CreateReservationUsecase;

  beforeEach(() => {
    reservationRepository = new ReservationRepositoryMock();
    customerRepository = new CustomerRepositoryMock();
    hotelRepository = new HotelRepositoryMock();
    usecase = new CreateReservationUsecase(
      reservationRepository,
      customerRepository,
      hotelRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if check in date is bigger or equal to check out date", async () => {
    const input = {
      customerId: "1",
      hotelId: "1",
      roomNumber: 101,
      checkInDate: new Date("2023-06-06").toISOString(),
      checkOutDate: new Date("2023-06-05").toISOString(),
      totalPrice: 500,
      status: "pending" as ReservationStatus,
    };
    const expectedReservation = new Reservation(
      input.customerId,
      input.hotelId,
      input.roomNumber,
      new Date(input.checkInDate).toISOString(),
      new Date(input.checkOutDate).toISOString(),
      input.totalPrice,
      input.status
    );
    jest
      .spyOn(reservationRepository, "isRoomAvailable")
      .mockResolvedValue(true);
    jest
      .spyOn(reservationRepository, "create")
      .mockResolvedValue(expectedReservation);

    await expect(usecase.execute(input)).rejects.toThrow(
      "Check-out date must be later than check-in date."
    );
  });

  it("should throw an error if check in date is minor then current date", async () => {
    const input = {
      customerId: "1",
      hotelId: "1",
      roomNumber: 101,
      checkInDate: new Date("2020-05-06").toISOString(),
      checkOutDate: new Date("2023-06-05").toISOString(),
      totalPrice: 500,
      status: "pending" as ReservationStatus,
    };
    const expectedReservation = new Reservation(
      input.customerId,
      input.hotelId,
      input.roomNumber,
      new Date(input.checkInDate).toISOString(),
      new Date(input.checkOutDate).toISOString(),
      input.totalPrice,
      input.status
    );
    jest
      .spyOn(reservationRepository, "isRoomAvailable")
      .mockResolvedValue(true);
    jest
      .spyOn(reservationRepository, "create")
      .mockResolvedValue(expectedReservation);

    await expect(usecase.execute(input)).rejects.toThrow(
      "Check-in date cannot be in the past."
    );
  });

  it("should create a reservation if the room is available", async () => {
    const input = {
      customerId: "1",
      hotelId: "1",
      roomNumber: 101,
      checkInDate: new Date("2023-06-30").toISOString(),
      checkOutDate: new Date("2023-07-05").toISOString(),
      totalPrice: 500,
      status: "pending" as ReservationStatus,
    };
    const expectedReservation = new Reservation(
      input.customerId,
      input.hotelId,
      input.roomNumber,
      new Date(input.checkInDate).toISOString(),
      new Date(input.checkOutDate).toISOString(),
      input.totalPrice,
      input.status
    );
    jest
      .spyOn(reservationRepository, "isRoomAvailable")
      .mockResolvedValue(true);
    jest
      .spyOn(reservationRepository, "create")
      .mockResolvedValue(expectedReservation);

    const result = await usecase.execute(input);

    expect(
      jest.spyOn(reservationRepository, "isRoomAvailable")
    ).toHaveBeenCalledWith(
      input.hotelId,
      input.roomNumber,
      input.checkInDate,
      input.checkOutDate
    );
    expect(jest.spyOn(reservationRepository, "create")).toHaveBeenCalledWith(
      expect.objectContaining({
        checkInDate: input.checkInDate,
        checkOutDate: input.checkOutDate,
        customerId: input.customerId,
        hotelId: input.hotelId,
        roomNumber: input.roomNumber,
        status: input.status,
        totalPrice: input.totalPrice,
        deletedAt: null,
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(result).toEqual(expectedReservation);
  });

  it("should throw an error if the room is not available", async () => {
    const input = {
      customerId: "1",
      hotelId: "1",
      roomNumber: 101,
      checkInDate: new Date("2023-06-30").toISOString(),
      checkOutDate: new Date("2023-07-05").toISOString(),
      totalPrice: 500,
      status: "pending" as ReservationStatus,
    };
    jest
      .spyOn(reservationRepository, "isRoomAvailable")
      .mockResolvedValue(false);

    await expect(usecase.execute(input)).rejects.toThrow(
      "Room is not available."
    );
    expect(
      jest.spyOn(reservationRepository, "isRoomAvailable")
    ).toHaveBeenCalledWith(
      input.hotelId,
      input.roomNumber,
      input.checkInDate,
      input.checkOutDate
    );
  });

  it("should throw an error if the room does not exist", async () => {
    const reservationRepository = new ReservationRepositoryMock();
    const customerRepository = new CustomerRepositoryMock();
    const hotelRepository = new HotelRepositoryMock();
    const usecase = new CreateReservationUsecase(
      reservationRepository,
      customerRepository,
      hotelRepository
    );
    const input = {
      customerId: "1",
      hotelId: "1",
      roomNumber: 101,
      checkInDate: new Date("2023-06-30").toISOString(),
      checkOutDate: new Date("2023-07-05").toISOString(),
      totalPrice: 500,
      status: "pending" as ReservationStatus,
    };
    jest.spyOn(hotelRepository, "getRoomPricePerNight").mockResolvedValue(null);

    await expect(usecase.execute(input)).rejects.toThrow(
      "Room does not exist."
    );
  });

  it("should throw an error if the total price is incorrect", async () => {
    const reservationRepository = new ReservationRepositoryMock();
    const customerRepository = new CustomerRepositoryMock();
    const hotelRepository = new HotelRepositoryMock();
    const usecase = new CreateReservationUsecase(
      reservationRepository,
      customerRepository,
      hotelRepository
    );
    const input = {
      customerId: "1",
      hotelId: "1",
      roomNumber: 101,
      checkInDate: new Date("2023-06-30").toISOString(),
      checkOutDate: new Date("2023-07-05").toISOString(),
      totalPrice: 600,
      status: "pending" as ReservationStatus,
    };
    jest.spyOn(hotelRepository, "getRoomPricePerNight").mockResolvedValue(100);

    await expect(usecase.execute(input)).rejects.toThrow(
      "Total price is incorrect."
    );
  });

  it("should throw an error if the customer does not exist", async () => {
    const input = {
      customerId: "1",
      hotelId: "1",
      roomNumber: 101,
      checkInDate: new Date("2023-06-30").toISOString(),
      checkOutDate: new Date("2023-07-05").toISOString(),
      totalPrice: 500,
      status: "pending" as ReservationStatus,
    };
    jest.spyOn(customerRepository, "getById").mockResolvedValue(null);

    await expect(usecase.execute(input)).rejects.toThrow(
      "Customer does not exist."
    );
  });

  it("should throw an error if the hotel does not exist", async () => {
    const input = {
      customerId: "1",
      hotelId: "1",
      roomNumber: 101,
      checkInDate: new Date("2023-06-30").toISOString(),
      checkOutDate: new Date("2023-07-05").toISOString(),
      totalPrice: 500,
      status: "pending" as ReservationStatus,
    };
    jest.spyOn(hotelRepository, "getById").mockResolvedValue(null);

    await expect(usecase.execute(input)).rejects.toThrow(
      "Hotel does not exist."
    );
  });
});
