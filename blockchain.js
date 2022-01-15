"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockChain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
    }
    createNewBlock(nonce, previousBlockHash, hash) {
        const newBlock = new Block(this.chain.length + 1, new Date(), this.pendingTransactions, nonce, hash, previousBlockHash);
        this.pendingTransactions = [];
        this.chain.push(newBlock);
        return newBlock;
    }
    getBlockLast() {
        const index = this.chain.length;
        return this.chain[index - 1];
    }
    getBlockByFirst() {
        return this.chain.length > 1 ? this.chain[0] : undefined;
    }
    createNewTransaction(amount, sender, recipient) {
        const newTransaction = new Transaction(amount, sender, recipient);
        this.pendingTransactions.push(newTransaction);
        return newTransaction;
    }
    printAllBlocks() {
        if (this.chain.length <= 0)
            return;
        for (let i = 0; i < this.chain.length; i++) {
            const block = this.chain[i];
            block.print();
        }
    }
}
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
}
class Transaction {
    constructor(amount, sender, recipient) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
    }
}
const bitcoin = new BlockChain();
bitcoin.createNewBlock(7653, "00KNWRUBWEJWENFOJNWO", "07HDFSKBWESUFBWEIBWIEUFBNW");
bitcoin.createNewBlock(8971, "00HDNFHEWEDGRBCHRNKG", "00HDYENRHFBKDURNFHNE");
bitcoin.createNewBlock(9761, "00JOIRNNOIHWEOUBNEWO", "00NJKRUOQWNOIWHRNOWQ");
bitcoin.printAllBlocks();
// console.log(bitcoin.getBlockByFirst());
// console.log(bitcoin.getBlockLast());
// const first = bitcoin.getBlockByFirst();
// first?.print();