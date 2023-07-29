const entryService = require('../services/entryService');
const { StatusCodes } = require('http-status-codes');

module.exports = {
    // GET ALL (EXCL. SOFT DELETED)
    fetchCategories: async (req, res, next) => {
        console.log("fetchCategories started ...");
        const uRows = await entryService.getEntries(req, res, next);
        if (res.status >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK", categories: uRows });
    },

    // GET ONE
    // fetchEntryById: async (req, res, next) => {
    //     console.log("fetchEntryById, started ...");
    //     const entry = await entryService.getEntry(req, res, next);
    //     if (res.status >= StatusCodes.BAD_REQUEST) // 400
    //         return;
    //     res.json({ status: "OK", entry: entry });
    // },

    // // PUT & POST
    // editEntry: async (req, res, next) => {
    //     console.log("editEntry, started ...");
    //     const entry = await entryService.editEntry(req, res, next);
    //     if (res.statusCode >= StatusCodes.BAD_REQUEST) // 400
    //         return;
    //     res.json({ status: "OK,", entry: entry });
    // },

    // // SOFT DELETE
    // deleteEntry: async (req, res, next) => {
    //     console.log("deleteEntry, started ...");
    //     const entryId = await entryService.deleteEntry(req, res, next);
    //     if (res.status >= StatusCodes.BAD_REQUEST) // 400
    //         return;
    //     res.json({ status: "OK,", msg: "Entry " + entryId + " deleted succesfully" });
    // },
}