
const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://ips:ips123@cluster0.800tbra.mongodb.net/mern-rooms'
// var mongoURL = 'mongodb+srv://ips:ips123@cluster0.800tbra.mongodb.net/?retryWrites=true&w=majority/mern-rooms'
mongoose.set('strictQuery' , true);
mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser:true });


var connection = mongoose.connection

connection.on('error' , ()=>{
    console.log('Mongo DB connection failed')
})

connection.on('connected' , ()=>{
    console.log(`Mongo DB connection Sucessfull `);
})


module.exports = mongoose 

