export const badRequest = (error: Error) => ({
  statusCode: 400,
  body: error
})

export const Ok = (body: any) => ({
  statusCode: 200,
  body
})
