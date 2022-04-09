const mongoose=require('mongoose');

const ScoreSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    }
});

mongoose.model("Score",ScoreSchema);