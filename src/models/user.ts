import  { prop, Typegoose, Ref, arrayProp } from "typegoose"
import Meeting from "./meeting";
import Top from "./top";
export default class User extends Typegoose {
    @prop()
    image: String
    @prop()
    username: String
    @prop()
    fullname?: String
    constructor(uname?:String,fname?:String){
        super()
        this.username= uname||""
        this.fullname= fname
    }
}
export const UserModel = new User().getModelForClass(User);