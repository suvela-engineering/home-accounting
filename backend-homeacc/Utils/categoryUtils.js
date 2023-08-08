const joi = require('joi');

exports.validateCategorySchema = (data) => {
    const schema = joi.object({
        category_id: joi.number()
        .alter({
            put: (schema) => schema.disallow(),
            post: (schema) => schema.disallow()
        }),
        category_name: joi.string().optional()
        .alter({
            put: (schema) => schema.optional(),
            post: (schema) => schema.required()
        }),
        category_description: joi.string().optional()
    }).unknown(false) // disallow extra fields in the request body;

    const { error } = schema.validate(data);

    if (error)
        return error.details[0].message;
    return null;
}