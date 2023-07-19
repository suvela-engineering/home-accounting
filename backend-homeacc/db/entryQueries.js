const { query } = require('express');
const pool = require('../pool.env');

module.exports = {
    getEntries: () => {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM entries WHERE deleted = false;";
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

            let query = "SELECT * FROM entries WHERE entry_id = $1";

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
    insertEntry: (entryData) => {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO entries(ENTRY_NAME, ENTRY_DESCRIPTION, ENTRY_CATEGORY_ID, MODIFIED_BY)";
            query += " VALUES($1, $2, $3, $4) RETURNING ENTRY_ID;";
            let params = [entryData.ENTRY_NAME,
            entryData.ENTRY_DESCRIPTION,
            entryData.ENTRY_CATEGORY_ID,
            entryData.MODIFIED_BY
            ];
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
    deleteEntry: (entryId) => {
        return new Promise((resolve, reject) => {
            let params = [];

            if (entryId) {
                params.push(entryId);
            }
            let query = "UPDATE entries SET deleted = true WHERE entry_id = $1";
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