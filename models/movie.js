const {sequelize, DataTypes, Model} = require('../db')

class Movie extends Model {}

Movie.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    runtime: DataTypes.INTEGER,
    releaseDate: DataTypes.DATEONLY,
    mPAArating: DataTypes.STRING
}, {
    sequelize,
    timestamps: false
})

module.exports = {Movie}