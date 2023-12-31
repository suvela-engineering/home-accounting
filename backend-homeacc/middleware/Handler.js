const { StatusCodes } = require('http-status-codes');

module.exports = {
    errorHandler: (err, req, res, next) => {
        if (res)
            res.status(StatusCodes.BAD_REQUEST).json({ status: "NOT OK", msg: err.message }); // 400
    },
    // asyncHandler: fn => (req, res, next) => {
    //     return Promise
    //         .resolve(fn(req, res, next))
    //         .catch(next); 
    // }

    //     if (validator.isNullOrEmptyOrUndef(res))
    //     return;
    // if (validator.isNullOrEmptyOrUndef(res.StatusCode) == false && res.StatusCode >= 400)
    //     res.status(StatusCodes.BAD_REQUEST).json({ status: "NOT OK", msg: err.message }); // 400
}