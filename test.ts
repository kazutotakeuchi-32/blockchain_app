const getType = <T>(type: T): PrimitiveType | undefined => {
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

enum PrimitiveType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  OBJECT = "object",
  ARRAY = "object",
  FUNCTION = "function",
  UNDEFINED = "undefined",
  NULL = "null",
}

console.log(getType<Number>(1));
console.log(getType<Boolean>(false));
console.log(getType<String>("1"));
console.log(getType<Object>({}));
console.log(getType<Function>(() => {}));
console.log(getType<undefined>(undefined));
console.log(getType<null>(null));
console.log(getType<[]>([]));
