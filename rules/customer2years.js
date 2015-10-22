module.exports = Object.assign(handle, {
  type: 'customer2years',
  desc: `customer registered for more than 2 years get 5% off,
    does not apply on groceries`,
  target: 'lineitem'
})

function handle (user, item) {
  if (user.type != null) return false
  if (item.category === 'groceries') return false
  if (registeredLessThan2Years(user)) return false

  item.price = item.price * 0.95
  return true
}

function registeredLessThan2Years (user) {
  const createdTime = new Date(user.createdTime)
  createdTime.setFullYear(createdTime.getFullYear() + 2)
  const now = new Date()
  return createdTime > now
}
