This is a fork of [Teamwork](https://www.npmjs.com/package/teamwork).


## Usage

```js
const Barrier = require('cb-barrier');

const main = async () => {
  const barrier = new Barrier();

  setTimeout(() => {
    barrier.pass();
  }, 100);

  await barrier;
};
```

### Pass limits

You can specify a number in the constructor for the number of times a barrier should be passed before it resolves.

```js
const Barrier = require('cb-barrier');

const main = async () => {
  const barrier = new Barrier(2);

  setTimeout(() => {
    barrier.pass();
    barrier.pass();
  }, 100);

  await barrier;
};
```


### Providing return values

```js
const Barrier = require('cb-barrier');

const main = async () => {
  const barrier = new Barrier();

  setTimeout(() => {
    barrier.pass('result');
  }, 100);

  // value equals 'result'
  const value = await barrier;
};
```

### Providing an error

If you provide an Error to the `pass` function then the resulting promise will reject.

```js
const Barrier = require('cb-barrier');

const main = () => {
  const barrier = new Barrier();

  setTimeout(() => {
    barrier.pass(new Error('my error'));
  }, 100);

  // the calling function will get a rejection
  return barrier;
};
```
