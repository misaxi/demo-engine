module.exports = Object.assign(handle, {
  type: 'affiliate',
  desc: 'affiliate user get 10% off, does not apply on groceries',
  target: 'lineitem'
})

function handle (user, item) {
  if (user.type !== 'affiliate') return false
  if (item.category === 'groceries') return false

  item.price = item.price * 0.9
  return true
}
