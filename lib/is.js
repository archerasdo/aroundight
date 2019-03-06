const ValueType = {
  STRING: '[object String]',
  NUMBER: '[object Number]',
  ARRAY: '[object Array]',
  BOOLEAN: '[object Boolean]',
  FUNCTION: '[object Function]',
  GENERATOR_FUNCTION: '[object GeneratorFunction]',
  ASYNC_FUNCTION: '[object AsyncFunction]',
  OBJECT: '[object Object]',
  UNDEFINED: 'undefined',
  SYMBOL: '[object Symbol]',
  DATE: '[object Date]'
}

const objProto = Object.prototype;
const toStr = v => objProto.toString.call(v);
const checkType = (value, tendType) => {
  if (is.arr(tendType)) {
    return tendType.includes(toStr(value));
  } else {
    return toStr(value) === tendType;
  }
}

const is = {
  defined: v => typeof v !==  ValueType.UNDEFINED,
  undef: v => typeof v === ValueType.UNDEFINED,
  obj: v => checkType(v, ValueType.OBJECT),
  arr: Array.isArray,
  func: v => checkType(v, [ValueType.FUNCTION, ValueType.GENERATOR_FUNCTION, ValueType.ASYNC_FUNCTION]),
  str: v => checkType(v, ValueType.STRING),
  date: v => checkType(v, ValueType.DATE),
  element: v => v !== undefined && typeof HTMLElement !== 'undefined' && v instanceof HTMLElement && v.nodeType === 1,
  bool: v => checkType(v, ValueType.BOOLEAN),
  symbol: v => checkType(v, ValueType.SYMBOL),
  nan: Number.isNaN,
  null: v => v === null,
  emptyObj: v => is.obj(v) && Object.keys(v).length <= 0,
  emptyArr: v => is.arr(v) && v.length <= 0,
  emptyString: v => is.str(v) && v === '',
  equals: (last, next) => {
    if (is.arr(last) && is.arr(next)) {
      return JSON.stringify([...last].sort()) === JSON.stringify([...next].sort())
    } else if (is.obj(last) && is.obj(next)) {
      return JSON.stringify(last) === JSON.stringify(next)
    }

    return last === next
  }
}

export default is;