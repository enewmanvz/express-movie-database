const {sequelize, DataTypes, Model} = require('../db')

class Movie extends Model {}

Movie.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    runtime: DataTypes.INTEGER,
    released: DataTypes.DATEONLY,
    MPAA_rate: DataTypes.STRING,
    movie_id: DataTypes.INTEGER

}, {
    sequelize,
    timestamps: false
})

module.exports = {Movie}