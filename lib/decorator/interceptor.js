export default (before, after) => (target, key, descriptor) => {
  const oldFunc = descriptor.value;

  if (!key || !descriptor) {
    throw new SyntaxError('Only functions can be decorated');
  }
  if (!is.func(oldFunc)) {
    throw new SyntaxError('Only functions can be intercepted');
  }

  descriptor.value = (...args) => {
    before.apply(this, ...args);

    const result = oldFunc.apply(this, ...args);

    after.call(this, result);
  }

  return descriptor;
}