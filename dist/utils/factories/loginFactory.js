"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFactory = void 0;
const DataFactory_1 = require("../DataFactory");
const LOGIN_DEFAULTS = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
};
exports.loginFactory = new DataFactory_1.DataFactory(LOGIN_DEFAULTS);
