const express = require("express") ;
const router = express.Router() ;

const User = require("../model/user");

router.post("/register" , async(req,res)=>{
    const newuser = new User({name:req.body.name , email:req.body.email , password:req.body.password})

    try{
      const user = await newuser.save() ;
      res.send("User Registered -byIps-Sucessfully")

    }catch(error){
     return res.status(400).json({ error });
    }

});


router.post("/login" , async(req , res)=>{
    const {email , password} = req.body ;

    try{
         const user = await User.findOne({email , password});
         if(user){

            const temp = {name : user.name,
                 id : user._id ,
            email : user.email,
            isAdmin : user.isAdmin
            }
            res.send(temp);
         }else{
            return res.status(400).json({message : "Login Failed"});
         }
    }catch(error){
        return res.status(400).json({ error });
    }
});

module.exports = router ;