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

});

router.post("/getbookingsbyuserid" , async(req,res)=>{
    const user = req.body.userid ;

    try{
        const bookings = await Booking.find({userid : user})
        res.send(bookings) ;
    }catch(error){
        return res.status(400).json({ error });
    }
});

router.post("/cancelbooking" , async(req,res)=>{
     const{bookingid , roomid} = req.body ;

     try{
         const bookingItem = await Booking.findOne({_id:bookingid});
          bookingItem.status = 'cancelled';

          await bookingItem.save() ;
          const roomitem = await RoomM.findOne({_id : roomid});

          const books = roomitem.currentbookings ;

          const temp = books.filter(booking=>booking.bookingid.toString() !== bookingid)
          roomitem.currentbookings = temp ;
          await roomitem.save() ;

          res.send("your booking cancelled sucessful");


     }catch(e){
        return res.status(400).json({ e });
     }

});

router.get("/getallbookings" , async(req,res)=>{

   try{
    const bookings = await Booking.find() ;
    res.send(bookings) ;

   }catch(e){
    return res.status(400).json({ e });

   }

})

module.exports = router ;







