const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const {Usermodel} = require("./db")
const app = express();
const JWT_SECRET="random@kiara"
require("dotenv").config()
async function dbConnect() {
    await mongoose.connect("mongodb+srv://Shubham:4Oq9Bmx7jtA9pEgN@cluster0.sdu2o.mongodb.net/todo")
    console.log("mongodb connected successfully  4Oq9Bmx7jtA9pEgN")
}
dbConnect();
const port = process.env.PORT || 5000;
app.use(express.json())
app.post("/signup",async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email
    const checkUser = await Usermodel.findOne({
        email:email
    })
    if (checkUser) {
        res.json({
            message:"user already exists with this email"
        })
    }
   await Usermodel.create({
        name: username,
        email: email,
        password:password
    })
    console.log(`${username} has signup now`)

    res.json({
        message:`${username} has signup now`
    })
})


app.post("/signin", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password
    const foundUser = await Usermodel.findOne({
        name: username,
        password:password
    })
    
    if (foundUser) {
        const token = jwt.sign({
            username
        }, JWT_SECRET)
        
        res.json({
            token:token
        })
    } else {
        res.status(403).json({
            message:"cardentials error"
        })
    }

})

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedUser = jwt.verify(token, JWT_SECRET);
    if (decodedUser) {
        decodedUser.username === req.body.username;
        next()
    } else {
        res.status(403).json({
            message:"Incorrect Cardentials"
        })
    }
}

app.get("/todo",auth, (req, res) => {
    const username = req.body.username;

    res.json({
    message:username
    })
})
app.listen(port, (error) => {
    if (error) {
        throw error
    } else {
        console.log(`server is listening on http://localhost:${port}`)
    }
})