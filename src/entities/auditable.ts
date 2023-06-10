export class Auditable {
  createdAt: String;
  updatedAt: String;
  deletedAt?: String;

  constructor() {
    const now: String = new Date().toISOString();
    this.createdAt = now;
    this.updatedAt = now;
  }

  update() {
    this.updatedAt = new Date().toISOString();
  }

  delete() {
    this.deletedAt = new Date().toISOString();
  }
}
