const express = require("express");
const cors = require("cors");
const monk = require("monk");
const { json } = require("express");

const app = express();

// Connect to MongoDB
const db = monk('mongodb+srv://Halid:4534Mongo.@cluster0.7e6me.mongodb.net/');
db.then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.error("Database connection failed");
    console.error(err);
});

// Access the "score" collection
const score = db.get("score");

app.enable('trust proxy');

// Middleware
app.use(cors());
app.use(json());

// Route to get a sample score
app.get("/score", (req, res) => {
    res.json({
        message: "Miyaw hi haloo asd heyyy🐈"
    });
});

// Route to get all scores
app.get("/", async (req, res, next) => {
    try {
        const scores = await score.find({});
        res.json(scores);
        console.table(scores);
    } catch (err) {
        console.error("Error:", err);
        next(err);
    }
});

// Middleware to create a new score
const createScore = async (req, res, next) => {
    const data = {
        PlayerName: req.body.playerName.toString(),
        GameScore: req.body.score.toString(),
        Created: new Date()
    };

    try {
        const createdScore = await score.insert(data);
        res.json(createdScore);
    } catch (err) {
        next(err);
    }
};

// Route to create a new score
app.post('/', createScore);

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message
    });
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

server.timeout = 1000;
