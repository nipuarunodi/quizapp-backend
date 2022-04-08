const mongoose=require('mongoose');

const QuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    choice1:{
        type:Number,
        required:true
    },
    choice2:{
        type:Number,
        required:true
    },
    choice3:{
        type:Number,
        required:true
    },
    choice4:{
        type:Number,
        required:true
    },
    answer:{
        type:Number,
        required:true
    },
    level:{
        type:Number,
        required:true
    }
});

mongoose.model("Question",QuestionSchema);