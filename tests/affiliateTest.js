const test = require('tape')
const handle = require('../rules/affiliate')

test('discount should be applied', (t) => {
  t.plan(2)

  const price = 500
  const user = { type: 'affiliate' }
  const item = [{
    name: 'Dyson 360 Eye',
    category: 'electronic',
    price: price
  }]

  const applied = handle(user, item)

  t.true(applied)
  t.equal(price * 0.9, item[0].price)
})

test('discount should not be applied for non affiliate user', (t) => {
  t.plan(2)

  const price = 500
  const user = { type: 'employee' }
  const item = [{
    name: 'Dyson 360 Eye',
    category: 'electronic',
    price: price
  }]

  const applied = handle(user, item)

  t.false(applied)
  t.equal(price, item[0].price)
})

test('discount should not be applied for groceries item', (t) => {
  t.plan(2)

  const price = 4
  const user = { type: 'affiliate' }
  const item = [{
    name: 'Timtam Original',
    category: 'groceries',
    price: price
  }]

  const applied = handle(user, item)

  t.true(applied)
  t.equal(price, item[0].price)
})
