const joi = require('joi');

exports.validateEntrySchema = (entryData, reqType) => {
    const schema = joi.object({
        entry_category_id: joi.number()
            .alter({
                put: (schema) => schema.optional(),
                post: (schema) => schema.required()
            }),
        entry_name: joi.string()
            .alter({
                put: (schema) => schema.optional(),
                post: (schema) => schema.required()
            }),
        entry_description: joi.string()
            .alter({
                put: (schema) => schema.optional(),
                post: (schema) => schema.optional()
            }),
        amount: joi.number()
            .alter({
                put: (schema) => schema.optional(),
                post: (schema) => schema.required()
            }),
    }).unknown(false) // disallow extra fields in the request body;

    const reqTypeSchema = schema.tailor(reqType);

    const { error } = reqTypeSchema.validate(entryData);

    if (error)
        return error.details[0].message;
    return null;
}   