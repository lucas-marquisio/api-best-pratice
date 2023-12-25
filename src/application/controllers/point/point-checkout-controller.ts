import { Point } from '../../../domain/point/point'
import { Controller } from '../../protocos/controller'
import { MissingParamError } from '../../protocos/errros/missing-param-error'
import { Ok, badRequest, internalError } from '../../protocos/http-responses'
import { PointRepository } from '../../repository/point-repository'

export class PointCheckoutController implements Controller {
  constructor (
    private readonly pointRepository: PointRepository,
    private readonly pointService: Point
  ) {}

  async execute (httpRequest: any): Promise<any> {
    try {
      const userId = httpRequest.body.id
      if (!userId) return badRequest(new MissingParamError('id'))

      const proof = await this.pointRepository.findLast(userId)
      console.log(proof)
      const proofCheckout = await this.pointService.checkout(proof)

      return Ok(proofCheckout)
    } catch (error) {
      return internalError()
    }
  }
}
