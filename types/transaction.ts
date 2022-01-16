import Log from "../src/log";
import { User } from "./user";

export interface Transaction {
  amount: number;
  sender: User;
  recipient: User;
  print(): void;
  settlement(log: Log): void;
  completion(): void;
  format(): string
}
