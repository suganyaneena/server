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
    mobile:String
},
{
    timestamps : true
})

const userModel = mongoose.model("user",schemaData)

//read
//http://localhost:5000/
app.get("/", async(req,res)=>{
    const data = await userModel.find({})
    res.json({success : true, data : data})
})

//create data // save data in mongodb
//http://localhost:5000/create
/*
{
    name,
    email,
    mobile
}
*/
app.post("/create", async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true, message: "data save successfully", data : data})
})

//Update data // save data in mongodb
//http://localhost:5000/update
/*
{
    id: "",
    name : "",
    email : "",
    mobile : ""

}
*/
app.put("/update", async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body
    console.log(rest)
    const data = await userModel.updateOne({_id : id},rest)
   // await userModel.updateOne({_id : req.body.id},{name : "sugan" })
   
    res.send({success : true, message: "data Update successfully", data : data})
})

//Delete data
//http://localhost:5000/delete/658eb2433e8ce522b036249a
app.delete("/delete/:id", async(req,res)=>{
   
    const id = req.params.id
    console.log(id)
    const data  = await userModel.deleteOne({_id : id})
    res.send({success : true, message: "data Deleted successfully", data : data})
})



mongoose.connect("mongodb://localhost:27017/crudopertion")
.then(()=>{
    console.log("connect to DB")
    app.listen(port,()=>console.log("server is running"))
})
.catch((err)=>console.log(err))
