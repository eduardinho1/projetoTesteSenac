const db = require('./db')

const usuario = db.sequelize.define('projetoong' ,{
    nome:{
        type:db.Sequelize.STRING
    },
    senha:{
        type:db.Sequelize.STRING
    }

})

//Cria tabela= somente uma vez
//usuario.sync({force:true})

module.exports = usuario