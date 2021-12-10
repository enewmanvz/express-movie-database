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

//(routes-show all returns)
//return all movies
app.get('/movies', async (req,res) => {
    console.log(req)
    const allMovies = await Movie.findAll()
    res.json(allMovies)
})
//return all cast
app.get('/casts', async (req,res) => {
    console.log(req)
    const allCasts = await Cast.findAll()
    res.json(allCasts)
})

//return all crew
app.get('/crews', async (req,res) => {
    console.log(req)
    const allCrews = await Crew.findAll()
    res.json(allCrews)
})

//create new movie
app.post('/movies', async (req,res) =>{
    let newMovie = await Movie.create(req.body)
    res.send("Movie Created")
})

//update one movie by id
app.put('/movies/:id', async (req,res) => {
    let updatedMovie = await Movie.update(req.body, {
        where : {id:req.params.id}
    })
    res.send(updatedMovie ? "Movie Updated" : "Update Failed")
})

//delete one movie by id
app.delete('/movies/:id', async (req,res) => {
    const deleted = await Movie.destroy({
        where: {id: req.params.id}
    })
    //use boolen return value from destroy method return to generate a string message
    res.send(deleted ? "Deleted Movie" : "Deletion Failed")
})





app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})