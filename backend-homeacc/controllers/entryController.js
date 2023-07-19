const sql = require('../db/entryQueries.js');
const { asyncHandler } = require('../middleware/Handler');
const entryService = require('../services/entryService');
const { StatusCodes } = require('http-status-codes');

module.exports = {
    fetchEntries: async (req, res, next) => {
        console.log("fetchEntries started ...");
        const u = await entryService.getEntries(req, res, next);
        if (res.status >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK", entries: u?.rows });
    },
    fetchEntryById: async (req, res, next) => {
        console.log("fetchEntryById, started ...");
        const entry = entryService.getEntry(req, res, next);
        if (res.status >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK", entry: entry });
    },
    // fetchEntryById: async (req, res, next) => {
    //     let sfetchEntryById = "fetchEntryById";
    //     console.log(sfetchEntryById + " , started ...");
    //     try {
    //         let entry = entryService.getEntry(req.params.entryId, true);
    //         res.json({ status: "OK", entry: entry });
    //         console.log(sfetchEntryById + " , done");
    //     } catch (error) {
    //         next(error);
    //         // res.statusCode = 400;
    //         // console.log(sfetchEntryById + " , Error in server.");
    //         // res.json({ status: "NOT OK", msg: error });
    //     }
    // },
    deleteEntry: async (req, res, next) => {
        let sDeleteEntry = "Delete entry";
        console.log(sDeleteEntry + " , started ...");
        try {
            let entry = entryService.deleteEntry(req.params.entryId);
            res.json({ status: "OK", entry: entry });
            console.log(sDeleteEntry + " , done");
        } catch (error) {
            res.statusCode = 400;
            console.log(sDeleteEntry + " , Error in server.");
            res.json({ status: "NOT OK", msg: error });
        }
    },
}