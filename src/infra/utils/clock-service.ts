import { Clock } from '../../domain/point/clock'

export class ClockService implements Clock {
  getTime (): Date {
    return new Date()
  }
}
