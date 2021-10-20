import { User } from "./models/User";

const user = new User({ id:1,name:'Rahat',age:0 });



user.on('Save',()=>{
    console.log(user)
    
});
user.save();






