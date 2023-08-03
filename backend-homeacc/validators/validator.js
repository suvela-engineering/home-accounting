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
            return new Error(entity + ' not found');

        if (input?.deleted && checkDeleted)
            return new Error(entity + ' is already deleted');

        if (input?.deleted)
            return new Error(entity + ' is deleted');

        return null;
    },
    checkContent: (res, entity) => {
        if (module.exports.isNullOrEmptyOrUndef(entity))
            return res.status(204).send();
        return res.json({ status: "OK", data: entity });
    },
}