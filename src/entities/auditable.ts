export class Auditable {
  createdAt: String;
  updatedAt: String;
  deletedAt: String | null;

  constructor() {
    const now: String = new Date().toISOString();
    this.createdAt = now;
    this.updatedAt = now;
    this.deletedAt = null;
  }

  update() {
    this.updatedAt = new Date().toISOString();
  }

  delete() {
    this.deletedAt = new Date().toISOString();
  }
}
