module.exports = Object.assign(handle, {
  type: 'employee',
  desc: 'employee get 30% off, does not apply on groceries',
  target: 'lineitem'
})

function handle (user, item) {
  if (user.type !== 'employee') return false
  if (item.category === 'groceries') return false

  item.price = item.price * 0.7
  return true
}
