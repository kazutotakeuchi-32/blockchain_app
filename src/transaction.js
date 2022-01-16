"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor(amount, sender, recipient) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
    }
    print() {
        console.log("-------------------------------------------");
        console.log(`取引金額 ${this.amount}`);
        console.log(`送金者: ${this.sender.name}\nコイン残高: ${this.sender.tmpCoin}`);
        console.log(`受金者: ${this.recipient.name}\nコイン残高: ${this.recipient.tmpCoin}`);
        console.log("-------------------------------------------");
    }
    // 取引中
    settlement(log) {
        try {
            if (this.sender.coin - this.amount < 0 ||
                (this.sender.tmpCoin > 0 && this.sender.tmpCoin - this.amount < 0))
                throw new Error("残金が足りません");
            this.sender.tmpCoin =
                this.sender.tmpCoin > 0
                    ? this.sender.tmpCoin - this.amount
                    : this.sender.coin - this.amount;
            this.recipient.tmpCoin =
                this.recipient.tmpCoin > 0
                    ? this.recipient.tmpCoin + this.amount
                    : this.recipient.coin + this.amount;
            log.write(this.format());
        }
        catch (error) {
            const errorMessage = error.message;
            console.warn(errorMessage);
            throw new Error(errorMessage);
        }
    }
    // 取引完了
    // 仮のコインを本来のコインに移動する
    // 仮のコインを0にする
    completion() {
        this.sender.coin = this.sender.tmpCoin;
        this.recipient.coin = this.recipient.tmpCoin;
    }
    format() {
        const output = `-------------------------------------------\n取引金額 ${this.amount}\n送金者: ${this.sender.name}\nコイン残高: ${this.sender.tmpCoin}\n受金者: ${this.recipient.name}\nコイン残高: ${this.recipient.tmpCoin}\n-------------------------------------------`;
        return output;
    }
}
exports.default = Transaction;
