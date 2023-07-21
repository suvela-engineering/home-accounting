const sql = require('../db/entryQueries.js');
const validator = require("../validators/validator");
const entryUtils = require('../Utils/entryUtils');

// GET
const getEntries = async (req, res, next) => {
    u = await sql.getEntries();
    if (validator.isNullOrEmptyOrUndef(u?.rows))
        return next(new Error(error));
    return u.rows;
}

// GET
const getEntry = async (req, res, next, id = null) => {
    let entryId = id ?? req.params.entryId;

    let idValidationError = validator.checkIdError(entryId, 'Entry');
    if (idValidationError != null)
        return next(idValidationError);

    let u = await sql.getEntryById(entryId);

    let entryNullDeletedError = validator.checkNullDeletedError(u?.rows[0], 'Entry');
    if (entryNullDeletedError != null)
        return next(entryNullDeletedError);

    return u.rows[0];
}

// PUT & POST
const editEntry = async (req, res, next) => {
    const entryData = req;
    let entryEdit = null;

    if (validator.isNullOrEmptyOrUndef(entryData.body))
        return next(new Error("Data not provided"));

    if (entryData.body === Object && Object.keys(entryData.body).length === 0)
        return next(new Error("Object is missing information"));

    entryEdit = await entryUtils.entryEditUtil(entryData);

    let editedEntryId = entryEdit?.rows[0]?.entry_id;

    return await getEntry(req, res, next, editedEntryId);
}

// SOFT DELETE
const deleteEntry = async (req, res, next) => {
    let entryIdToDelete = req.params.entryIdToDelete;

    let idValidationError = validator.checkIdError(entryIdToDelete, 'Entry');
    if (idValidationError != null)
        return next(idValidationError);

    let entryToDelete = await sql.getEntryById(entryIdToDelete);

    let entryNullDeletedError = validator.checkNullDeletedError(entryToDelete?.rows[0], 'Entry', true);
    if (entryNullDeletedError != null)
        return next(entryNullDeletedError);

    await sql.deleteEntry(entryIdToDelete);
}

module.exports = {
    getEntries,
    getEntry,
    editEntry,
    deleteEntry
}