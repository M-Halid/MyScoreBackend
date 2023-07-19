
import express, { json } from "express"
import cors from "cors"
import monk from "monk"
const app = express()


const db = monk('mongodb+srv://Halid:4534Mongo.@cluster0.7e6me.mongodb.net/')
const score = db.get("score")
console.log(score)

app.enable('trust proxy');

app.use(cors())
app.use(json())

app.get("/", (req, res) => {
  res.json({
    message: "Miyaw hi haloo asd heyyy🐈"
  })
})



app.get("/score", (req, res) => {
  score
    .find()
    .then(score => {
      res.json(score)
    })
})


app.post("/score", (req, res) => {


  const data = {
    PlayerName: req.body.playerName.toString(),
    GameScore: req.body.score.toString(),
    Created: new Date()
  }

  score
    .insert(data)
    .then(createdScore => {
      res.json(createdScore)
    })



}
)

let PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))



