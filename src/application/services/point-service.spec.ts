import { describe, expect, test } from 'bun:test'
import { Clock } from '../../domain/point/clock'
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
describe('PointService', () => {
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

  test('Should check in and verify if the recorded time matches the one on the proof', async () => {
    const fakeClock = new FakeClock()
    const pointService = new PointService(fakeClock)
    fakeClock.setTime(new Date('2023-12-25:08:00:00'))
    const proof = await pointService.checkin('1234')

    expect(proof.checkin).toEqual(new Date('2023-12-25:08:00:00'))
  })

  test('Should checkout and recieve a proof correct', async () => {
    const fakeClock = new FakeClock()
    const pointService = new PointService(fakeClock)
    fakeClock.setTime(new Date('2023-12-25:08:00:00'))
    const proofCheckin = await pointService.checkin('1234')
    fakeClock.setTime(new Date('2023-12-25:12:00:00'))
    const proofCheckout = await pointService.checkout(proofCheckin)

    expect(proofCheckin.id).toEqual(proofCheckout.id)
  })

  test('Should return an error if it exceeds 4 hours of work', async () => {
    const fakeClock = new FakeClock()
    const pointService = new PointService(fakeClock)
    fakeClock.setTime(new Date('2023-12-25:08:00:00'))
    const proofCheckin = await pointService.checkin('1234')
    fakeClock.setTime(new Date('2023-12-25:13:00:00'))

    expect(async () => await pointService.checkout(proofCheckin)).toThrow(
      new Error('exceeds limit 4 hours')
    )
  })

  test('Should accept overtime if overtime is enabled', async () => {
    const fakeClock = new FakeClock()
    const pointService = new PointService(fakeClock)
    pointService.enableOvertime()
    fakeClock.setTime(new Date('2023-12-25:08:00:00'))
    const proofCheckin = await pointService.checkin('1234')
    fakeClock.setTime(new Date('2023-12-25:17:00:00'))
    const proofCheckout = await pointService.checkout(proofCheckin)

    expect(proofCheckin).toBeTruthy()
  })
})
