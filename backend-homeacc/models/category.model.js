const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require("../pool.env");
const Entry = require('./entry.model');
const { entries } = require('.');

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST, 
//     dialect: dbConfig.dialect
// });

module.exports = (sequelize, Sequelize) => {
const Category = sequelize.define('Category', {
    CATEGORY_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },  
    CATEGORY_NAME: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CATEGORY_DESCRIPTION: {
        type: DataTypes.TEXT,
        allowNull: true
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
    MODIFIED_BY: {
        type: DataTypes.STRING(30),
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'categories'
});

//Category.hasMany(Entry);
Category.hasMany(Entry, { foreignKey: 'ENTRY_CATEGORY_ID' });

//User.hasMany(Foto,{as: 'fotos', foreignKey: 'userId'})
}
//module.exports = Category;