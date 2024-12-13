import { getUser } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

interface User {
  _id: string
  username: string
  email: string
  verified: boolean
  createdAt: string
  updatedAt: string
}

const useAuth = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['auth'],
    queryFn: getUser,
    staleTime: Infinity
  })

  const user = data?.data as User

  return {
    user,
    ...rest
  }
}

export default useAuth
