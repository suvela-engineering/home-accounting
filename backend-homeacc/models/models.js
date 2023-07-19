const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require("../pool.env");
const Category = require('./category.model');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const Entry = sequelize.define('Entry', {
  ENTRY_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ENTRY_NAME: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ENTRY_DESCRIPTION: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ENTRY_CATEGORY_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  START: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  STOP: {
    type: DataTypes.DATE,
    allowNull: true
  },
  DELETED: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  MODIFIED: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  MODIFIED_BY:{
      type : DataTypes.STRING(30),
      allowNull : true
  }
}, {
  tableName : 'entries',
  timestamps : false
});

//Entry.belongsTo(Category, {foreignKey : 'CATEGORY_ID'});
  
module.exports = Entry; 