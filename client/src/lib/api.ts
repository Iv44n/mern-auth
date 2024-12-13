import API from '@/config/apiClient'

interface AuthParams {
  email: string
  password: string
}

interface RegisterParams extends AuthParams {
  username: string
  confirmPassword: string
}

export const login = (data: AuthParams) => API.post('/auth/login', data)
export const register = (data: RegisterParams) => API.post('/auth/register', data)
export const getUser = () => API.get('/user')
export const logout = () => API.get('/auth/logout')
