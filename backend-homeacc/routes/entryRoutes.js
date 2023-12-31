const handler = require('../middleware/Handler');

var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/entryController');

// router.route('/api/testdb').
//     get(ctrl.testDbConnection);


router.route('/api/entries').
    get(ctrl.fetchEntries);

router.route('/api/entry/:entryId').
    get(ctrl.fetchEntryById).
    put(ctrl.editEntry);

router.route('/api/entry/').
    post(ctrl.editEntry);

router.route('/api/entry/delete/:entryIdToDelete').
    get(ctrl.deleteEntry);

//router.use(handler.asyncHandler);
router.use(handler.errorHandler);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;