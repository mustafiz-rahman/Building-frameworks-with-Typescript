import { User } from "./model/User";

const user = new User({name:'myname',age:53});
console.log(user.get('name'));
console.log(user.get('age'));

user.set({name:'Mustafiz'});

console.log(user.get('name'));
console.log(user.get('age'));

user.on('change',()=>{
    console.log('Change #1');
})
user.on('change',()=>{
    console.log('Change #3');
})
user.on('save',()=>{
    console.log('save was triggered');
})
user.trigger('save')
console.log(user);