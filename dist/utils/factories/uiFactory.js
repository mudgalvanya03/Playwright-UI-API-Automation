"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutInfoFactory = exports.lockedUserFactory = exports.errorUserFactory = exports.standardUserFactory = void 0;
const DataFactory_1 = require("../DataFactory");
exports.standardUserFactory = new DataFactory_1.DataFactory({
    username: 'standard_user',
    password: 'secret_sauce'
});
exports.errorUserFactory = new DataFactory_1.DataFactory({
    username: 'myerroruser',
    password: 'secret_sauce'
});
exports.lockedUserFactory = new DataFactory_1.DataFactory({
    username: 'locked_out_user',
    password: 'secret_sauce'
});
exports.checkoutInfoFactory = new DataFactory_1.DataFactory({
    firstName: 'Vanya',
    lastName: 'Automation',
    postalCode: '560001'
});
