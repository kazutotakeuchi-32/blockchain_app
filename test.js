"use strict";
const getType = (type) => {
    switch (typeof type) {
        case PrimitiveType.STRING:
            return PrimitiveType.STRING;
        case PrimitiveType.NUMBER:
            return PrimitiveType.NUMBER;
        case PrimitiveType.BOOLEAN:
            return PrimitiveType.BOOLEAN;
        case PrimitiveType.OBJECT:
            return PrimitiveType.OBJECT;
        case PrimitiveType.FUNCTION:
            return PrimitiveType.FUNCTION;
        case PrimitiveType.UNDEFINED:
            return PrimitiveType.UNDEFINED;
        default:
            break;
    }
};
var PrimitiveType;
(function (PrimitiveType) {
    PrimitiveType["STRING"] = "string";
    PrimitiveType["NUMBER"] = "number";
    PrimitiveType["BOOLEAN"] = "boolean";
    PrimitiveType["OBJECT"] = "object";
    PrimitiveType["ARRAY"] = "object";
    PrimitiveType["FUNCTION"] = "function";
    PrimitiveType["UNDEFINED"] = "undefined";
    PrimitiveType["NULL"] = "null";
})(PrimitiveType || (PrimitiveType = {}));
console.log(getType(1));
console.log(getType(false));
console.log(getType("1"));
console.log(getType({}));
console.log(getType(() => { }));
console.log(getType(undefined));
console.log(getType(null));
console.log(getType([]));
