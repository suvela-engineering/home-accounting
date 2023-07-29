const commonUtils = require('../Utils/commonUtils.js');
const entryUtils = require('../Utils/entryUtils.js');
const sql = require('../db/categoryQueries');
const validator = require("../validators/validator.js");

// GET
const getCategories = async (req, res, next, inclDeleted) => {
    u = await sql.getCategories(inclDeleted);
    if (validator.isNullOrEmptyOrUndef(u?.rows))
        return next(new Error(error));
    return u.rows;
}

// GET
// const getEntry = async (req, res, next, id = null) => {
//     let entryId = id ?? req.params.entryId;

//     let idValidationError = validator.checkIdError(entryId, 'Entry');
//     if (idValidationError != null)
//         return next(idValidationError);

//     let u = await sql.getEntryById(entryId);

//     let entryNullDeletedError = validator.checkNullDeletedError(u?.rows[0], 'Entry');
//     if (entryNullDeletedError != null)
//         return next(entryNullDeletedError);

//     return u.rows[0];
// }

// // PUT & POST
// const editEntry = async (req, res, next) => {
//     let entryData = req.body;
//     let entryEdit = null;

//     if (validator.isNullOrEmptyOrUndef(entryData))
//         return next(new Error("Data not provided"));

//     if (entryData === Object && Object.keys(entryData).length === 0)
//         return next(new Error("Object is missing information"));

//     entryData = commonUtils.objKeysToLowerCase(entryData);
//     let schemaError = entryUtils.validateEntrySchema(entryData);

//     if (validator.isNullOrEmptyOrUndef(schemaError) == false)
//         return next(new Error(schemaError));

//     let entryId = req.params?.entryId ?? 0;

//     // New entry
//     if (entryId == 0) {
//         entryEdit = await sql.insertEntry(entryData);
//         return await getEntry(req, res, next, entryEdit?.rows[0]?.entry_id);
//     }

//     // Edit an existing entry
//     let entryOld = await getEntry(req, res, next, entryId);
//     if (commonUtils.commonPropsOfObjsChanged(entryData, entryOld))
//         return next(new Error("No data changes detected"));

//     entryEdit = await sql.editEntry(entryId, entryData, entryOld);

//     return await getEntry(req, res, next, entryEdit?.rows[0]?.entry_id);
// }

// // SOFT DELETE
// const deleteEntry = async (req, res, next) => {
//     let entryIdToDelete = req.params.entryIdToDelete;

//     let idValidationError = validator.checkIdError(entryIdToDelete, 'Entry');
//     if (idValidationError != null)
//         return next(idValidationError); k

//     let entryToDelete = await sql.getEntryById(entryIdToDelete);

//     let entryNullDeletedError = validator.checkNullDeletedError(entryToDelete?.rows[0], 'Entry', true);
//     if (entryNullDeletedError != null)
//         return next(entryNullDeletedError);
//     const entry = await sql.deleteEntry(entryIdToDelete);
//     return entry?.rows[0]?.entry_id ?? '';
// }

module.exports = {
    getCategories,
}