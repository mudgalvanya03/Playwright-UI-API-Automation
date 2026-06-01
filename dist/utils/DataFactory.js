"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFactory = void 0;
class DataFactory {
    defaults;
    constructor(defaults) {
        this.defaults = defaults;
    }
    create(overrides) {
        return {
            ...this.defaults,
            ...overrides
        };
    }
    createMany(count, overrides) {
        let items = [];
        for (let i = 0; i < count; i++) {
            items.push(this.create(overrides));
        }
        return items;
        // your job — return array of `count` items
        // each one created with create(overrides)
    }
}
exports.DataFactory = DataFactory;
