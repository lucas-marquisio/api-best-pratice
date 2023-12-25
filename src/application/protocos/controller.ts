export interface Controller {
  execute(httpRequest: any): Promise<any>
}
