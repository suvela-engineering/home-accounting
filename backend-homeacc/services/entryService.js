const sql = require('../db/entryQueries.js');
const validator = require("../validators/validator");

const getEntries = async (req, res, next) => {
    u = await sql.getEntries();
    // if (checkNull(u)?.length > 0)
    //     return next(new Error(error));
    return u; 
}

const getEntry = async (req, res, next) => {
    let entryId = req.params.entryId;
    let sError = '';

    if (entryId == null) {
        return next(new Error('Entry id is null.'));
    }

    else if (isNaN(entryId)) {
        return next(new Error('Entry id is not a number.'));
    }

    let u = await sql.getEntryById(entryId);

    errorArr.push(validator.isNotNull(u?.rows[0], 'Entry'));

    errorArr.push(isEntryDeleted(u?.rows[0]));

    if (errorArr.length > 0)
        return next(new Error(errorArr.join(", ")));

    return u.rows[0];
}

const deleteEntry = async (entryId = null) => {
    let entry = getEntry(entryId, false);
    isEntryDeleted(entry, 'entry is already deleted');
    let u = await sql.deleteEntry(entryId);

    let error = validator.isNotNull(u?.rows[0], 'Entry');
    if (error?.length > 0) {
        throw error;
    }
    return await u.rows[0];
}



// const checkNull = (entry) => {
//     return validator.isNotNull(entry, 'Entry');
// }

module.exports = {
    getEntries,
    getEntry,
    deleteEntry
}