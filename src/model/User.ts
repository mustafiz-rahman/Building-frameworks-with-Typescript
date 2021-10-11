interface  UserProps{
    name?:string;
    age?:number;

}
type Callback=()=>void;
export class User{
    events:{[key:string]:Callback[]}={};
    constructor(private data:UserProps){}

    get(propName: string):UserProps{
        return this.data[propName];
    }
    set(update:UserProps):void{
        Object.assign(this.data,update);

    }
    on(evenName: string,callBack:Callback):void{
        const handlers = this.events[evenName]||[];
        handlers.push(callBack);
        this.events[evenName]=handlers;
    }
    trigger(evenName:string):void{
        const handlers = this.events[evenName];
        if(!handlers||handlers.length===0){
            return;
        }
        handlers.forEach(callback=>{
            callback();
        })
    }
}