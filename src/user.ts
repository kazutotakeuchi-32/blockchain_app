import sha256 from "sha256";
import { User as UserType } from "../types/user";

class User implements UserType {
  public readonly id: number;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public coin: number;
  public tmpCoin: number;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    coin: number
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.coin = coin;
    this.tmpCoin = 0;
  }

  hash(): string {
    const data = `${this.id}${this.name}${this.email}${this.password}`;
    const hash = sha256(data);
    return hash;
  }
}

const kazuto = new User(1, "Kazuto", "kazukazu@test.com", "password", 200);
const jun = new User(1, "jun", "junjun@test.com", "password", 100);

export default User;
