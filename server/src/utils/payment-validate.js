import isStringType from './is-string-type.js';

export default function validatePayment(name) {
  isStringType(name);
}
