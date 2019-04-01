import  { prop, Typegoose, Ref, arrayProp } from "typegoose"
import Top from "./top";
import Meeting from "./meeting";
export default class Organization extends Typegoose {
    @prop()
    title: String
    @prop()
    description?: String
    
    /**
     * TODO: Invitation template language
     */
    
}
export const OrganizationModel = new Organization().getModelForClass(Organization);