import { v4 as uuid } from "uuid";

import { Auditable } from "./auditable";
import { Event } from "./event";
import { User } from "./user";

export class Registration extends Auditable {
  id: string;
  user: User;
  event: Event;

  constructor(user: User, event: Event) {
    super();
    this.id = uuid();
    this.user = user;
    this.event = event;
  }
}
