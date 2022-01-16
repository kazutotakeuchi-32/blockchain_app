import Transaction from "../src/transaction";

export interface Log {
  log:[ Transaction[]]
  write(transaction: Transaction[]): void
  print(): void
}

