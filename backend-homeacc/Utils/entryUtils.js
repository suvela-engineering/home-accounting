const sql = require('../db/entryQueries.js');

module.exports = {
    entryEditUtil: async (entryData) => {
        let entryId = entryData.params?.entryId ?? 0;
        // New entry
        if (entryId == 0)
            return await sql.insertEntry(entryData.body);

        // Edit an existing entry
        return await sql.editEntry(entryId, entryData.body);
    },

}