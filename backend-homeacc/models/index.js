const dbConfig = require("../pool.env");

console.log("dbConfig: " +dbConfig);

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  } 
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add db models here:  
db.entries = require("./entry.model")(sequelize, Sequelize);
db.categories = require("./category.model")(sequelize, Sequelize);

module.exports = db;