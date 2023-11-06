const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/LoginSignup")
.then(() => {
    console.log("Connection successful");
})
.catch(() => {
    console.log("Connection failed");
})

const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
        },
        password:{
        type: String,
        required: true
        }
})

const collection = new mongoose.model("Collection1", LoginSchema);

module.exports = collection