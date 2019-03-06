import is from '../is';

export default timeout => (target, key, descriptor) => {
  const oldFunc = descriptor.value;

  if (!key || !descriptor) {
    throw new SyntaxError('Only functions can be decorated');
  }
  if (!is.func(oldFunc)) {
    throw new SyntaxError('Only functions can be debounced');
  }

  let called = false;

  descriptor.value = (...args) => {
    if (!called) {
      oldFunc.apply(this, args);
      lastargs = null;
      called = true;

      setTimeout(() => {
        called = false;
        if (lastargs) {
          oldFunc.apply(this, args);
        }
      }, timeout);
    }
  };

  return descriptor;
}