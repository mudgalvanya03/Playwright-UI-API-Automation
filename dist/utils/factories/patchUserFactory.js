"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserFactory = void 0;
const DataFactory_1 = require("../DataFactory");
const USER_DEFAULTS = {
//name: 'Test User',
//job: 'QA Engineer',
//email: 'test@example.com',
//role: 'viewer'
};
exports.updateUserFactory = new DataFactory_1.DataFactory(USER_DEFAULTS);
