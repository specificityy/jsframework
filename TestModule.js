/*********************************************************************************************
** Test module with test definition methods: describe, it | assertion methods: expect, toBe **
**********************************************************************************************/

const Tests = (function() {
  const testList = [];

  return {
    add: add,
    run: run,

    describe: describe,
    expect: expect,
    it: it
  }

  function add(test) {
    testList.push(test);
  }

  function run() {
    testList.forEach(test => typeof test === 'function' && test());
  }

  function describe(msg, callback) {
    console.group(`%c${msg}`, 'color:midnightblue;');
    callback();
    console.groupEnd(msg);
  }

  function it(msg, callback) {
    let color = 'limegreen';
    let logger = console.log;
    try {
      callback();
    } catch(e) {
      color = 'crimson';
      msg += '. ' + e;
      logger = console.trace;
    }

    logger(`%c${msg}`, `color:${color}`);
  }

  function expect(actual) {
    return {
      toBe: toBe
    }

    function toBe(expected) {
      if (actual !== expected)
        throw new Error(`expected ${actual} to be ${expected}`);
    }
  }

})();
