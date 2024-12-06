import { HttpStatusCode } from '../constants/http'

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: string
  ) {
    super(message)
  }
}

export default AppError
