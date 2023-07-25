"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeError = exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const status = error.status ? error.status : 500;
    const errorResponse = {
        message: error.message ? error.message : "Internal server error",
        stack: error.stack,
    };
    res.status(status).json(errorResponse);
};
exports.errorHandler = errorHandler;
const makeError = ({ message, status }) => {
    return {
        message,
        status,
    };
};
exports.makeError = makeError;
