import { Point } from '../../domain/point/point'
import { Controller } from '../protocos/controller'
import { Ok, badRequest } from '../protocos/http-responses'
import { PointRepository } from '../repository/point-repository'
export class PointCheckinController implements Controller {
  constructor (
    private readonly pointRepository: PointRepository,
    private readonly pointService: Point
  ) {}

  async execute (httpRequest: any): Promise<any> {
    const userId: string = httpRequest.body.id

    if (!userId) return badRequest(new Error('missing param error: id'))

    const proof = this.pointService.checkin(userId)

    await this.pointRepository.save(proof)

    return Ok(proof)
  }
}
