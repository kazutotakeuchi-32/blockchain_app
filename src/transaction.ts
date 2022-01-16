import { Transaction as TransactionType } from "../types/transaction";

class Transaction implements TransactionType {
  public amount: number;
  public sender: string;
  public recipient: string;
  constructor(amount: number, sender: string, recipient: string) {
    this.amount = amount;
    this.sender = sender;
    this.recipient = recipient;
  }
  print() {
    console.log("-------------------------------------------");
    console.log(`Amount: ${this.amount}`);
    console.log(`Sender: ${this.sender}`);
    console.log(`Recipient: ${this.recipient}`);
    console.log("-------------------------------------------");
  }
}

export default Transaction;
