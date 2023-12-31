import { Clock } from '../../domain/point/clock'
import { Point } from '../../domain/point/point'
import { PointModel } from '../../domain/point/point-model'

export class PointService implements Point{
  private overtime: boolean = false

  constructor (private readonly clock: Clock) {}

  async checkin (userId: string): Promise<PointModel> {
    const checkinTime = this.clock.getTime()
    const checkinHour = new Date(checkinTime).getHours()

    if (checkinHour < 8) throw new Error('Error, try again after 8 AM.')

    const proof = {
      id: Math.random() * 100,
      userId,
      checkin: this.clock.getTime(),
      checkout: null
    }

    return proof
  }

  async checkout (proof: PointModel): Promise<PointModel> {
    const checkoutTime = this.clock.getTime()

    const exceedLimitHours =
      checkoutTime.getHours() - proof.checkin.getHours() > 4 ? true : false

    if (exceedLimitHours && !this.overtime)
      throw new Error('exceeds limit 4 hours')

    proof.checkout = checkoutTime

    return proof
  }

  enableOvertime () {
    this.overtime = true
  }
}
