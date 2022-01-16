"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelperFunction {
    static getBlockChain(blockChain) {
        if (blockChain === undefined)
            return;
        console.log(blockChain);
    }
    static getChain(blockChain) {
        if (blockChain === undefined)
            return;
        console.log(blockChain.chain);
    }
    static getPendingTransactions(blockChain) {
        if (blockChain === undefined)
            return;
        console.log(blockChain.pendingTransactions);
    }
}
exports.default = HelperFunction;
