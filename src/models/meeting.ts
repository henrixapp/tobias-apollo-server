import  { prop, Typegoose, Ref } from "typegoose"
import Organization from "./organization";
import User from "./user";
export default class Meeting extends Typegoose {
    @prop({ ref: Organization, required: true })
    organization: Ref<Organization>
    @prop({ref:User})
    clerk: Ref<User>
    ///TODO: Maybe only allow users here
    @prop({ref:User})
    moderation: Ref<User>
    @prop()
    begin?: Date
    @prop()
    end?:Date
    @prop()
    date:Date
    @prop()
    title:String
    @prop()
    description:String
}
export const MeetingModel = new Meeting().getModelForClass(Meeting);