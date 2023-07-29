const _ = require('lodash');

module.exports = {
    isNullOrEmptyOrUndef: (input) => {
        if (input == null || input == '' || input == undefined)
            return true;
        return false;
    },
    checkIdError: (id, entity = '') => {
        if (module.exports.isNullOrEmptyOrUndef(id))
            return new Error(entity + ' id is null.');

        if (isNaN(id))
            return new Error(entity + ' id is not a number.');

        return null;
    },
    checkNullDeletedError: (input, entity, checkDeleted = false) => {
        if (module.exports.isNullOrEmptyOrUndef(input))
            return new Error(entity + ' id is null.');

        if (input.deleted && checkDeleted)
            return new Error(entity + ' is already deleted');

        if (input.deleted)
            return new Error(entity + ' is deleted');

        return null;
    },
}