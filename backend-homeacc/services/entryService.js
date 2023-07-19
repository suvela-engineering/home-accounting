const sql = require('../db/entryQueries.js');
const validator = require("../validators/validator");

const getEntries = async (req, res, next) => {
    u = await sql.getEntries();
    if (validator.isNull(u?.rows))
        return next(new Error(error));
    return u.rows;
}

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

const addEntry = async (req, res, next) => {
    const entryData = req.body;

    if (validator.isNull(entryData))
        return next(new Error("Data not provided"));

    if (entryData.constructor === Object && Object.keys(entryData).length === 0)
        return next(new Error("Object is missing information"));

    let i = await sql.insertEntry(entryData);
    let newEntryId = i?.rows[0]?.entry_id;

    return await getEntry(req, res, next, newEntryId); // TOIMII NÄIN MUTTA EI EHKÄ HYVÄ, pitäsikö kutsua controllerin fetchentryid? vai oisko joku toinen
    // parempi kun on lisätty insertillä käyttäjä ja sitte pitäisi palauttaa se lisätty
}

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
    addEntry,
    deleteEntry
}