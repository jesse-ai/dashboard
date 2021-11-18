import helpers from '@/helpers'


test('test helpers.currentTime()', () => {
  expect(helpers.currentTime())
    .toBe(new Date().toISOString().slice(11, 19))
})

test('test helpers.timestampToTime()', () => {
  expect(helpers.timestampToTime(1588888888000))
    .toBe('2020-05-07 22:01:28')
})

// test helpers.roundPrice() which is A helper function that rounds the input to 2 decimals but only if the number is bigger than 1.
test('helpers.roundPrice()', () => {
  // for smaller than 1, it should stay the same
  expect(helpers.roundPrice(0.123456789))
    .toBe(0.123456789)

  // for bigger than 1, it should round to 2 decimals
  expect(helpers.roundPrice(1.123456789))
    .toBe(1.12)

  // if type of the input is not a number, return the input
  expect(helpers.roundPrice(undefined))
    .toBe(undefined)
  expect(helpers.roundPrice(null))
    .toBe(null)
  expect(helpers.roundPrice('string'))
    .toBe('string')
})
