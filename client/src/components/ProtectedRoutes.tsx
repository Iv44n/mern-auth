import useAuth from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black w-full h-dvh'>
        <p className='text-2xl font-bold text-zinc-100'>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/login' />
  }

  return <Outlet />
}
