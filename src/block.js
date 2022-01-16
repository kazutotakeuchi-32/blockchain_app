"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor(index, timestamp, transactions, nonce, hash, previousBlockHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = nonce;
        this.hash = hash;
        this.previousBlockHash = previousBlockHash;
    }
    print() {
        console.log("-------------------------------------------");
        console.log(`Block: ${this.index}`);
        console.log(`Timestamp: ${this.timestamp}`);
        console.log(`Transactions: ${this.transactions}`);
        console.log(`Nonce: ${this.nonce}`);
        console.log(`Hash: ${this.hash}`);
        console.log(`Previous Block Hash: ${this.previousBlockHash}`);
        console.log("-------------------------------------------");
    }
    getHash() {
        return this.hash;
    }
}
exports.default = Block;
