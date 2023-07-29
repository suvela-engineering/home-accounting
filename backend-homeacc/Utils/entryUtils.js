const joi = require('joi');
const commonUtils = require('./commonUtils');

exports.validateEntrySchema = (entryData) => {
    const schema = joi.object({
        entry_name: joi.string().required(),
        entry_description: joi.string().required(),
        entry_category_id: joi.number().required(),
        amount: joi.number().required()
    }).unknown(false) // disallow extra fields in the request body;

    const { error } = schema.validate(entryData);

    if (error)
        return error.details[0].message;
    return null;
}