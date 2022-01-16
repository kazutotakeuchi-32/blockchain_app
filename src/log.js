"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 全体の取引データ管理
class Log {
    constructor() {
        this.log = [];
    }
    write(str) {
        this.log.push(str);
    }
    print() {
        if (this.log.length <= 0)
            return;
        console.log("************ LOG *************");
        for (let i = 0; i < this.log.length; i++) {
            const result = this.log[i];
            console.log(result);
        }
    }
}
exports.default = Log;
