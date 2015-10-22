module.exports = Object.assign(handle, {
  type: 'affiliate',
  desc: 'affiliate user get 10% off, does not apply on groceries',
  target: 'lineitem'
})

function handle (user, items) {
  if (user.type !== 'affiliate') return false

  items.forEach(item => {
    if (item.category === 'groceries') return
    item.price = item.price * 0.9
  })

  return true
}
