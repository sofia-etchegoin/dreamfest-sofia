# Kata: Types, functions and modules

This challenge is designed to practice familiarity with types, functions, and modules.


## Install

Clone this repo, then:

  ```shell
  cd kata-types-modules
  npm install
  ```


## Understanding the challenge

Run the first test using `npm test getBoolean`. Feel free to have a look in `package.json` to see what the `test` script is doing.

You should get an error saying something about '`getBoolean` is not a function'. This is because `types.js`, the file the test is importing/requiring, isn't exporting a `getBoolean` function.

In order for the tests to test the functions, you need to _export_ each function the tests are expecting. This is often done by exporting an object that contains the functions as properties. This is an example:

```js
// sample.js
module.exports = {
  doWork: doWork
}

function doWork () {
  return 'work'
}
```

As you can see from the `tests` directory, we have tests for `types` and `functions`. The tests in these folders map to the `types.js` and `functions.js` files in the root folder. To complete this challenge, you will write the functions and export them from either `types.js` or `functions.js` depending on the test you're making pass.


## Common functions for arrays

The last three tests walk you through implementing 3 common functions we use on arrays:

1. [`Array.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
2. [`Array.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
3. [`Array.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

You will implement simplified versions of these functions. Normally we'd just use the versions that JavaScript provides, but it's good to understand how they work.


## Clean up

To run all of the tests for all of the functions you've written and exported, in terminal run:

```
npm test tests
```

This will run all tests in the `tests` directory.

Once you have all the tests passing, read your code through carefully and ensure you understand how it all works. Can you refactor any of your code (for example, any duplication)?


## Resources

* [JavaScript data types and data structures](https://developer.mozilla.org/en/docs/Web/JavaScript/Data_structures)
