const test = require('tape')
const handle = require('../../rules/fiveOver100')

test('total of $240 should have $10 discount', (t) => {
  t.plan(1)

  const actual = handle(240)
  t.equal(-10, actual)
})

test('total of $20 should have $0 discount', (t) => {
  t.plan(1)

  const actual = handle(20)
  t.equal(0, actual)
})
