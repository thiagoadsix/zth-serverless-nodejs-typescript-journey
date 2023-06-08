import { v4 as uuid } from "uuid";

import { Auditable } from "./auditable";
import { Room } from "./room";

export class Hotel extends Auditable {
  id: string;
  name: string;
  address: string;
  description: string;
  rooms: Array<{ roomId: number }>;

  constructor(name: string, address: string, description: string) {
    super();
    this.id = uuid();
    this.name = name;
    this.address = address;
    this.description = description;
    this.rooms = [];
  }
}
