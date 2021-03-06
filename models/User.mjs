export default (sequelizeInstance, Sequelize) => { 
    return sequelizeInstance.define('users', {
        id: {type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true},
        username: {type: Sequelize.STRING(25),unique: true},
        password: Sequelize.STRING(60),
        online: Sequelize.BOOLEAN,
        secret: {type: Sequelize.STRING(60), unique: true}
    })
}