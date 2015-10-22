const test = require('tape')
const discount = require('../discount')

const all = {
  user: { type: 'employee' },
  items: [
    { name: 'Dyson 360 Eye', qty: 2, category: 'electronic', price: 500 },
    { name: 'Timtam Original', qty: 2, category: 'groceries', price: 4 }
  ],
  expectedPrice: [
    500 * 2 * 0.7,
    4 * 2,
    Math.floor(((500 * 2 * 0.7) + (4 * 2)) / 100) * -5
  ]
}

const groceriesOnlylt100 = {
  user: { type: 'employee' },
  items: [
    { name: 'Timtam Original', qty: 2, category: 'groceries', price: 4 }
  ],
  expectedPrice: [ 4 * 2 ]
}

test('init discount without error', (t) => {
  discount.init(err => {
    t.plan(1)
    t.error(err, 'no error during init')

    test(`employee order with non-groceries/groceries items, and price >= 100`, (t) => {
      t.plan(4)
      discount(all.user, all.items)
      t.equal(all.items.length, 3, '3 items after apply the rules')
      all.expectedPrice.forEach((expected, i) => {
        const item = all.items[i]
        t.equal(item.price * item.qty, expected, 'price should be calculated correctly')
      })
    })

    test(`employee order with groceries items only, and total < 100`, (t) => {
      t.plan(2)
      discount(groceriesOnlylt100.user, groceriesOnlylt100.items)
      t.equal(groceriesOnlylt100.items.length, 1, '1 item after apply the rules')
      groceriesOnlylt100.expectedPrice.forEach((expected, i) => {
        const item = groceriesOnlylt100.items[i]
        t.equal(item.price * item.qty, expected, 'price should be calculated correctly')
      })
    })

    test(`reload engine again should return error`, (t) => {
      discount.init(err => {
        t.plan(1)
        t.true(err != null)
      })
    })
  })
})
