const test = require('tape')
const handle = require('../rules/customer2years')

test('discount should be applied', (t) => {
  t.plan(2)

  const price = 500
  const user = { createdTime: yearsFromNow(-3) }
  const item = [{
    name: 'Dyson 360 Eye',
    category: 'electronic',
    price: price
  }]

  const applied = handle(user, item)

  t.true(applied)
  t.equal(price * 0.95, item[0].price)
})

test('discount should not be applied for user less than 2 years', (t) => {
  t.plan(2)

  const price = 500
  const user = { createdTime: yearsFromNow(-1) }
  const item = [{
    name: 'Dyson 360 Eye',
    category: 'electronic',
    price: price
  }]

  const applied = handle(user, item)

  t.false(applied)
  t.equal(price, item[0].price)
})

test('discount should not be applied for non normal user', (t) => {
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
  const user = { createdTime: yearsFromNow(-3) }
  const item = [{
    name: 'Timtam Original',
    category: 'groceries',
    price: price
  }]

  const applied = handle(user, item)

  t.true(applied)
  t.equal(price, item[0].price)
})

function yearsFromNow (years) {
  const yearNow = new Date().getFullYear()
  const createdTime = new Date(new Date().setFullYear(yearNow + years))
  return createdTime
}
