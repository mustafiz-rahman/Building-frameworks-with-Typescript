import { AxiosPromise , AxiosResponse} from "axios";

interface ModelAttribute<T>{
    set(value:T):void;
    getAll():T;
    get<K extends keyof T>(key:K):T[K];

}
interface Sync<T>{
    fetch(id:number):AxiosPromise;
    save(data:T):AxiosPromise;

}

interface Events{
    on(eventName:string,callBack:()=>void):void;
    trigger(eventName:string):void;
}
interface HasId{
    id?:number;
}

export class Model<T extends HasId>{
    constructor(
        private attribute:ModelAttribute<T>,
        private events:Events,
        private sync:Sync<T>
    ){}

    

      on= this.events.on;
      trigger = this.events.trigger;
      get = this.attribute.get;
      
      set(update:T):void{
        this.attribute.set(update);
        this.events.trigger('change');
      }
      fetch():void{
        
        const id= this.attribute.get('id');
    
        if(typeof id !=='number')
        {
          throw new Error('Cant fetch');
        }
        this.sync.fetch(id).then((res:AxiosResponse):void =>{
          this.set(res.data)
        });
      } 
    
      save():void{
        this.sync.save(this.attribute.getAll())
        .then((res:AxiosResponse):void=>{
          this.trigger('Save')
        })
        .catch(()=>{
          this.trigger('error');
        });
        
      }

    
}
