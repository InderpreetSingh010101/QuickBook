const express = require("express");
const router = express.Router();
const Booking = require("../model/bookings");
const moment = require("moment") ;

const RoomM = require('../model/room');

router.post('/bookroom' , async(req,res)=>{

    const{
        room ,
        userid,
        fd,
        td,
        tAmount ,
        totalDays
    } = req.body;

    try{
        const newbooking = new Booking({
            room:room[0].name,
            roomid:room[0]._id,
            userid:userid,
            fromdate:moment(fd).format('DD-MM-YYYY'),
            todate:moment(td).format('DD-MM-YYYY'),
            totalamount:tAmount,
            totaldays:totalDays,
            transactionId:'1234'

        })
         const booking = await newbooking.save() ;
         // ADDING BOOKING IN THE ROOMS DB
         const roomtemp = await RoomM.findOne({_id:room[0]._id});

         roomtemp.currentbookings.push({
            bookingid:booking._id,
            fromdate:moment(fd).format('DD-MM-YYYY'),
            todate:moment(td).format('DD-MM-YYYY'),
            userid:userid,
            status:booking.status
         });

         await roomtemp.save() ;
         res.send('Room Booked Sucessfully');


    }catch(error){
          return res.status(400).json({error});
    }

})

module.exports = router ;







