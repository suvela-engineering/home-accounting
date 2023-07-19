
module.exports = {
    isNull: (input) => {
        if (input == null || input == '' || input == undefined)
            return true;
        return false;
    },
    checkIdError: (id, entity = '') => {
        if (module.exports.isNull(id))
            return new Error(entity + ' id is null.');

        else if (isNaN(id))
            return new Error(entity + ' id is not a number.');

        return null;
    },
    checkNullDeletedError: (input, entity, checkDeleted = false) => {
        if (module.exports.isNull(input))
            return new Error(entity + ' id is null.');

        if (input.deleted && checkDeleted)
            return new Error(entity + ' is already deleted');

        if (input.deleted)
            return new Error(entity + ' is deleted');

        return null;
    }
}