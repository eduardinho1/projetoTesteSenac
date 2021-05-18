const db = require('./db')

const faleConosco = db.sequelize.define('faleConosco',{
    nomeSolicitante:{
        type:db.Sequelize.STRING
    },
    emailSolicitante:{
        type:db.Sequelize.STRING
    },
    textoSolicitante:{
        type:db.Sequelize.STRING
    }
    
})  




//Cria tabela= somente uma ve
//faleConosco.sync({force:true})

module.exports = faleConosco