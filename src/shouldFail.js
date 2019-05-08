const { expect } = require('chai');
const colors = require('ansi-colors');
const semver = require('semver');

async function shouldFailWithMessage (promise, message) {
  try {
    await promise;
  } catch (error) {
    if (message) {
      expect(error.message).to.include(message, `Wrong failure type, expected '${message}'`);
    } else {
      expect.fail('Message not provided');
    }
    return;
  }

  expect.fail('Expected failure not received');
}

async function reverting (promise) {
  await shouldFailWithMessage(promise, 'revert');
}

async function throwing (promise) {
  await shouldFailWithMessage(promise, 'invalid opcode');
}

async function outOfGas (promise) {
  await shouldFailWithMessage(promise, 'out of gas');
}

async function shouldFail (promise) {
  try {
    await promise;
  } catch (error) {
    return;
  }
  expect.fail('Failure not received');
}

async function withMessage (promise, message) {
  // qtum does not support revert reason yet
  // warn('revert reason checking only supported on Ganache>=2.2.0');
  return shouldFail(promise);
}

shouldFail.reverting = reverting;
shouldFail.reverting.withMessage = withMessage;
shouldFail.throwing = throwing;
shouldFail.outOfGas = outOfGas;

module.exports = shouldFail;
