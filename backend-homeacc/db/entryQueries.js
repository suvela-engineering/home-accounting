const pool = require('../pool.env');
const queries = require("../Utils/queries");
const validator = require("../validators/validator");

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
            // let query = "INSERT INTO entries(ENTRY_NAME, ENTRY_DESCRIPTION,";
            // query += " ENTRY_CATEGORY_ID,  AMOUNT, START,"
            // query += " MODIFIED_BY)";
            // query += " VALUES($1, $2, $3, $4, $5, $6) RETURNING ENTRY_ID;";
            // let params = [entryData.entry_name,
            // entryData.entry_description,
            // entryData.entry_category_id,
            // entryData.amount,
            // entryData.start
            // ];
            // params.push(queries.getModifiedBy('testi user'));

            let query = queries.getInsertQuery('entries', entryData);
            query += ' RETURNING ENTRY_ID';
            // Turn req.body (entryData) into an array of values
            let params = Object.keys(entryData).map(function (key) {
                return entryData[key];
            });


            console.log("query INSERT Entry: " + query);
            console.log("query INSERT PARAMS: " + params);

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
            let query = queries.getUpdateQuery(entryId, 'ENTRY_ID', 'entries', entryData);
            console.log("query PUT Entry: " + query);

            // Turn req.body (entryData) into an array of values
            let colValues = Object.keys(entryData).map(function (key) {
                return entryData[key];
            });

            console.log("edit entry now utc is: " +new Date().getTime());

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

            // Modified timestamp and Modified_By user
            let queryUpdateModified = queries.addModifiedQuery(false);

            let query = "UPDATE entries SET deleted = true, ";
            query += queryUpdateModified;
            query += "WHERE entry_id = $1 ";
            query += "RETURNING ENTRY_NAME";
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