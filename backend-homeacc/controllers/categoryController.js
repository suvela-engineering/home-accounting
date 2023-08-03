const categoryService = require('../services/categoryService');
const { StatusCodes } = require('http-status-codes');
const validator = require("../validators/validator.js");

module.exports = {
    // GET ALL (EXCL. SOFT DELETED)
    fetchCategories: async (req, res, next) => {
        console.log("fetchCategories started ...");
        const uRows = await categoryService.getCategories(req, res, next);
        if (res.statusCode >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK", data: uRows });
    },

    // GET ONE
    fetchCategoryById: async (req, res, next) => {
        console.log("fetchCategoryById, started ...");
        const category = await categoryService.getCategory(req, res, next);
        if (res.statusCode >= StatusCodes.BAD_REQUEST) // 400
            return;
        return validator.checkContent(res, category);
    },

    // PUT & POST
    editCategory: async (req, res, next) => {
        console.log("editCategory, started ...");
        const category = await categoryService.editCategory(req, res, next);
        if (res.statusCode >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK,", data: category });
    },

    // SOFT DELETE
    deleteCategory: async (req, res, next) => {
        console.log("deleteCategory, started ...");
        const categoryName = await categoryService.deleteCategory(req, res, next);
        if (res.statusCode >= StatusCodes.BAD_REQUEST) // 400
            return;
        res.json({ status: "OK,", msg: "Category " + categoryName + " deleted succesfully" });
    },
}