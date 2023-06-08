import { v4 as uuid } from "uuid";

import { Auditable } from "./auditable";
import { Reservation } from "./reservation";

export class Customer extends Auditable {
  id: string;
  name: string;
  email: string;
  phone: string;
  reservationHistory: Reservation[];

  constructor(name: string, email: string, phone: string) {
    super();
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.reservationHistory = [];
  }
}
