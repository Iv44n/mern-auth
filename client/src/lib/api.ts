import API from '@/config/apiClient'

interface AuthParams {
  email: string
  password: string
}

interface RegisterParams extends AuthParams {
  username: string
  confirmPassword: string
}

interface Session {
  _id: string
  userAgent: string
  createdAt: string
  expiresAt: string,
  isCurrent?: boolean
}

interface User {
  _id: string
  username: string
  email: string
  verified: boolean
  createdAt: string
  updatedAt: string
}

export const login = async (data: AuthParams) => await API.post('/auth/login', data)
export const register = async (data: RegisterParams) => await API.post('/auth/register', data)
export const getUser = async (): Promise<User> => await API.get('/user')
export const logout = async () => await API.get('/auth/logout')
export const getSessions = async (): Promise<Session[]> => await API.get('/sessions')
export const deleteSession = async (id: string) => await API.delete(`/sessions/${id}`)
