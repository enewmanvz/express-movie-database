const {sequelize, DataTypes, Model} = require('../db')

class Crew extends Model {
   
}

Crew.init({
    name: DataTypes.STRING,
    crewCredit: DataTypes.STRING,
    filmography: DataTypes.STRING,
    knownFor: DataTypes.STRING,
    numfilmCredit: DataTypes.INTEGER,
}, {
    sequelize,
    timestamps: false
})

module.exports = {Crew}