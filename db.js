const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    name: String,
    email: String,
    password:String
})


const todo = new Schema({
    title: String,
    isDone:Boolean
})


const Usermodel = mongoose.model("users", user);
const Todomodel = mongoose.model("todos",todo)
module.exports = {
    Usermodel,
    Todomodel
}