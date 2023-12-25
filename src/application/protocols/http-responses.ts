export const badRequest = (error: Error) => ({
  statusCode: 400,
  body: error
})

export const Ok = (body: any) => ({
  statusCode: 200,
  body
})

export const internalError = () => ({
  statusCode: 500,
  body: 'internal error'
})
