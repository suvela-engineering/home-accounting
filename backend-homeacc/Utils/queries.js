const commonUtils = require("./commonUtils");

module.exports = {
    getUpdateQuery: (Id, IdName, tableName, cols) => {
        // Setup static beginning of query
        var query = ['UPDATE ' + tableName];
        query.push('SET');
        query.push(module.exports.addModifiedQuery(true));

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];

        Object.keys(cols).forEach(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });

        query.push(set.join(', '));

        // Add the WHERE statement to look up by id
        query.push('WHERE ' + IdName + ' = ' + Id);

        // Return a complete query string
        return query.join(' ');
    },
    getInsertQuery: (tableName, insertData) => {
        // Setup static beginning of query
        var query = ['INSERT INTO '];

        // Create another array storing each vals command
        // and assigning a number value for parameterized query
        var cols = [];
        var vals = [];

        Object.keys(insertData).forEach(function (key, i) {
            cols.push(key);
            vals.push('($' + (i + 1) + ')');
        });
        query.push(tableName + '(' + cols.join(', ') + ') ');
        query.push('VALUES(' + vals.join(', ') + ') ');

        // Return a complete query string
        return query.join(' ');
    },
    addModifiedQuery: (setLastComma = true) => {
        let query = "MODIFIED_BY = " + commonUtils.getModifiedBy() + ", ";
        query += "MODIFIED = " + "'" + commonUtils.initWithNow() + "'"; // time in UTC
        query += setLastComma ? ', ' : '';
        return query;
    },
}
