import is from '../is';

export default (...funcs) => (...others) => {
  funcs.filter(is.func)
    .reduce((_, next) => {
      next(...others)
    }, () => {})
}