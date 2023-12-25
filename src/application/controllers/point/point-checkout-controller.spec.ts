import { describe, expect, test } from 'bun:test'
import { Clock } from '../../../domain/point/clock'
import { PointRepository } from '../../repository/point-repository'
import { PointService } from '../../services/point-service'
import { PointCheckoutController } from './point-checkout-controller'

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
  database: any[] = [
    { id: 1234, userId: '1234', checkin: new Date(), checkout: null }
  ]
  async findLast (userid: string): Promise<any> {
    return this.database[0]
  }
  async save (point: any): Promise<void> {}
  async update (point: any): Promise<void> {}
}

describe('PointCheckoutController', () => {
  test('sould return 400 if id not provided', async () => {
    const controller = new PointCheckoutController(
      new FakePointRepository(),
      new PointService(new FakeClock())
    )
    const output = await controller.execute({
      body: {}
    })

    expect(output.statusCode).toEqual(400)
  })

  test('sould return 200 if send correct data', async () => {
    const controller = new PointCheckoutController(
      new FakePointRepository(),
      new PointService(new FakeClock())
    )

    const output = await controller.execute({
      body: {
        id: '1234'
      }
    })

    expect(output.statusCode).toEqual(200)
  })
})
