'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Barrier = require('..');


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;


it('resolves the promise when a barrier is passed', async () => {
  const barrier = new Barrier();

  setTimeout(() => {
    barrier.pass();
  }, 100);

  await barrier;
});

it('resolve when all barriers are passed', async () => {
  const barrier = new Barrier(2);

  let count = '';
  setTimeout(() => {
    count += '1';
    barrier.pass();
  }, 100);

  setTimeout(() => {
    count += '2';
    barrier.pass();
  }, 150);

  await barrier;
  expect(count).to.equal('12');
});

it('resolve with a note', async () => {
  const barrier = new Barrier();

  setTimeout(() => {
    barrier.pass('1');
  }, 100);

  const value = await barrier;
  expect(value).to.equal('1');
});

it('resolve with values', async () => {
  const barrier = new Barrier(2);

  setTimeout(() => {
    barrier.pass('1');
  }, 100);

  setTimeout(() => {
    barrier.pass('2');
  }, 150);

  const values = await barrier;
  expect(values).to.equal(['1', '2']);
});

it('rejects on first error', async () => {
  const barrier = new Barrier(2);

  setTimeout(() => {
    barrier.pass(new Error('boom'));
  }, 100);

  setTimeout(() => {
    barrier.pass('2');
  }, 150);

  await expect(barrier).to.reject('boom');
});
