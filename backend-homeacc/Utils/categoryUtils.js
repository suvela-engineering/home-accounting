const joi = require('joi');

exports.validateCategorySchema = (data) => {
    const schema = joi.object({
        category_id: joi.number().required(),
        category_name: joi.string().optional(),
        category_description: joi.string().optional(),
    }).unknown(false) // disallow extra fields in the request body;

    const { error } = schema.validate(data);

    if (error)
        return error.details[0].message;
    return null;
}