const express = require('express')
const path = require('path')

//const {Movie, Cast, Crew} = require('./index')
const {Movie} = require('./models/movie')
const {Cast} = require('./models/cast')
const {Crew} = require('./models/crew')

const app = express()
const port = 3000

//express to read json request bodies
app.use(express.json());

//return all movies
app.get('/movies', async (req,res) => {
    console.log(req)
    const allMovies = await Movie.findAll()
    res.json(allMovies)
})
//return all cast
app.get('/cast', async (req,res) => {
    console.log(req)
    const allCasts = await Cast.findAll()
    res.json(allCasts)
})

//return all crew
app.get('/crew', async (req,res) => {
    console.log(req)
    const allCrews = await Crew.findAll()
    res.json(allCrews)
})



app.listen(port, () => {
    console.log('Server listening at http://localhost:${port}')
})