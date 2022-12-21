const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true ,useNewUrlParser: true});
const locationSchema = {
    lat: Number,
    lng:Number,
    description: String
  };
  
const Location= mongoose.model("Location",locationSchema);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/locs",(req,res)=>{
    const newLoc = new Location()
    newLoc.lat = req.body.lat;
    newLoc.lng = req.body.lng;
    newLoc.description = req.body.description;
    newLoc.save();
    res.redirect("/");
})

app.get("/locs",(req,res)=>{
    Location.find().then( data => res.json(data));
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });