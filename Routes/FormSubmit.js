const express = require("express");
const router = express.Router();
const model = require("../Models/GuestReservation");

router.post("/", async (req,res)=> {
    const post = new model({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        date: req.body.date
    })

    post.save();
    res.redirect("https://serene-hypatia-9cba55.netlify.app/database");
})

module.exports = router;