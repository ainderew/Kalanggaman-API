const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema ({
    name: String,
    email: String,
    phoneNumber: Number,
    date: Date
})

const Reservation = mongoose.model("GuestReservation",ReservationSchema);
module.exports = Reservation;