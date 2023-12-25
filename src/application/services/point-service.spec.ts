import { expect, test } from 'bun:test'

class PointService {
  async checkin (userId: string) {
    return {
      id: userId,
      checkin: new Date()
    }
  }
}

test('should checkin and return proof', async () => {
  const pointService = new PointService()
  const proof = await pointService.checkin('1234')

  expect(proof).toHaveProperty('id')
  expect(proof).toHaveProperty('checkin')
})
