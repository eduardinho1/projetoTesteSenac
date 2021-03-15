const Sequelize = require('sequelize')

const sequelize = new Sequelize('projetosenac1v', 'eduardohm','meneghetti123eduardo',{ 
    host:'mysql743.umbler.com',
    dialect:'mysql'
})

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}