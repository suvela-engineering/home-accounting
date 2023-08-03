const entryService = require('../services/entryService');
const { StatusCodes } = require('http-status-codes');
const validator = require("../validators/validator.js");

module.exports = {
    // GET ALL (EXCL. SOFT DELETED)
    fetchEntries: async (req, res, next) => {
        console.log("fetchEntries started ...");
        const uRows = await entryService.getEntries(req, res, next);
        if (res.statusCode >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK", data: uRows });
    },

    // GET ONE
    fetchEntryById: async (req, res, next) => {
        console.log("fetchEntryById, started ...");
        const entry = await entryService.getEntry(req, res, next);
        if (res.statusCode >= StatusCodes.BAD_REQUEST) // 400
            return;
        return validator.checkContent(res, entry);
    },

    // PUT & POST
    editEntry: async (req, res, next) => {
        console.log("editEntry, started ...");
        const entry = await entryService.editEntry(req, res, next);
        if (res.statusCode >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK,", data: entry });
    },

    // SOFT DELETE
    deleteEntry: async (req, res, next) => {
        console.log("deleteEntry, started ...");
        const entryName = await entryService.deleteEntry(req, res, next);
        if (res.statusCode >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK,", msg: "Entry " + entryName + " deleted succesfully" });
    },
}