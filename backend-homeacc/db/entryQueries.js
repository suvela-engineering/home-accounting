const pool = require('../pool.env');
const queries = require("../Utils/queries");

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
            let query = "INSERT INTO entries(ENTRY_NAME, ENTRY_DESCRIPTION,";
            query += " ENTRY_CATEGORY_ID, MODIFIED_BY, AMOUNT)";
            query += " VALUES($1, $2, $3, $4, $5) RETURNING ENTRY_ID;";
            let params = [entryData.ENTRY_NAME,
            entryData.ENTRY_DESCRIPTION,
            entryData.ENTRY_CATEGORY_ID,
            entryData.MODIFIED_BY,
            entryData.AMOUNT
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
    editEntry: (entryId, entryData) => {
        return new Promise((resolve, reject) => {
            // let query = "UPDATE entries SET "
            // query += "ENTRY_NAME = $1, ENTRY_DESCRIPTION = $2, ENTRY_CATEGORY_ID = $3, "
            // query += "MODIFIED_BY = $4, ";
            // query += " RETURNING ENTRY_ID;";
            // let params = [entryData.ENTRY_NAME,
            // entryData.ENTRY_DESCRIPTION,
            // entryData.ENTRY_CATEGORY_ID,
            // entryData.MODIFIED_BY
            // ];

            // Create query
            let query = queries.updateByIdQuery(entryId, 'ENTRY_ID', 'entries', entryData);

            // Turn req.body (entryData) into an array of values
            let colValues = Object.keys(entryData).map(function (key) {
                return entryData[key];
            });

            pool.query(query, colValues, function (error, result, fields) {
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
}