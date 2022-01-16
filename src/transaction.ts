import { Transaction as TransactionType } from "../types/transaction";
import Log from "./log";
import User from "./user";

class Transaction implements TransactionType {
  public amount: number;
  public sender: User;
  public recipient: User;
  constructor(amount: number, sender: User, recipient: User) {
    this.amount = amount;
    this.sender = sender;
    this.recipient = recipient;
  }
  print() {
    console.log("-------------------------------------------");
    console.log(`取引金額 ${this.amount}`);
    console.log(
      `送金者: ${this.sender.name}\nコイン残高: ${this.sender.tmpCoin}`
    );
    console.log(
      `受金者: ${this.recipient.name}\nコイン残高: ${this.recipient.tmpCoin}`
    );
    console.log("-------------------------------------------");
  }
  // 取引中
  settlement(log: Log) {
    try {
      if (
        this.sender.coin - this.amount < 0 ||
        (this.sender.tmpCoin > 0 && this.sender.tmpCoin - this.amount < 0)
      )
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
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.warn(errorMessage);
      throw new Error(errorMessage);
    }
  }
  // 取引完了
  // 仮のコインを本来のコインに移動する
  // 仮のコインを0にする
  completion(): void {
    this.sender.coin = this.sender.tmpCoin;
    this.recipient.coin = this.recipient.tmpCoin;
  }

  format(): string {
    const output = `-------------------------------------------\n取引金額 ${this.amount}\n送金者: ${this.sender.name}\nコイン残高: ${this.sender.tmpCoin}\n受金者: ${this.recipient.name}\nコイン残高: ${this.recipient.tmpCoin}\n-------------------------------------------`;
    return output;
  }
}

export default Transaction;
