import { Block } from "./block";
import { Log } from "./log";
import { Transaction } from "./transaction";
import { User } from "./user";
export interface BlockChain {
  log: Log;
  chain: Block[];
  pendingTransactions: Transaction[];
  createNewBlock(nonce: number, previousBlockHash: string, hash: string): Block;
  createNewTransaction(
    amount: number,
    sender: User,
    recipient: User,
    log: Log
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
