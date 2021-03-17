const db = require('./db')

const produtos = db.sequelize.define('produtos' ,{
    nomeOng:{
        type:db.Sequelize.STRING
    },
    categoriaDoacao:{
        type:db.Sequelize.STRING
    },
    nomeProduto:{
        type:db.Sequelize.STRING
    },
    quantidade:{
        type:db.Sequelize.STRING
    },
    prioridade:{
        type:db.Sequelize.STRING
    }
})  




//Cria tabela= somente uma vez
//produtos.sync({force:true})

module.exports = produtos