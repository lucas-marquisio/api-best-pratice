import { expect, test } from 'bun:test'
import { Controller } from '../../protocos/controller'
import { MissingParamError } from '../../protocos/errros/missing-param-error'
import { badRequest } from '../../protocos/http-responses'

class PointCheckoutController implements Controller {
  async execute (httpRequest: any): Promise<any> {
    try {
      const userId = httpRequest.body.id
      if (!userId) return badRequest(new MissingParamError('id'))
    } catch (error) {}
  }
}

test('sould return 400 if id not provided', async () => {
  const controller = new PointCheckoutController()
  const output = await controller.execute({
    body: {}
  })

  expect(output.statusCode).toEqual(400)
})
