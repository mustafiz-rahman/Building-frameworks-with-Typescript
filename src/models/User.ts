import { AxiosResponse } from "axios";
import { Attributes } from "./Attributes";
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
  public attribute: Attributes<userProps>;

  constructor(attrs: userProps) {
    this.attribute = new Attributes<userProps>(attrs);
  }

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.attribute.get;
  }
  set(update:userProps):void{
    this.attribute.set(update);
    this.events.trigger('change');
  }
  fetch():void{
    
    const id= this.attribute.get('id');

    if(typeof id !=='number')
    {
      throw new Error('Cant fetch');
    }
    this.sync.fetch(id).then((res:AxiosResponse):void=>{
      this.attribute.set(res.data);
    })
  }

  save():void{
    this.sync.save(this.attribute.getAll())
    .then((res:AxiosResponse):void=>{
      this.trigger('Save')
    })
    .catch(()=>{
      this.trigger('erroe');
    });
    
  }
}
