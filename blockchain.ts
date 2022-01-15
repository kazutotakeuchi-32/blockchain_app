import { BlockChain as BlockChainType } from "./types/blockchain";
import { Block as BlockType } from "./types/block";
import { Transaction as TransactionType } from "./types/transaction";
import sha256 from "sha256";

class BlockChain implements BlockChainType {
  public chain: Block[];
  public pendingTransactions: TransactionType[];
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
  }

  createNewBlock(
    nonce: number,
    previousBlockHash: string,
    hash: string
  ): Block {
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

  findBlockByHash(hash: string): BlockType | undefined {
    for (let i = 0; i < this.chain.length; i++) {
      const block = this.chain[i];
      if (block.hash === hash) return block;
    }
    return undefined;
  }

  findBlockByIndex(index: number): BlockType | undefined {
    for (let i = 0; i < this.chain.length; i++) {
      const block = this.chain[i];
      if (block.index === index) return block;
    }
    return undefined;
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
  hashBlock(
    previousBlockHash: string,
    currentBlockData: TransactionType[] | TransactionType,
    nonce: number
  ): string {
    const dataAsString =
      previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
  }

  // マイニング競争のロジック
  // マシンパワーが強いユーザが強い
  proofOfWork(
    previousBlockHash: string,
    currentBlockData: TransactionType[] | TransactionType
  ): number {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== "0000") {
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    return nonce;
  }
}

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
  print() {
    console.log("-------------------------------------------");
    console.log(`Amount: ${this.amount}`);
    console.log(`Sender: ${this.sender}`);
    console.log(`Recipient: ${this.recipient}`);
    console.log("-------------------------------------------");
  }
}

class HelperFunction {
  public static getBlockChain(blockChain: BlockChainType | undefined): void {
    if (blockChain === undefined) return;
    console.log(blockChain);
  }
  public static getChain(blockChain: BlockChainType): void {
    if (blockChain === undefined) return;
    console.log(blockChain.chain);
  }
  public static getPendingTransactions(blockChain: BlockChainType): void {
    if (blockChain === undefined) return;
    console.log(blockChain.pendingTransactions);
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
bitcoin.createNewTransaction(1, "ALICEJSJSNWNN", "BOBDKENINOMDO");
bitcoin.createNewTransaction(10, "ALICEJSJSNWNN", "BOBDKENINOMDO");

bitcoin.createNewBlock(9731, "00JOIRNNOIHWEOUBNEWO", "00NJKRUOQWNOIWHRNOWQ");

HelperFunction.getBlockChain(bitcoin);

const bitcoin1 = new BlockChain();
const previousBlockHash = "0AA0IAIJIJUIGGUGUYG";
const nonce = 100;
console.log(
  bitcoin.hashBlock(previousBlockHash, bitcoin.pendingTransactions, nonce)
);

const hiDollar = new BlockChain();
hiDollar.createNewBlock(8971, "00HDNFHEWEDGRBCHRNKG", "00HDYENRHFBKDURNFHNE");
hiDollar.createNewBlock(9761, "00JOIRNNOIHWEOUBNEWO", "00NJKRUOQWNOIWHRNOWQ");
hiDollar.createNewTransaction(1, "ALICEJSJSNWNN", "BOBDKENINOMDO");
hiDollar.createNewTransaction(20, "ALICEJSJSNWNN", "BOBDKENINOMDO");
hiDollar.createNewTransaction(40, "ALICEJSJSNWNN", "BOBDKENINOMDO");
hiDollar.createNewTransaction(200, "ALICEJSJSNWNN", "BOBDKENINOMDO");
// ブロックチェーン一覧
HelperFunction.getChain(hiDollar);
// トランザクション一覧
HelperFunction.getPendingTransactions(hiDollar);
console.log(
  hiDollar.proofOfWork("0AA0IAIJIJUIGGUGUYG", hiDollar.pendingTransactions)
);
console.log(
  hiDollar
    .hashBlock(
      "0AA0IAIJIJUIGGUGUYG",
      hiDollar.pendingTransactions,
      hiDollar.proofOfWork("0AA0IAIJIJUIGGUGUYG", hiDollar.pendingTransactions)
    )
    .substring(0, 4)
);
