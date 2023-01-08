const express = require("express") ;
const router = express.Router() ;

const Room = require("../model/room");

router.get("/getallrooms" , async(req , res)=>{
    try{
    const rooms = await Room.find({})
    res.send(rooms) ;
    } catch (error) {
        return res.status(400).json({message:error}) ;
    }
    
});

router.post("/getroombyid" , async(req,res)=>{

    const roomId = req.body.roomId ;
    try{
      const room = await Room.find({_id:roomId})
      res.send(room) ;
    }catch(error){
        return res.status(400).json({message:error}) ;
    }
});


router.post("/addroom" , async(req,res)=>{

    try{
    const newRoom = new Room(req.body);
    await newRoom.save() ;
    res.send("User Added -byIps-Sucessfully");
    } catch(e){
        return res.status(400).json({e}) ;
    }

});

module.exports = router ;

