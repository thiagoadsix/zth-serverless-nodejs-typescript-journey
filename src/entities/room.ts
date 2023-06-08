import { Auditable } from "./auditable";

export type RoomType = "single" | "double" | "suite";

export class Room extends Auditable {
  id: number;
  type: RoomType;
  pricePerNight: number;
  availability: boolean;

  constructor(
    id: number,
    type: RoomType,
    pricePerNight: number,
    availability: boolean = true
  ) {
    super();
    this.id = id;
    this.type = type;
    this.pricePerNight = pricePerNight;
    this.availability = availability;
  }
}
