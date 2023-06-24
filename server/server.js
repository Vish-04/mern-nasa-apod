const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// Connect to MongoDB Database Collections
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MONGODB CONNECTED");
});

const usersRouter = require("./Routes/Users.js");

app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log("Server is running on port:", port)
});

// module.exports