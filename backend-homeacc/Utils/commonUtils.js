const _ = require('lodash');

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
}