const message = require('../shared/messagePool');

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        const statusCode = message.get("BAD_REQUEST_STATUS_CODE");
        return res.status(statusCode).json({ code: statusCode, message: err });
    }

    if (err.name === 'ValidationError') {
        const statusCode = message.get("BAD_REQUEST_STATUS_CODE");
        return res.status(statusCode).json({ code: statusCode, message: err.message });
    }

    const statusCode = message.get("INTERNAL_SERVER_ERROR");
    return res.status(statusCode).json({ code: statusCode, message: err.message });
}

module.exports = errorHandler;