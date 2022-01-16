import { Log as LogType } from "../types/log";
// 全体の取引データ管理

class Log implements LogType {
  public log: string[];
  constructor() {
    this.log = [];
  }
  write(str: string): void {
    this.log.push(str);
  }
  print(): void {
    if (this.log.length <= 0) return;
    console.log("************ LOG *************");
    for (let i = 0; i < this.log.length; i++) {
      const result = this.log[i];
      console.log(result);
    }
  }
}

export default Log;
