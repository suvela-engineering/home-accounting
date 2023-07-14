const { query } = require('express');
const pool = require('../pool.env');
// Jatka tästä tiedostosta ja tee db ja yhteys kuntoon tähän, testaa sitte
module.exports = {
    getEntrys: () => {
        return new Promise((resolve, reject) => {   
            let query = "SELECT * from entrys;";
            pool.query(query, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        })
    },  
    getEntryById: (entryId) => {
        return new Promise((resolve, reject) => {
            let params = [];

            if (entryId) {
                params.push(entryId);
            }
            
            let query = "SELECT * FROM entries where entry_id = $1";

            pool.query(query, params, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        })  
    },

    // insertIntoUsers query esimerkki talteen: 'INSERT INTO monsters(name, personality) VALUES($1, $2)',
}