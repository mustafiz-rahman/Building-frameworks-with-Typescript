import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface userProps {
  id?: number;
  name?: string;
  age?: number;
}
const rootUrl = "http://localhost:3000/users";
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<userProps> = new Sync(rootUrl);
  constructor(private data: userProps) {}

  get(propName: string): userProps {
    return this.data[propName];
  }
  set(updateInfo: userProps): void {
    Object.assign(this.data, updateInfo);
  }
}
