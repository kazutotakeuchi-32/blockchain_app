export interface Log {
  log: string[];
  write(str: string): void;
  print(): void;
}
