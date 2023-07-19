
module.exports = {
    isNotNull(input, entity) {
        let error = "";

        if (input == null || input == '')
            error = "Error " + entity + " not found.";

        return error;
    },
    isEntityDeleted: (entity, msg = '') => {
        if (entity.deleted == false)
            return msg;
        if (msg.length == 0)
            msg = 'Entity is deleted.'
        return msg;
    }
} 