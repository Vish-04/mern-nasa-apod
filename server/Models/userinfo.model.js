const mongoose = require("mongoose");


const LogInSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        trim: true,
    },
    password:{
        type: String,
        required: true
    },
    
},{
    timestamps: true,
});

const loginInfo = new mongoose.model("UserInfo", LogInSchema);

module.exports = loginInfo;