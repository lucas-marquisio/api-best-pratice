import { PointRepository } from '../../application/repository/point-repository'

export class PointRepositoryInMemory implements PointRepository {
  private database: any[] = []

  async save (point: any): Promise<void> {
    this.database.push(point)
  }

  async update (point: any): Promise<void> {
    this.database.forEach(data => {
      if (data.id === point.id) data = point
    })
  }

  async findLast (userid: string): Promise<any> {
    const lastPoint = this.database.findLast(point => point.userId === userid)
    return lastPoint
  }
}
