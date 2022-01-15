import { Block } from "./block";
import { Transaction } from "./transaction";
export interface BlockChain {
  chain: Block[];
  pendingTransactions: any;
  createNewBlock(nonce: number, previousBlockHash: string, hash: string): Block;
  createNewTransaction(amount: number, sender: string, recipient: string): Transaction
  getBlockLast(): Block | undefined;
}
