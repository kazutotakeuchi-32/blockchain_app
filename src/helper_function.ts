import { BlockChain } from "../types/blockchain";

class HelperFunction {
  public static getBlockChain(blockChain: BlockChain | undefined): void {
    if (blockChain === undefined) return;
    console.log(blockChain);
  }
  public static getChain(blockChain: BlockChain): void {
    if (blockChain === undefined) return;
    console.log(blockChain.chain);
  }
  public static getPendingTransactions(blockChain: BlockChain): void {
    if (blockChain === undefined) return;
    console.log(blockChain.pendingTransactions);
  }
}

export default HelperFunction