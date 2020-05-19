const express = require("express");
const app = express();
const mongoose = require("mongoose");
const databaseRoute = require("./Routes/Database");
const cors = require("cors")

const port = process.env.PORT || 3000;



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())

app.listen(port, ()=>{
    console.log(`server started on ${port}`);
})



//Connect to DB
mongoose.connect("mongodb+srv://andrewapinon:mongos123@cluster0-ucrf4.mongodb.net/Reservations", { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connected to DB"));

//routes

app.use("/database", databaseRoute);