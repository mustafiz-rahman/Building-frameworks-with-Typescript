import { Model } from "./Model";
import {Attributes} from "./Attributes";
import { ApiSync } from "./ApiSync";
import {Eventing} from './Eventing'

export interface userProps {
  id?: number;
  name?: string;
  age?: number;
}
const rootUrl = "http://localhost:3000/users";
export class User extends Model<userProps> {
  static buildUser(atter:userProps):User{
    return new User( 
    new Attributes<userProps>(atter),
    new Eventing,
    new ApiSync<userProps>(rootUrl));

  }


}
