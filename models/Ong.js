const db = require('./db')

const Ong = db.sequelize.define('Ong' ,{
    nomeOng:{
        type:db.Sequelize.STRING
    },
    cnpj:{
        type:db.Sequelize.STRING
    },
    dataFundacao: {
        type:db.Sequelize.STRING
    },
    email: {
        type:db.Sequelize.STRING
    },
    senha: {
        type:db.Sequelize.STRING
    },
    estado: {
        type:db.Sequelize.STRING
    },
    cidade: {
        type:db.Sequelize.STRING
    },
    endereco1: {
        type:db.Sequelize.STRING
    },
    endereco2: {
        type:db.Sequelize.STRING
    },


})  




//Cria tabela= somente uma vez
//usuario.sync({force:true})

module.exports = Ong