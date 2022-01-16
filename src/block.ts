import { Block as BlockType } from "../types/block";
class Block implements BlockType {
  public index: number;
  public timestamp: Date;
  public transactions: any;
  public nonce: number;
  public hash: string;
  public previousBlockHash: string;

  constructor(
    index: number,
    timestamp: Date,
    transactions: any,
    nonce: number,
    hash: string,
    previousBlockHash: string
  ) {
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

  getHash(): string {
    return this.hash;
  }
}

export default Block;

