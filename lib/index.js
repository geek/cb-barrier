'use strict';

module.exports = class Barrier {
  constructor (count = 1) {
    const promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });

    this._count = count;
    this._passes = [];
    promise.pass = this.pass.bind(this);
    return promise;
  }

  pass (value) {
    if (value instanceof Error) {
      return this._reject(value);
    }

    this._passes.push(value);

    if (--this._count) {
      return;
    }

    return this._resolve(this._passes.length === 1 ? this._passes[0] : this._passes);
  }
};
