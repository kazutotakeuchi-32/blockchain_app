"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = __importDefault(require("./block"));
const transaction_1 = __importDefault(require("./transaction"));
const helper_function_1 = __importDefault(require("./helper_function"));
const sha256_1 = __importDefault(require("sha256"));
const user_1 = __importDefault(require("./user"));
const log_1 = __importDefault(require("./log"));
class BlockChain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
        this.log = new log_1.default();
    }
    createNewBlock(nonce, previousBlockHash, hash) {
        const index = this.pendingTransactions.length;
        // this.log.write(
        //   this.pendingTransactions
        // )
        for (let i = 0; i < this.pendingTransactions.length; i++) {
            const transaction = this.pendingTransactions[i];
            transaction.completion();
            if (index === i) {
                transaction.sender.tmpCoin = 0;
                transaction.recipient.tmpCoin = 0;
            }
        }
        this.pendingTransactions = [];
        const newBlock = new block_1.default(this.chain.length + 1, new Date(), this.pendingTransactions, nonce, hash, previousBlockHash);
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
    findBlockByHash(hash) {
        for (let i = 0; i < this.chain.length; i++) {
            const block = this.chain[i];
            if (block.hash === hash)
                return block;
        }
        return undefined;
    }
    findBlockByIndex(index) {
        for (let i = 0; i < this.chain.length; i++) {
            const block = this.chain[i];
            if (block.index === index)
                return block;
        }
        return undefined;
    }
    createNewTransaction(amount, sender, recipient, log) {
        const newTransaction = new transaction_1.default(amount, sender, recipient);
        newTransaction.settlement(log);
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
    hashBlock(previousBlockHash, currentBlockData, nonce) {
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        const hash = (0, sha256_1.default)(dataAsString);
        return hash;
    }
    // マイニング競争のロジック
    // マシンパワーが強いユーザが強い
    proofOfWork(previousBlockHash, currentBlockData) {
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        // 仮で条件を設定　（0000を超えるまで繰り返す）
        while (hash.substring(0, 4) !== "0000") {
            nonce++;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        }
        return nonce;
    }
}
const kazuto = new user_1.default(1, "Kazuto", "kazukazu@test.com", "password", 200);
const jun = new user_1.default(2, "jun", "junjun@test.com", "password", 100);
const bitcoin = new BlockChain();
bitcoin.createNewBlock(7653, "00KNWRUBWEJWENFOJNWO", "07HDFSKBWESUFBWEIBWIEUFBNW");
bitcoin.createNewBlock(8971, "00HDNFHEWEDGRBCHRNKG", "00HDYENRHFBKDURNFHNE");
bitcoin.createNewBlock(9761, "00JOIRNNOIHWEOUBNEWO", "00NJKRUOQWNOIWHRNOWQ");
bitcoin.printAllBlocks();
// bitcoin.createNewTransaction(1, "ALICEJSJSNWNN", "BOBDKENINOMDO");
// bitcoin.createNewTransaction(10, "ALICEJSJSNWNN", "BOBDKENINOMDO");
bitcoin.createNewBlock(9731, "00JOIRNNOIHWEOUBNEWO", "00NJKRUOQWNOIWHRNOWQ");
helper_function_1.default.getBlockChain(bitcoin);
const bitcoin1 = new BlockChain();
const previousBlockHash = "0AA0IAIJIJUIGGUGUYG";
const nonce = 100;
console.log(bitcoin.hashBlock(previousBlockHash, bitcoin.pendingTransactions, nonce));
const hiDollar = new BlockChain();
hiDollar.createNewBlock(8971, "00HDNFHEWEDGRBCHRNKG", "00HDYENRHFBKDURNFHNE");
hiDollar.createNewBlock(9761, "00JOIRNNOIHWEOUBNEWO", "00NJKRUOQWNOIWHRNOWQ");
hiDollar.createNewTransaction(10, kazuto, jun, hiDollar.log);
hiDollar.createNewTransaction(20, kazuto, jun, hiDollar.log);
hiDollar.createNewTransaction(40, kazuto, jun, hiDollar.log);
hiDollar.createNewTransaction(130, kazuto, jun, hiDollar.log);
// ブロックチェーン一覧
helper_function_1.default.getChain(hiDollar);
// トランザクション一覧
helper_function_1.default.getPendingTransactions(hiDollar);
console.log(hiDollar.proofOfWork("0AA0IAIJIJUIGGUGUYG", hiDollar.pendingTransactions));
// マイニングの流れ
// nonceを求める
// 認証後、blockを作成する
const hash = hiDollar.hashBlock((_a = hiDollar.getBlockLast()) === null || _a === void 0 ? void 0 : _a.getHash(), hiDollar.pendingTransactions, hiDollar.proofOfWork("0AA0IAIJIJUIGGUGUYG", hiDollar.pendingTransactions));
// // マイニング
hiDollar.createNewBlock(hiDollar.proofOfWork("0AA0IAIJIJUIGGUGUYG", hiDollar.pendingTransactions), (_b = hiDollar.getBlockLast()) === null || _b === void 0 ? void 0 : _b.getHash(), hiDollar.hashBlock((_c = hiDollar.getBlockLast()) === null || _c === void 0 ? void 0 : _c.getHash(), hiDollar.pendingTransactions, hiDollar.proofOfWork("0AA0IAIJIJUIGGUGUYG", hiDollar.pendingTransactions)));
// ブロックチェーン一覧
// HelperFunction.getChain(hiDollar);
// トランザクション一覧　output:[]
// HelperFunction.getPendingTransactions(hiDollar);
// kazuto 0 jun 300
console.log(`kazuto coin: ${kazuto.coin}`);
console.log(`jun coin: ${jun.coin}`);
hiDollar.log.print();
