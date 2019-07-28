
const mongoose = require('mongoose');
const run = async()=>{
    await mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true,  useFindAndModify: false });
    const gridfs = require("mongoose-gridfs")
    return gridfs({
    collection: 'attachments',
    model: 'Attachment',
    mongooseConnection: mongoose.connection
  });
}

//init attachment grid fs
const model = run()
//console.log(model)
export default model