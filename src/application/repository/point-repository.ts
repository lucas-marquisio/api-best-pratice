export interface PointRepository {
  save(point: any): Promise<void>
  findLast(userid: string): Promise<any>
  update(point: any): Promise<void>
}
