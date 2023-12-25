import { Point } from '../../domain/point/point'
import { Controller } from '../protocos/controller'
import { PointRepository } from '../repository/point-repository'
export class PointCheckinController implements Controller {
  constructor (
    private readonly pointRepository: PointRepository,
    private readonly pointService: Point
  ) {}

  async execute (httpRequest: any): Promise<any> {
    const userId: string = httpRequest.body.id

    if (!userId)
      return {
        statusCode: 400,
        body: {}
      }

    const proof = this.pointService.checkin(userId)

    await this.pointRepository.save(proof)

    return {
      statusCode: 200,
      body: proof
    }
  }
}
