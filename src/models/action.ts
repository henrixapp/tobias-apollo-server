import  { prop, Typegoose, Ref } from "typegoose"
import Meeting from "./meeting";
import Top from "./top"
import Protocol from "./protocol";

export default class Action extends Typegoose {
    @prop({ ref: Top, required: true })
    top: Ref<Top>
    @prop({ ref: Meeting, required: true })
    meeting: Ref<Meeting>
}
export const ActionModel = new Action().getModelForClass(Action);