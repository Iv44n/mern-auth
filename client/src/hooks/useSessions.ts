import { getSessions } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

const useSessions = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions
  })

  return {
    sessions: data || [],
    ...rest
  }
}

export default useSessions
