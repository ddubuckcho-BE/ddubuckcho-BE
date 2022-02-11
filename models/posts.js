const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);



const postsSchema = new mongoose.Schema({
    userId: {
        type:String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    contents: {
        type: String,
        require: true,
    },
    thumbnail:{
        type: String,
        require: true,
    },
    like_count:{
        type: Number,
        require: true,
    },
    is_like:{
        type: String,
        require: true,
    },    
    
});

postsSchema.plugin(AutoIncrement, {inc_field: 'id'})


module.exports = mongoose.model("Posts", postsSchema)