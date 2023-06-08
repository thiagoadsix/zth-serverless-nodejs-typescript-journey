import { v4 as uuid } from "uuid";

import { Auditable } from "./auditable";

type Room = {
  number: number;
  type: string;
  pricePerNight: number;
  availability: boolean;
};

export class Hotel extends Auditable {
  id: string;
  name: string;
  address: string;
  description: string;
  rooms: Room[];

  constructor(name: string, address: string, description: string) {
    super();
    this.id = uuid();
    this.name = name;
    this.address = address;
    this.description = description;
    this.rooms = [];
  }

  addRoom(number: number, type: string, pricePerNight: number) {
    const room: Room = {
      number,
      type,
      pricePerNight,
      availability: true,
    };

    this.rooms.push(room);
  }
}
