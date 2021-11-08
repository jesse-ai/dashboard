import helpers from '@/helpers'


test('test helpers.currentTime()', () => {
  expect(helpers.currentTime())
    .toBe(new Date().toISOString().slice(11, 19))
})

test('test helpers.timestampToTime()', () => {
  expect(helpers.timestampToTime(1588888888000))
    .toBe('2020-05-07 22:01:28')
})
