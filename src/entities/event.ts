import { v4 as uuid } from "uuid";

import { Auditable } from "./auditable";
import { Registration } from "./registration";
import { User } from "./user";

export class Event extends Auditable {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  price: number;
  creator: User;
  registrations: Registration[];

  constructor(
    title: string,
    description: string,
    date: Date,
    location: string,
    price: number,
    creator: User
  ) {
    super();
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.date = date;
    this.location = location;
    this.price = price;
    this.creator = creator;
    this.registrations = [];
  }
}
