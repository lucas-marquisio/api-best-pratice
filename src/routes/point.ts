import { PointCheckinController } from '../application/controllers/point/point-checkin-controller'
import { PointCheckoutController } from '../application/controllers/point/point-checkout-controller'
import { PointService } from '../application/services/point-service'
import { PointRepositoryInMemory } from '../infra/database/point-repository-memory'
import { ClockService } from '../infra/utils/clock-service'
import { server } from '../main'

export const SetRoutesPoint = (router: typeof server) => {
  const pointRepositoryInMemory = new PointRepositoryInMemory()

  router.post(
    '/checkin',
    new PointCheckinController(
      pointRepositoryInMemory,
      new PointService(new ClockService())
    )
  )

  router.post(
    '/checkout',
    new PointCheckoutController(
      pointRepositoryInMemory,
      new PointService(new ClockService())
    )
  )
}
