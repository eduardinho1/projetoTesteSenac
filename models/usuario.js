const db = require('./db')

const usuario = db.sequelize.define('usuarios' ,{
    tipo: {
        type:db.Sequelize.STRING
    },
    nome:{
        type:db.Sequelize.STRING
    },
    senha:{
        type:db.Sequelize.STRING
    },
    Email: {
        type:db.Sequelize.STRING
    },
    cnpj: {
        type:db.Sequelize.STRING
    },
    descricao: {
        type:db.Sequelize.STRING
    },
    colocarImagem: {
        type:db.Sequelize.STRING
    }
    

})  




//Cria tabela= somente uma ve
//usuario.sync({force:true})

module.exports = usuario