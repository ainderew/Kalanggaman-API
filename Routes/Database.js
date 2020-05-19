const express = require("express");
const router = express.Router();
const model = require("../Models/GuestReservation");

router.get("/", async (req,res)=>{
    try{
        const data = await model.find()
        res.json(data);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;