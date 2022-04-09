const express=require('express')
var cors = require('cors')
const app=express()
const PORT=5000
const mongoose=require("mongoose")
const {MONGOURL}=require("./keys")

require("./models/user")
require("./models/questions")
require("./models/score")

app.use(cors())
app.use(express.json())
app.use(require('./routes/user'))
app.use(require('./routes/questions'))
app.use(require('./routes/score'))

mongoose.connect(MONGOURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on("connected",()=>{
    console.log("Connected to mongodb")
})

mongoose.connection.on("error",()=>{
    console.log("Error !!")
})


app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})

