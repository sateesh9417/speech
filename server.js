require('dotenv').config()
const mongoose= require('mongoose')
const express=require('express')
const app = express()

app.use(express.json())
app.get('/api/speechRecognise',(req,res)=>{
    res.send("hello")
})

mongoose.connect('mongodb://localhost/michrophone')
 .then(()=>console.log('connected to mongodb successfully....'))
 .catch(err=>console.log('does not connected to the mongodb'))

const port = 4500
app.listen(port,()=>{
    console.log(`Listening to port ${port}....`);
})