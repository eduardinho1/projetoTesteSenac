const Sequelize = require('sequelize')

const sequelize = new Sequelize('projetoong', 'eduardom','eduardo123',{ 
    host:'mysql743.umbler.com',
    dialect:'mysql'
})

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}