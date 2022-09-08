require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')


//creates an express app
const app = express()

app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})
//routing
app.use('/api/workouts', workoutRoutes)
//coneect to db

mongoose.connect(process.env.MONG_URI)
.then(() => {
//listinging for a request
console.log('testing')
app.listen(process.env.PORT,() => {
    console.log('connected to db listening on port', process.env.PORT)
})

})
.catch((error) => {
    console.log(error);
})


process.env