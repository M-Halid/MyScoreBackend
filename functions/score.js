{/*import express, { json } from "express"
import cors from "cors"
import monk from "monk"
*/}
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const monk = require("monk");
const { json } = require("express");

const app = express()
const db = monk(process.env.MONGODB_URI)
db.then(() => {
    console.log("connected")
}
).catch((err) => {
    console.log("database connection failed")
    console.log(err)
})

const score = db.get("score")


app.enable('trust proxy');

app.use(cors())
app.use(json())


app.get("/score", (req, res) => {

    res.json({
        message: "Miyaw hi haloo asd heyyy🐈"
    })
})



app.get("/", (req, res, next) => {
    console.log("HI!")

    score
        .find({})
        .then(score => {
            console.log("HI wieder!")
            res.json(score)
            console.table(score)
        }).catch((err) => {
            console.log("Fehler:" + err)
            next()
        });



})


const createScore = (req, res, next) => {


    const data = {
        PlayerName: req.body.playerName.toString(),
        GameScore: req.body.score.toString(),
        Created: new Date()
    }

    score
        .insert(data)
        .then(createdScore => {
            res.json(createdScore)
        }).catch(next);



}


app.post('/', createScore)

app.use((error, req, res, next) => {
    res.status(500);
    res.json({
        message: error.message
    });
});

const PORT = process.env.PORT || 3000;


const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))

server.timeout = 1000
