var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/entryController');

router.route('/api/entries').
    get(ctrl.fetchEntries);

router.route('/api/entry/:entryId').
    get(ctrl.fetchEntryById);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;