import axios, { CreateAxiosDefaults } from 'axios'
import queryClient from './queryClient'
import { navigateTo } from '@/lib/navigation'

const options: CreateAxiosDefaults = {
  baseURL: 'http://localhost:3000',
  withCredentials: true
}

const API = axios.create(options)
const TokenRefreshClient = axios.create(options)

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config: originalRequest, response } = error
    const { status, data } = response || {}

    if (status === 401 && data?.errorCode === 'InvalidAccessToken') {
      try {
        await TokenRefreshClient.get('/auth/refresh')
        return TokenRefreshClient(originalRequest)
      } catch {
        queryClient.clear()
        navigateTo('/login', {
          state: { redirectUrl: window.location.pathname }
        })
      }
    }

    return Promise.reject(error)
  }
)

export default API
