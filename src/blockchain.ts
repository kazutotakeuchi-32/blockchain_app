import { BlockChain as BlockChainType } from "../types/blockchain";
import { Block as BlockType } from "../types/block";
import Block from "./block";
import { Transaction as TransactionType } from "../types/transaction";
import Transaction from "./transaction";
import HelperFunction from "./helper_function";
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
    this.pendingTransactions = [];
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

// マイニングの流れ
// nonceを求める
// 認証後、blockを作成する

const hash = hiDollar.hashBlock(
  hiDollar.getBlockLast()?.getHash() as string,
  hiDollar.pendingTransactions,
  hiDollar.proofOfWork("0AA0IAIJIJUIGGUGUYG", hiDollar.pendingTransactions)
);

// マイニング
hiDollar.createNewBlock(
  hiDollar.proofOfWork("0AA0IAIJIJUIGGUGUYG", hiDollar.pendingTransactions),
  hiDollar.getBlockLast()?.getHash() as string,
  hiDollar.hashBlock(
    hiDollar.getBlockLast()?.getHash() as string,
    hiDollar.pendingTransactions,
    hiDollar.proofOfWork("0AA0IAIJIJUIGGUGUYG", hiDollar.pendingTransactions)
  )
);

// ブロックチェーン一覧
HelperFunction.getChain(hiDollar);
// トランザクション一覧　output:[]
HelperFunction.getPendingTransactions(hiDollar);