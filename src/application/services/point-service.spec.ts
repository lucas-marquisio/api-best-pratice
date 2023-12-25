import { expect, test } from 'bun:test'
import { Clock } from '../../domain/point/clock'
import { PointRepository } from '../repository/point-repository'
import { PointService } from './point-service'

class FakeClock implements Clock {
  private time: Date = new Date()

  getTime (): Date {
    return this.time
  }

  setTime (fake: Date) {
    this.time = fake
  }
}

class FakePointRepository implements PointRepository {
  private database: any[] = []

  async save (point: any): Promise<void> {
    this.database.push(point)
  }

  async findLast (userid: string): Promise<any> {
    const proof = this.database.findLast(data => data.userId === userid)
    return proof
  }

  async update (point: any): Promise<void> {
    this.database.forEach(data => {
      if (data.id === point.id) {
        data = point
      }
    })
  }
}

test('should checkin and return proof', async () => {
  const pointService = new PointService(
    new FakeClock(),
    new FakePointRepository()
  )
  const proof = await pointService.checkin('1234')

  expect(proof).toHaveProperty('id')
  expect(proof).toHaveProperty('checkin')
})

test('should return an error if you try to check in before the opening time', async () => {
  const fakeClock = new FakeClock()
  const pointService = new PointService(fakeClock, new FakePointRepository())
  fakeClock.setTime(new Date('2023-12-25:07:00:00'))

  expect(async () => await pointService.checkin('1234')).toThrow(
    new Error('Error, try again after 8 AM.')
  )
})

test('Should check in and verify if the recorded time matches the one on the proof', async () => {
  const fakeClock = new FakeClock()
  const pointService = new PointService(fakeClock, new FakePointRepository())
  fakeClock.setTime(new Date('2023-12-25:08:00:00'))
  const proof = await pointService.checkin('1234')

  expect(proof.checkin).toEqual(new Date('2023-12-25:08:00:00'))
})

test('Should checkout and recieve a proof correct', async () => {
  const fakeClock = new FakeClock()
  const pointService = new PointService(fakeClock, new FakePointRepository())
  fakeClock.setTime(new Date('2023-12-25:08:00:00'))
  const proofCheckin = await pointService.checkin('1234')
  fakeClock.setTime(new Date('2023-12-25:12:00:00'))
  const proofCheckout = await pointService.checkout('1234')

  expect(proofCheckin.id).toEqual(proofCheckout.id)
})

test('Should return an error if it exceeds 4 hours of work', async () => {
  const fakeClock = new FakeClock()
  const pointService = new PointService(fakeClock, new FakePointRepository())
  fakeClock.setTime(new Date('2023-12-25:08:00:00'))
  const proofCheckin = await pointService.checkin('1234')
  fakeClock.setTime(new Date('2023-12-25:13:00:00'))

  expect(async () => await pointService.checkout('1234')).toThrow(
    new Error('exceeds limit 4 hours')
  )
})

test('Should accept overtime if overtime is enabled', async () => {
  const fakeClock = new FakeClock()
  const pointService = new PointService(fakeClock, new FakePointRepository())
  pointService.enableOvertime()
  fakeClock.setTime(new Date('2023-12-25:08:00:00'))
  const proofCheckin = await pointService.checkin('1234')
  fakeClock.setTime(new Date('2023-12-25:17:00:00'))
  const proofCheckout = await pointService.checkout('1234')

  expect(proofCheckin).toBeTruthy()
})
