"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    constructor() {
        this.log = [[]];
    }
    write(transaction) {
        this.log.push(transaction);
    }
}
exports.default = Log;
