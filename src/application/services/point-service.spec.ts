import { expect, test } from 'bun:test'

interface Clock {
  getTime(): Date
}
class PointService {
  constructor (private readonly clock: Clock) {}

  async checkin (userId: string) {
    const checkinTime = this.clock.getTime()
    const checkinHour = new Date(checkinTime).getHours()

    if (checkinHour < 8) throw new Error('Error, try again after 8 AM.')

    return {
      id: userId,
      checkin: this.clock.getTime()
    }
  }
}

class FakeClock implements Clock {
  private time: Date = new Date()

  getTime (): Date {
    return this.time
  }

  setTime (fake: Date) {
    this.time = fake
  }
}

test('should checkin and return proof', async () => {
  const pointService = new PointService(new FakeClock())
  const proof = await pointService.checkin('1234')

  expect(proof).toHaveProperty('id')
  expect(proof).toHaveProperty('checkin')
})

test('should return an error if you try to check in before the opening time', async () => {
  const fakeClock = new FakeClock()
  const pointService = new PointService(fakeClock)
  fakeClock.setTime(new Date('2023-12-25:07:00:00'))

  expect(async () => await pointService.checkin('1234')).toThrow(
    new Error('Error, try again after 8 AM.')
  )
})
