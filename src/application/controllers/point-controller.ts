import { Point } from '../../domain/point/point'
import { Controller } from '../protocos/controller'
import { MissingParamError } from '../protocos/errros/missing-param-error'
import { Ok, badRequest, internalError } from '../protocos/http-responses'
import { PointRepository } from '../repository/point-repository'
export class PointCheckinController implements Controller {
  constructor (
    private readonly pointRepository: PointRepository,
    private readonly pointService: Point
  ) {}

  async execute (httpRequest: any): Promise<any> {
    try {
      const userId: string = httpRequest.body.id

      if (!userId) return badRequest(new MissingParamError('id'))

      const proof = this.pointService.checkin(userId)

      await this.pointRepository.save(proof)

      return Ok(proof)
    } catch (error) {
      return internalError()
    }
  }
}
