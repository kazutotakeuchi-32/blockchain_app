import { Transaction } from "../types/transaction";
import { Log as LogType } from "../types/log";
// 全体の取引データ管理

class Log implements LogType {
  public log: [Transaction[]];
  constructor() {
    this.log = [[]];
  }
  write(transaction: Transaction[]): void {
    this.log.push(transaction);
  }
  print(): void {
    if (this.log.length <= 0) return;
    for (let i = 0; i < this.log.length; i++) {
      const trnsactions = this.log[i];
      for (let j = 0; j < trnsactions.length; j++) {
        const transaction = trnsactions[j];
        transaction.print();
      }
    }
  }
}

export default Log;
