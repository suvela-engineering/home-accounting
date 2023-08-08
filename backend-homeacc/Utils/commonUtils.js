const _ = require('lodash');
const validator = require("../validators/validator");

module.exports = {
    objToString: (obj) => {
        return _.mapValues(obj, _.toString);
    },
    objKeysToLowerCase: (obj) => {
        const objUpperCase = {}
        for (const key in obj) {
            objUpperCase[key.toLowerCase()] = obj[key];
        }
        return objUpperCase;
    },
    commonPropsOfObjsChanged: (obj1, obj2) => {
        // Find common properties between two objects
        const commonProps = _.intersection(_.keys(obj1), _.keys(obj2));

        // Pick only the common properties
        const pickedObj1 = _.pick(obj1, commonProps);
        const pickedObj2 = _.pick(obj2, commonProps);
        return _.isEqual(pickedObj1, pickedObj2);
    },
    generateObjInfo: (obj) => {
        // init date if not provided
        obj.start = module.exports.initNullWithNow(obj.start);
        obj.modified = module.exports.initNullWithNow(obj.modified);

        // insert modified user who is logged to system
        obj.modified_by = module.exports.getModifiedBy();

        return obj;
    },
    initNullWithNow: (date) => {
        if (validator.isNullOrEmptyOrUndef(date) == false)
            return date;
        return module.exports.initWithNow();
    },
    initWithNow: () => {
        const d = new Date().toISOString();
        return d;
    },
    getModifiedBy: () => {
        // ehkä myöhemmin voi laittaa palauttamaan  kirjautuneen käyttäjän
        return "'testi käyttäjä'";
    },
}