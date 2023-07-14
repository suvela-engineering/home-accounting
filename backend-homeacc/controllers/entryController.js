const sql = require('../db/entryQueries.js');

module.exports = {
    fetchEntry: async (req, res) => {
        let sFetchEntry = "fetchEntry";
        console.log(sFetchEntry + " , started ...");
        try {
            let u = await sql.getEntry();
            res.json({ status: "OK", Entry: u.rows });
            console.log(sFetchEntry + " , done");
        } catch (error) {
            res.statusCode = 400;
            console.log(sFetchEntry + " , Error in server.");
            res.json({ status: "NOT OK", msg: error });
        }
    },
    fetchEntryById: async (req, res) => {
        let sfetchEntryById = "fetchEntryById";
        console.log(sfetchEntryById + " , started ...");
        try {
            // console.log("/fetchEntryById. req.params.entryId:", req.params.entryId);
            let entryId = null;

            if (req.params.entryId)
            entryId = req.params.entryId;

            if (entryId == null) {
                throw "Entry id is null.";
            }

            else if (isNaN(entryId)) {
                throw "Entry id is not a number.";
            }

            let u = await sql.getEtryById(entryId);

            res.json({ status: "OK", entry: u.rows });
            console.log(sfetchEntryById + " , done");
        } catch (error) {
            res.statusCode = 400;
            console.log(sfetchEntryById + " , Error in server.");
            res.json({ status: "NOT OK", msg: error });
        }
    },
}