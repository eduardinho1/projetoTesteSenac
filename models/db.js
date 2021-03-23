const Sequelize = require('sequelize')

const sequelize = new Sequelize('', '','',{ 
    host:'',
    dialect:'mysql'
})

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}