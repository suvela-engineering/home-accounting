const commonUtils = require('../Utils/commonUtils');
const categoryUtils = require('../Utils/categoryUtils');
const sql = require('../db/categoryQueries');
const validator = require("../validators/validator");

// GET
const getCategories = async (req, res, next) => {
    const inclDeleted = req.query?.inclDeleted === 'true' ?? false;
    u = await sql.getCategories(inclDeleted);
    if (validator.isNullOrEmptyOrUndef(u?.rows))
        return next(new Error(error));
    return u.rows;
}

// GET
const getCategory = async (req, res, next, id = null) => {
    let categoryId = id ?? req.params.categoryId;

    let idValidationError = validator.checkIdError(categoryId, 'Category');
    if (idValidationError != null)
        return next(idValidationError);

    let u = await sql.getCategoryById(categoryId);

    let nullDeletedError = validator.checkNullDeletedError(u?.rows[0], 'Category');
    if (nullDeletedError != null)
        return next(nullDeletedError);

    return u.rows[0];
}

// PUT & POST
const editCategory = async (req, res, next) => {
    let data = req.body;
    let categoryEdit = null;

    if (validator.isNullOrEmptyOrUndef(data))
        return next(new Error("Data not provided"));

    if (data === Object && Object.keys(data).length === 0)
        return next(new Error("Object is missing information"));

    data = commonUtils.objKeysToLowerCase(data);
    let schemaError = categoryUtils.validateCategorySchema(data);

    if (validator.isNullOrEmptyOrUndef(schemaError) == false)
        return next(new Error(schemaError));

    let categoryId = req.params?.categoryId ?? 0;

    // New category
    if (categoryId == 0) {
        categoryEdit = await sql.insertCategory(data);
        return await getCategory(req, res, next, categoryEdit?.rows[0]?.category_id);
    }

    // Edit an existing category
    let categoryOld = await getCategory(req, res, next, categoryId);
    if (commonUtils.commonPropsOfObjsChanged(data, categoryOld))
        return next(new Error("No data changes detected"));

    categoryEdit = await sql.editCategory(categoryId, data, categoryOld);

    return await getCategory(req, res, next, categoryEdit?.rows[0]?.categoryId);
}

// // SOFT DELETE
const deleteCategory = async (req, res, next) => {
    let categoryIdToDelete = req.params.categoryIdToDelete;

    let idValidationError = validator.checkIdError(categoryIdToDelete, 'Category');
    if (idValidationError != null)
        return next(idValidationError);

    let categoryToDelete = await sql.getCategoryById(categoryIdToDelete);

    let deletedError = validator.checkNullDeletedError(categoryToDelete?.rows[0], 'Category', true);
    if (deletedError != null)
        return next(deletedError);

    const category = await sql.deleteCategory(categoryIdToDelete);
    return (category?.rows?.length && category?.rows[0]?.category_name) ?? '';
}

module.exports = {
    getCategories,
    getCategory,
    deleteCategory,
    editCategory,
}