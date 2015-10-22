module.exports = Object.assign(handle, {
  type: 'employee',
  desc: 'employee get 30% off, does not apply on groceries',
  target: 'lineitem'
})

function handle (user, items) {
  if (user.type !== 'employee') return false

  items.forEach(item => {
    if (item.category === 'groceries') return
    item.price = item.price * 0.7
  })

  return true
}
