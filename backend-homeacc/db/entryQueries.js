const { query } = require('express');
const pool = require('../pool.env');

// exports.getEntries = (req, res) => {
//     return new Promise(async (resolve, reject) => {
//       entryService.getEntries()
//         .then((entries) => {
//           res.status(200).json(entries);
//           resolve();
//         })
//         .catch((error) => {
//           res.status(500).json({ error: error.message });
//           reject(error);
//         });
//     });
//   };

module.exports = {
    getEntries: () => {
        return new Promise((resolve, reject) => {   
            console.log("getEntries sisällä");
            let query = "SELECT * FROM entries;";
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