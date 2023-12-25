import { PointModel } from './point-model'

export interface Point {
  checkin(userId: PointModel['userId']): Promise<PointModel>
  checkout(proof: PointModel): Promise<PointModel>
  enableOvertime(): void
}
