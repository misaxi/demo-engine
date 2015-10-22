const glob = require('glob')

module.exports = discount
discount.init = init

const rules = {
  loaded: false,
  lineitem: [],
  total: []
}

// loads the discount rules, needs to be called before using the engine
// (fn) -> null
function init (cb) {
  if (rules.loaded) return cb(Error('discount engine has already initiated ...'))

  glob('rules/*.js', function (err, files) {
    if (err) return cb(err)

    files.forEach(file => {
      const rule = require('./' + file)
      rules[rule.target].push(rule)
    })

    rules.loaded = true
    cb()
  })
}

// apply discounts based on the rules
// (obj, array) -> null
function discount (user, items) {
  itemsDiscount(user, items)
  grandTotalDiscount(items)
}

// apply lineitem rules
// (obj, array) -> null
function itemsDiscount (user, items) {
  for (var i = 0; i < rules.lineitem.length; i++) {
    var handle = rules.lineitem[i]
    var handled = handle(user, items)
    if (handled) break
  }
}

// apply rules based on the grand total
// (obj, array) -> null
function grandTotalDiscount (items) {
  const total = items.reduce((sum, item) => sum += item.price * item.qty, 0)
  const discounts = []

  for (var i = 0; i < rules.total.length; i++) {
    var handle = rules.total[i]
    var discount = handle(total)
    if (discount === 0) continue
    discounts.push(discount)
  }

  discounts.forEach(discount => {
    items.push({ name: handle.type, qty: 1, price: discount })
  })
}
