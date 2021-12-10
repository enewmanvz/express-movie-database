const {sequelize, DataTypes, Model} = require('../db')
//import models
const { Cast } = require('./cast')
const { Crew } = require('./crew')
const { Movie } = require('./movie')

Cast.belongsTo(Movie)
Movie.hasMany(Cast)

Crew.belongsTo(Movie)
Movie.hasMany(Crew)

//export models with added associations
module.exports = {Cast, Crew, Movie, sequelize}