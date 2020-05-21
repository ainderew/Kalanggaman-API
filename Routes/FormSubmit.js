const express = require("express");
const router = express.Router();
const model = require("../Models/GuestReservation");

router.post("/", async (req,res)=> {
    const post = new model({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        date: req.body.reservationDate
    })
    res.status(301).redirect("https://serene-hypatia-9cba55.netlify.app/database");
    post.save();    
})

module.exports = router;