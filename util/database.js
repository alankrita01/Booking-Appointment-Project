const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'booking','root','mysql123',{
    dialect:'mysql',
    host:'localhost'
  }
);

module.exports = sequelize;