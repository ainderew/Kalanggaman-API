const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const databaseRoute = require("./Routes/Database");
const formsubmitRoute = require("./Routes/FormSubmit");


const port = process.env.PORT || 3000;



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())

app.listen(port, ()=>{
    console.log(`server started on ${port}`);
})



//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connected to DB"));

//routes
app.use("/formsubmit", formsubmitRoute);
app.use("/database", databaseRoute);
