const {sequelize, DataTypes, Model} = require('../db')

class Cast extends Model {
   
}

Cast.init({
    name: DataTypes.STRING,
    role:  DataTypes.STRING,
    castCredit: DataTypes.STRING,
    isStar: DataTypes.BOOLEAN,
    filmography: DataTypes.STRING,
    numfilmCredit: DataTypes.INTEGER,

}, {
    sequelize,
    timestamps: false
})

module.exports = {Cast}