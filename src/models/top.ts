import  { prop, Typegoose, Ref } from "typegoose"
import Organization from "./organization";
import User from "./user";

export default class Top extends Typegoose {
    @prop({ ref: Organization, required: true })
    organization: Ref<Organization>
    @prop({ ref: User, required: true })
    submitter: Ref<User>
    @prop({ ref: User, required: true })
    author: Ref<User>
    @prop()
    submitted_at?: Date
    @prop()
    title:String
    @prop()
    description:String
}
export const TopModel = new Top().getModelForClass(Top);