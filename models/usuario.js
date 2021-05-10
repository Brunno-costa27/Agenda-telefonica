const db = require("./db");

const Usuario = db.sequelize.define('usuario',{

    usuario: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    }
})

//Cria uma tabela
//Executar somente uma vez 
//Usuario.sync({force: true})


module.exports = Usuario;