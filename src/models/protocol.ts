import  { prop, Typegoose, Ref, arrayProp } from "typegoose"
import Action from "./action";
export default class Protocol extends Typegoose {
    @prop()
    content: String
    @prop()
    result: String
    @prop()
    status: number
    @prop({ ref: Action, required: true })
    action: Ref<Action>
    /**
     * TODO: Invitation template language
     */
    
}
export const ProtocolModel = new Protocol().getModelForClass(Protocol);