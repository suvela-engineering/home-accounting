const sql = require('../db/entryQueries.js');
const { asyncHandler } = require('../middleware/Handler');
const entryService = require('../services/entryService');
const { StatusCodes } = require('http-status-codes');

module.exports = {
    fetchEntries: async (req, res, next) => {
        console.log("fetchEntries started ...");
        const uRows = await entryService.getEntries(req, res, next);
        if (res.status >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK", entries: uRows });
    },
    fetchEntryById: async (req, res, next) => {
        console.log("fetchEntryById, started ...");
        const entry = await entryService.getEntry(req, res, next);
        if (res.status >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK", entry: entry });
    },
    addEntry: async (req, res, next) => {
        console.log("addEntry, started ...");
        const entry = await entryService.addEntry(req, res, next);
        if (res.status >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK,", entry: entry });
    },
    deleteEntry: async (req, res, next) => {
        console.log("deleteEntry, started ...");
        await entryService.deleteEntry(req, res, next);
        if (res.status >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK,", msg: "Entry deleted succesfully" });
    },

}