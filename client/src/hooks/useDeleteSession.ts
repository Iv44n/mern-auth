import { deleteSession } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Session {
  _id: string
  userAgent: string
  createdAt: string
  expiresAt: string
  isCurrent?: boolean
}

const useDeleteSession = (sessionId: string) => {
  const queryClient = useQueryClient()

  const { mutate, ...mutationProps } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      queryClient.setQueryData<Session[]>(['sessions'], (oldData) =>
        oldData ? oldData.filter((session) => session._id !== sessionId) : []
      )
    }
  })

  return { deleteSession: mutate, ...mutationProps }
}

export default useDeleteSession
