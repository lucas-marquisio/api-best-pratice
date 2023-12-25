export interface Clock {
  getTime(): Date
}
export class PointService {
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
