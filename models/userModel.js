const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull : false,
    primaryKey: true
  },

  userName: {
    type: Sequelize.STRING
  },
  

  phoneNumber: {
    type: Sequelize.INTEGER,
    unique: true
  },

  email: {
    type: Sequelize.STRING,
    unique: false
  } 
});

module.exports = User;