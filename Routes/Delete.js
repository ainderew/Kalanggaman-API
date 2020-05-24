const express = require("express");
const router = express.Router();
const GuestReservation = require("../Models/GuestReservation")

router.get("/", async (req,res) =>{
    try{
        const searchedName = req.query.name
        const searchedEmail = req.query.email
        
        const data = await GuestReservation.deleteOne({
            "name": searchedName,
            "email": searchedEmail
        })
        res.json(data)
    }catch(err){
        res.json(err)
    }
})

router.get("/deleteAll", async (req,res)=>{
    try {
        const data = await GuestReservation.deleteMany()
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;

