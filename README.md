# Jest tests workshop

- Why do we test things?
- What types of tests can you think of?

## Unit tests

- Test small things (functions, components, classes)
- Definition of what constitutes a "unit" is somewhat arbitrary
- Generally test things in isolation
- Often very coupled to the implementation / how code was written
- Often quick to write, and run

## When to write unit tests

- When testing manually could be painful (e.g. time-based code)
- When you know the code will be reused in a lot of places (e.g. a library)
- When the code’s logic is complex / hard to understand, and you want to make sure future developers will understand it (e.g. formatting a date)
- When he code’s logic is complex / hard to understand, and you want to make sure you understand it

### Best practices for writing tests

- Start with things that are easy to test automatically, hard to test manually
  - Formatting dates or numbers
  - All things math
- Try to write tests that do not rely on implementation details.
- Refactor your code to make it easier to test. It’ll also be easier to understand
  - Clear dependencies, input -> output
- Always check your tests are actually working, by making them fail
- Make sure tests run in CI
- Use the coverage to inform your decisions

## What is Jest

https://jestjs.io/

- JS testing history: QUnit, Jasmine, Mocha, Chai
- Istanbul, Babel

https://github.com/smooth-code/jest-puppeteer
https://github.com/americanexpress/jest-image-snapshot
https://github.com/nickcolley/jest-axe
https://airbnb.io/enzyme/
https://github.com/jest-community/vscode-jest

## Workshop

### How to run tests

```sh
npm run test
npx react-scripts test
npx jest
npm run test:coverage
npm run test:watch
npx jest --coverage
npx jest --watch
```

Also running in CI

Coverage

https://codecov.io/gh/wagtail/wagtail
https://coveralls.io/github/springload/draftail

### Writing tests for JS code

Fizzbuzz

### Writing tests for DOM code

### Writing tests for React components

Without Enzyme

With Enzyme

With snapshots

### Debugging tests