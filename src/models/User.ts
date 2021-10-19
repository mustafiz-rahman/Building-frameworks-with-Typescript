import axios, { AxiosResponse } from "axios";

interface userProps {
  id?: number;
  name?: string;
  age?: number;
}
type CallBack = () => void;
export class User {
  events: { [key: string]: CallBack[] } = {};
  constructor(private data: userProps) {}

  get(propName: string): userProps {
    return this.data[propName];
  }
  set(updateInfo: userProps): void {
    Object.assign(this.data, updateInfo);
  }
  on(eventName: string, callback: CallBack): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }
  trigger(eventName: string): void {
    const handelers = this.events[eventName];
    if (!handelers || handelers.length === 0) {
      return;
    }
    handelers.forEach((callback) => {
      callback();
    });
  }
  fetch():void{
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
    .then((res:AxiosResponse):void=>{
        this.set(res.data); 
    })
  }
  save():void{
      if(this.get('id')){
          //put
          axios.put(`http://localhost:3000/users/${this.get('id')}`,this.data);
      }
      else{
          //post
          axios.post('http://localhost:3000/users',this.data)
      }
      
  }
}
