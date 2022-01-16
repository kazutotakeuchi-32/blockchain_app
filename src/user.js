"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sha256_1 = __importDefault(require("sha256"));
class User {
    constructor(id, name, email, password, coin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.coin = coin;
        this.tmpCoin = 0;
    }
    hash() {
        const data = `${this.id}${this.name}${this.email}${this.password}`;
        const hash = (0, sha256_1.default)(data);
        return hash;
    }
}
const kazuto = new User(1, "Kazuto", "kazukazu@test.com", "password", 200);
const jun = new User(1, "jun", "junjun@test.com", "password", 100);
exports.default = User;
