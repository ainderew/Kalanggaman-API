const express = require("express");
const router = express.Router();
const model = require("../Models/GuestReservation");

router.post("/", async (req,res)=> {
    

    let formatedDate =""
    let tempDayHolder ="";
    let tempYearHolder ="";
    let tempMonthHolder ="";
    
    formatedDate = req.body.reservationDate.split("-")
    tempDayHolder = formatedDate[2].split("T")[0];
    tempYearHolder = formatedDate[0];
    tempMonthHolder = formatedDate[1]
    formatedDate = `${tempMonthHolder}/${tempDayHolder}/${tempYearHolder}`

    const post = new model({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        date: formatedDate
    })
    // res.status(301).redirect("https://serene-hypatia-9cba55.netlify.app/database");
    post.save();    
})

module.exports = router;