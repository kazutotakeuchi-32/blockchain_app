export interface User {
  id: number
  name: string
  email: string
  password: string
  coin: number
  tmpCoin: number
  hash(): string
}