module.exports = {
    updateByIdQuery: (Id, IdName, tableName, cols) => {
        // Setup static beginning of query
        var query = ['UPDATE ' + tableName];
        query.push('SET');

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
    }
}
