const db = require('./db')

const usuario = db.sequelize.define('usuarios' ,{
    nome:{
        type:db.Sequelize.STRING
    },
    senha:{
        type:db.Sequelize.STRING
    },
    Email: {
        type:db.Sequelize.STRING
    },
    cpf: {
        type:db.Sequelize.STRING
    },
    Endereco1: {
        type:db.Sequelize.STRING
    },
    endereco2: {
        type:db.Sequelize.STRING
    },
    estado: {
        type:db.Sequelize.STRING
    },
    cidade: {
        type:db.Sequelize.STRING
    }

})  




//Cria tabela= somente uma vez
//usuario.sync({force:true})

module.exports = usuario