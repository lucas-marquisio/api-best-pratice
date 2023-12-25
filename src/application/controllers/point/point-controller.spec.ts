import { expect, test } from 'bun:test'
import { Clock } from '../../../domain/point/clock'
import { PointRepository } from '../../repository/point-repository'
import { PointService } from '../../services/point-service'
import { PointCheckinController } from './point-controller'

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
  async findLast (userid: string): Promise<any> {}
  async save (point: any): Promise<void> {}
  async update (point: any): Promise<void> {}
}

test('sould return 400 if id not provided', async () => {
  const controller = new PointCheckinController(
    new FakePointRepository(),
    new PointService(new FakeClock())
  )
  const output = await controller.execute({
    body: {}
  })

  expect(output.statusCode).toEqual(400)
})

test('sould return 200 if send correct data', async () => {
  const controller = new PointCheckinController(
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
