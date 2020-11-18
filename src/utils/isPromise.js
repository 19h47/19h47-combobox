/**
 * Returns true if the value acts like a Promise, i.e. has a "then" function,
 * otherwise returns false.
 *
 * @see https://github.com/graphql/graphql-js/blob/master/src/jsutils/isPromise.js
 */
const isPromise = value => 'function' === typeof value?.then;

export default isPromise;
