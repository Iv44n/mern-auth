import { getUser } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

const useAuth = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['auth'],
    queryFn: getUser,
    staleTime: Infinity
  })

  return {
    user: data,
    ...rest
  }
}

export default useAuth
