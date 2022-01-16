import { User } from "./user";

export interface Transaction {
  amount: number;
  sender: User;
  recipient: User;
  print(): void;
  settlement(): void;
  completion(): void;
}
