const handler = require('../middleware/Handler');

var express = require('express');
var router = express.Router();

let ctrl = require('../controllers/categoryController');

router.route('/api/categories').
    get(ctrl.fetchCategories);

router.route('/api/category/:categoryId').
    get(ctrl.fetchCategoryById).
    put(ctrl.editCategory);

router.route('/api/category/').
    post(ctrl.editCategory);    

router.route('/api/category/delete/:categoryIdToDelete').
    get(ctrl.deleteCategory);

//router.use(handler.asyncHandler);
router.use(handler.errorHandler);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;