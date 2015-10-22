## project structure
```
discount.js # the discount engine
rules\      # all the discount rules
tests\      # all the tests
```

before using the discount engine, `init` function needs to be called. it registers the rules sitting in the rules folder.

```js
discount.init((err) => {
  if (err) return console.error('failed to load the engine...', err)
  discount(user, items)
})
```

there two types of rules, one is for lineitem, the other is for grand total.
the lineitem rules are mutually exclusive.
where the total rules can be aggregated.

## get up and running
- install nodejs version 4
- install dependencies, go to the project folder and run

  ```
  $ npm install
  ```
- run the tests

  ```
  $ npm test
  ```
- run the tests with coverage report

  ```
  $ npm run cover
  ```

  to view the coverage report, open `coverage/lcov-report/index.html`.

  a sample stdout of `npm run cover`
  ```
  > demo-engine@1.0.0 cover /Users/misaxi/projects/demo-engine
  > NODE_ENV=test istanbul cover node_modules/argg tests/*Test.js

  =============================================================================
  Writing coverage object [/Users/misaxi/projects/demo-engine/coverage/coverage.json]
  Writing coverage reports at [/Users/misaxi/projects/demo-engine/coverage]
  =============================================================================

  =============================== Coverage summary ===============================
  Statements   : 98.57% ( 69/70 )
  Branches     : 95.45% ( 21/22 )
  Functions    : 100% ( 10/10 )
  Lines        : 100% ( 58/58 )
  ================================================================================

  1..30
  # tests 30
  # pass  30

  # ok
  ```
