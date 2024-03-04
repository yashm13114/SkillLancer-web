const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(require("./router/auth"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cors());
mongoose
// .connect("mongodb+srv://yash:jOhfBi3986fmdSAM@cluster0.uqlowxi.mongodb.net/ExpenseTracker")
    .connect("mongodb+srv://yashm13114:sh5VlCTZNnkShVVP@cluster0.lgqyj4p.mongodb.net/NikeshWebsite")
    .then(() => {
        console.log("Connected to mongo");
    })
    .catch((err) => {
        console.log("error" + err);
    });

app.get("/", async(req, res) => {
    res.send("hello");
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});