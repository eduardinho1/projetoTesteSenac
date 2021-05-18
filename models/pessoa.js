const db = require('./db')

const pessoa = db.sequelize.define('pessoas',{
    nome:{
        type:db.Sequelize.STRING
    },
    endereco:{
        type:db.Sequelize.STRING
    },
    cpf:{
        type:db.Sequelize.STRING
    }
    
})  




//Cria tabela= somente uma ve
//pessoa.sync({force:true})

module.exports = pessoa