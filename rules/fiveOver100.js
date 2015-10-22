module.exports = Object.assign(handle, {
  type: 'fiveOver100',
  desc: 'get $5 off for every $100',
  target: 'total'
})

function handle (total) {
  return Math.floor(total / 100) * -5
}
