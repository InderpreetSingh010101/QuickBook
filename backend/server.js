const express = require("express");

const app = express();

const dbConfig = require('./db');
const roomsRoute = require('./routes/roomRoute')
const userRoute = require('./routes/usersRoute')

app.use(express.json());

app.use('/api/rooms' , roomsRoute) ;
app.use('/api/users' , userRoute);

const port = process.env.PORT || 5000 ;
app.listen(port , console.log(`Node Server Is running On Port : ${port}`));
