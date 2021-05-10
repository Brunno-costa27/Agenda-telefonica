const Sequelize = require("sequelize");
const sequelize = new Sequelize('login', 'root','cursodeti27!',{

    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}