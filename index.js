const {sequelize, DataTypes, Model} = require('./db')
//import models
const { Cast } = require('./models/cast')
const { Crew } = require('./models/crew')
const { Movie } = require('./models/movie')

Cast.belongsTo(Movie)
Movie.hasMany(Cast)

Crew.belongsTo(Movie)
Movie.hasMany(Crew)

//export models with added associations
module.exports = {Cast, Crew, Movie, sequelize}