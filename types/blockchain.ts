import { Block } from "./block";
import { Transaction } from "./transaction";
export interface BlockChain {
  chain: Block[];
  pendingTransactions: Transaction[];
  createNewBlock(nonce: number, previousBlockHash: string, hash: string): Block;
  createNewTransaction(
    amount: number,
    sender: string,
    recipient: string
  ): Transaction;
  getBlockLast(): Block | undefined;
  printAllBlocks(): void;
  findBlockByHash(hash: string): Block | undefined;
  findBlockByIndex(index: number): Block | undefined;
  hashBlock(
    previousBlockHash: string,
    currentBlockData: Transaction[] | Transaction,
    nonce: number
  ): string;
  proofOfWork(
    previousBlockHash: string,
    currentBlockData: Transaction[] | Transaction
  ): number;
}
