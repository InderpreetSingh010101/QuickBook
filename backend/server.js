const express = require("express");

const app = express();

const dbConfig = require('./db');
const roomsRoute = require('./routes/roomRoute')


app.use('/api/rooms' , roomsRoute) ;

const port = process.env.PORT || 5000 ;
app.listen(port , console.log(`Node Server Is running On Port : ${port}`));
