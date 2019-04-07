import Attachment from "../models/attachment"
import mongoose from "mongoose"
export default {
    async attachment(req,res){
        try {
            let stream = (await Attachment).model.readById(mongoose.Types.ObjectId(req.params.id))
            stream.pipe(res)
        } catch (error) {
            res.status(404).send("File not found")
        }
        
    }
}