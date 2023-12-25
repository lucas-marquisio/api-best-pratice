export class MissingParamError extends Error {
  constructor (param: string) {
    super(`missing param error: ${param}`)
    this.name = 'MissingParamError'
  }
}
