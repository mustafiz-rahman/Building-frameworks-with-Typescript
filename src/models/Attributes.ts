import { userProps } from "./User";

export class Attributes<T> {
  constructor(private data: T) {}
  get=<K extends keyof T>(key: K): T[K]=> {
    return this.data[key];
  }
  set(updateInfo: T): void {
    Object.assign(this.data, updateInfo);
  }
  getAll():T{
    return this.data;
  }
}

