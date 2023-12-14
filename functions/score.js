// functions/score.js

const express = require("express");
const cors = require("cors");
const monk = require("monk");
const { json } = require("express");

const app = express();
const db = monk(process.env.MONGODB_URI);
const score = db.get("score");

app.enable("trust proxy");
app.use(cors());
app.use(json());

app.get("/score", (req, res) => {
    res.json({
        message: "Miyaw hi haloo asd heyyy🐈"
    });
});

app.get("/", (req, res, next) => {
    console.log("HI!");

    score.find({})
        .then((score) => {
            console.log("HI wieder!");
            res.json(score);
            console.table(score);
        })
        .catch((err) => {
            console.log("Fehler:" + err);
            next();
        });
});

const createScore = (req, res, next) => {
    const data = {
        PlayerName: req.body.playerName.toString(),
        GameScore: req.body.score.toString(),
        Created: new Date(),
    };

    score.insert(data)
        .then((createdScore) => {
            res.json(createdScore);
        })
        .catch(next);
};

app.post("/", createScore);

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
    });
});

module.exports = app;
