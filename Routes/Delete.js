const express = require("express");
const router = express.Router();
const GuestReservation = require("../Models/GuestReservation")

router.get("/", async (res,req) =>{
    const name = req.query.name
    const email = req.query.email
    try{
        const data = await GuestReservation.remove({
            "name": name,
            "email": email
        })
        res.json(data)
    }catch(err){
        console.log(err)
    }
})

module.exports = router;

