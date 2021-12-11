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

//return one movie by id
app.get('/movies/:id', async (req,res) => {
    //find one specific instance of the Musician model by id
    const thisMovie = await Movie.findByPk(req.params.id)
    //respond with allMovies as an array of json objects
    res.json(thisMovie)
})

//return one cast by id
app.get('/casts/:id', async (req,res) => {
    const thisCast = await Cast.findByPk(req.params.id)
    res.json(thisCast)
})

//return one crew by id
app.get('/crews/:id', async (req,res) => {
    const thisCrew = await Crew.findByPk(req.params.id)
    res.json(thisCrew)
})

// return one movie by name
app.get('/movie-name/:name', async(req,res)=>{
    //find one specific instance of the Movie model by name
    const thisMovie = await Movie.findOne({where:{name: req.params.name}})
    res.json(thisMovie)
})

// return one cast by name
app.get('/cast-name/:name', async(req,res)=>{
    const thisCast = await Cast.findOne({where:{name: req.params.name}})
    res.json(thisCast)
})

// return one crew by name
app.get('/crew-name/:name', async(req,res)=>{
    const thisCrew = await Crew.findOne({where:{name: req.params.name}})
    res.json(thisCrew)
})

//return all casts in a movie
app.get('/castmembers/:id', async (req,res) => {
    let results =[]
    //find the movie with this id
    const thisMovie = await Movie.findByPk(req.params.id)
    results.push(thisMovie)
    //find all Casts in the movie of this id
    const castsInThisMovie = await Cast.findAll({where: {MovieId: req.params.id}})
    results.push(castsInThisBand)
    //respond with musicians as an array of json objects
    res.json(results)
})

//return all crews in a band
app.get('/crewmembers/:id', async (req,res) => {
    let results =[]
    //find the band with this id
    const thisMovie = await Movie.findByPk(req.params.id)
    results.push(thisMovie)
    //find all Musicians in the band of this id
    const crewsInThisMovie = await Crew.findAll({where: {MovieId: req.params.id}})
    results.push(crewsInThisMovie)
    //respond with musicians as an array of json objects
    res.json(results)
})

//returns result of a search
app.get('/search', async (req,res) => {
    //create empty array of casts
    let results = []
    //if they query a name, return all casts with that name
    if (req.query.name){
        results = await Cast.findAll({where:{name: req.query.name}})
    }
    //if they query  crewCredit, return all casts with that crewCredit
    else if (req.query.castCredit){
        results = await Cast.findAll({where:{castCredit: req.query.castCredit}})
    }
    //respond with results as an array of json objects
    res.json(results)
})

//returns result of a search
app.get('/search', async (req,res) => {
    //create empty array of crews
    let results = []
    //if they query a name, return all crews with that name
    if (req.query.name){
        results = await Crew.findAll({where:{name: req.query.name}})
    }
    //if they query an crewCredit, return all crews with that crewCredit
    else if (req.query.crewCredit){
        results = await Crew.findAll({where:{crewCredit: req.query.crew}})
    }
    //respond with results as an array of json objects
    res.json(results)
})



//create new movie
app.post('/movies', async (req,res) =>{
    let newMovie = await Movie.create(req.body)
    res.send("Movie Created")
})

//create new cast
app.post('/casts', async (req,res) =>{
    let newCast = await Cast.create(req.body)
    res.send("Cast Created")
})

//create new crew
app.post('/crews', async (req,res) =>{
    let newCrew = await Crew.create(req.body)
    res.send("Crew Created")
})


//update one movie by id
app.put('/movies/:id', async (req,res) => {
    let updatedMovie = await Movie.update(req.body, {
        where : {id:req.params.id}
    })
    res.send(updatedMovie ? "Movie Updated" : "Update Failed")
})

//update one cast by id
app.put('/casts/:id', async (req,res) => {
    let updatedCast = await Cast.update(req.body, {
        where : {id:req.params.id}
    })
    res.send(updatedCast ? "Cast Updated" : "Update Failed")
})

//update one crew by id
app.put('/crews/:id', async (req,res) => {
    let updatedCrew = await Crew.update(req.body, {
        where : {id:req.params.id}
    })
    res.send(updatedCrew ? "Crew Updated" : "Update Failed")
})

//delete one movie by id
app.delete('/movies/:id', async (req,res) => {
    const deleted = await Movie.destroy({
        where: {id: req.params.id}
    })
    //use boolen return value from destroy method return to generate a string message
    res.send(deleted ? "Deleted Movie" : "Deletion Failed")
})

//delete one cast by id
app.delete('/casts/:id', async (req,res) => {
    const deleted = await Cast.destroy({
        where: {id: req.params.id}
    })
    //use boolen return value from destroy method return to generate a string message
    res.send(deleted ? "Deleted Cast" : "Deletion Failed")
})

//delete one crew by id
app.delete('/crews/:id', async (req,res) => {
    const deleted = await Crew.destroy({
        where: {id: req.params.id}
    })
    //use boolen return value from destroy method return to generate a string message
    res.send(deleted ? "Deleted Crew" : "Deletion Failed")
})




app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})