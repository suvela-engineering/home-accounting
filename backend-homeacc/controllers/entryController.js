const entryService = require('../services/entryService');
const { StatusCodes } = require('http-status-codes');

module.exports = {
    // GET ALL (NO SOFT DELETED)
    fetchEntries: async (req, res, next) => {
        console.log("fetchEntries started ...");
        const uRows = await entryService.getEntries(req, res, next);
        if (res.status >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK", entries: uRows });
    },

    // GET ONE
    fetchEntryById: async (req, res, next) => {
        console.log("fetchEntryById, started ...");
        const entry = await entryService.getEntry(req, res, next);
        if (res.status >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK", entry: entry });
    },

    // PUT & POST
    editEntry: async (req, res, next) => {
        console.log("editEntry, started ...");
        const entry = await entryService.editEntry(req, res, next);
        if (res.status >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK,", entry: entry });
    },

    // // POST
    // insertEntry: async (req, res, next) => {
    //     console.log("insertEntry, started ...");
    //     const entry = await entryService.editEntry(req, res, next);
    //     if (res.status >= StatusCodes.BAD_REQUEST) // 400
    //         return;
    //     res.json({ status: "OK,", entry: entry });
    // },

    // SOFT DELETE
    deleteEntry: async (req, res, next) => {
        console.log("deleteEntry, started ...");
        await entryService.deleteEntry(req, res, next);
        if (res.status >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK,", msg: "Entry deleted succesfully" });
    },
}