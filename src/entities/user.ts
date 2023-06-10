import { v4 as uuid } from "uuid";

import { Auditable } from "./auditable";
import { Event } from "./event";

export class User extends Auditable {
  id: string;
  name: string;
  email: string;
  password: string;
  events: Event[];

  constructor(name: string, email: string, password: string) {
    super();
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.events = [];
  }
}
