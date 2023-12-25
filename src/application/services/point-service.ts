export interface Clock {
  getTime(): Date
}

export interface PointRepository {
  save(point: any): Promise<void>
  findLast(userid: string): Promise<any>
  update(point: any): Promise<void>
}

export class PointService {
  constructor (
    private readonly clock: Clock,
    private readonly pointRepository: PointRepository
  ) {}

  async checkin (userId: string) {
    const checkinTime = this.clock.getTime()
    const checkinHour = new Date(checkinTime).getHours()

    if (checkinHour < 8) throw new Error('Error, try again after 8 AM.')

    const proof = {
      id: Math.random() * 100,
      userId,
      checkin: this.clock.getTime(),
      checkout: null
    }

    await this.pointRepository.save(proof)

    return proof
  }

  async checkout (userId: string) {
    const proof = await this.pointRepository.findLast(userId)
    const checkoutTime = this.clock.getTime()

    const exceedLimitHours =
      checkoutTime.getHours() - proof.checkin.getHours() > 4 ? true : false

    if (exceedLimitHours) throw new Error('exceeds limit 4 hours')

    proof.checkout = checkoutTime
    await this.pointRepository.update(proof)

    return proof
  }
}
