import { BlockChain as BlockChainType } from "./types/blockchain";
import { Block as BlockType } from "./types/block";
import { Transaction as TransactionType } from "./types/transaction";

class BlockChain implements BlockChainType {
  public chain: Block[];
  public pendingTransactions: TransactionType[];
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
  }

  createNewBlock(nonce: number, previousBlockHash: string, hash: string): Block {
    const newBlock = new Block(
      this.chain.length + 1,
      new Date(),
      this.pendingTransactions,
      nonce,
      hash,
      previousBlockHash
    );

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
  }

  getBlockLast(): BlockType | undefined {
    const index: number = this.chain.length;
    return this.chain[index - 1];
  }

  getBlockByFirst(): BlockType | undefined {
    return this.chain.length > 1 ? this.chain[0] : undefined;
  }

  createNewTransaction(
    amount: number,
    sender: string,
    recipient: string
  ): TransactionType {
    const newTransaction = new Transaction(amount, sender, recipient);
    this.pendingTransactions.push(newTransaction);
    return newTransaction;
  }

  printAllBlocks(): void {
    if (this.chain.length <= 0) return;
    for (let i = 0; i < this.chain.length; i++) {
      const block = this.chain[i];
      block.print();
    }
  }
}

class Block implements BlockType {
  public index: number;
  public timestamp: Date;
  public transactions: any;
  public nonce: number;
  public hash: string;
  public previousBlockHash: any;

  constructor(
    index: number,
    timestamp: Date,
    transactions: any,
    nonce: number,
    hash: string,
    previousBlockHash: any
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
}

class Transaction implements TransactionType {
  public amount: number;
  public sender: string;
  public recipient: string;
  constructor(amount: number, sender: string, recipient: string) {
    this.amount = amount;
    this.sender = sender;
    this.recipient = recipient;
  }
}

const bitcoin = new BlockChain();
bitcoin.createNewBlock(
  7653,
  "00KNWRUBWEJWENFOJNWO",
  "07HDFSKBWESUFBWEIBWIEUFBNW"
);
bitcoin.createNewBlock(8971, "00HDNFHEWEDGRBCHRNKG", "00HDYENRHFBKDURNFHNE");
bitcoin.createNewBlock(9761, "00JOIRNNOIHWEOUBNEWO", "00NJKRUOQWNOIWHRNOWQ");
bitcoin.printAllBlocks();
// console.log(bitcoin.getBlockByFirst());
// console.log(bitcoin.getBlockLast());
// const first = bitcoin.getBlockByFirst();

// first?.print();
