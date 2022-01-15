export interface Block {
  index: number;
  timestamp: Date;
  transactions: any;
  nonce: number;
  hash: string;
  print(): void
}