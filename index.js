const express = require('express')
const cors = require('cors')
const { mongo, default: mongoose, Schema } = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000


//schema
const schemaData = mongoose.Schema({
    name: String,
    email:String,
    mobile:Number
},
{
    timestamps : true
})

const userModel = mongoose.model("user",schemaData)

//read
app.get("/", async(req,res)=>{
    const data = await userModel.find({})
    res.json({success : true, data : data})
})

//create data // save data in mongodb
app.post("/create", async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true, message: "data save successfull"})
})

//Update data // save data in mongodb
app.put("/update", async(req,res)=>{
    console.log(req.body)
    await userModel.updateOne({_id : req.body.id},{name : "sugan" })
   
    res.send({success : true, message: "data Update successfull"})
})


mongoose.connect("mongodb://localhost:27017/crudopertion")
.then(()=>{
    console.log("connect to DB")
    app.listen(port,()=>console.log("server is running"))
})
.catch((err)=>console.log(err))
