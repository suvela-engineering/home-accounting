const pool = require('../pool.env');
const queries = require("../Utils/queries");
const validator = require("../validators/validator");

module.exports = {
    getCategories: (inclDeleted) => {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM categories";
            query += inclDeleted ? ";" : " WHERE deleted = false;";
            pool.query(query, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        })
    },
    getCategoryById: (categoryId) => {
        return new Promise((resolve, reject) => {
            const params = [categoryId];
            let query = "SELECT * FROM categories WHERE category_id = $1";

            pool.query(query, params, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        })
    },
    insertCategory: (data) => {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO categories(CATEGORY_NAME, CATEGORY_DESCRIPTION,";
            query += " VALUES($1, $2) RETURNING CATEGORY_ID;";
            let params = [data.category_name,
            data.category_description];
            pool.query(query, params, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        })
    },
    editCategory: (categoryId, data) => {
        return new Promise((resolve, reject) => {
            let query = queries.updateByIdQuery(categoryId, 'CATEGORY_ID', 'categories', data);
            console.log("query PUT Category: " + query);

            // Turn req.body (data) into an array of values
            let colValues = Object.keys(data).map(function (key) {
                return data[key];
            });

            pool.query(query, colValues, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        })
    },
    deleteCategory: (categoryId) => {
        return new Promise((resolve, reject) => {
            const params = [categoryId];

            // Modified timestamp and Modified_By user
            let queryUpdateModified = queries.addModifiedQuery(false);

            let query = "UPDATE categories SET deleted = true, ";
            query += queryUpdateModified;
            query += "WHERE category_id = $1 ";
            query += "RETURNING category_name";
            pool.query(query, params, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        })
    },
}