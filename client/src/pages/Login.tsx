import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Fingerprint } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { login } from '@/lib/api'
import FormField from '@/components/FormField'
import NavLink from '@/components/NavLink'
import { AxiosError } from 'axios'

interface Credentials {
  email: string
  password: string
}

export default function LoginForm() {
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => navigate('/', { replace: true }),
    onError: (err: any) => {
      const errorMessage = err instanceof AxiosError
        ? err.response?.data.error
        : err?.error || 'An unexpected error occurred. Please try again.'
      setError(errorMessage)
    }
  })

  const handleChange = (field: keyof Credentials) => (value: string) =>
    setCredentials(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    mutate(credentials)
  }

  const handleNavigation = (path: string) => navigate(path)

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-zinc-900 overflow-hidden relative'>
      <div className='absolute inset-0 bg-gradient-to-br from-zinc-500/10 to-black/20' />
      <div className='relative z-10 w-full max-w-md px-4'>
        <Card className='w-full bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 shadow-2xl mx-auto'>
          <CardHeader className='text-center space-y-2'>
            <Fingerprint className='h-12 w-12 text-zinc-400 mx-auto' />
            <CardTitle className='text-2xl font-bold text-zinc-100'>Welcome Back</CardTitle>
            <CardDescription className='text-zinc-400'>Sign in to your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-4'>
              <FormField
                id='email'
                label='Email'
                type='email'
                placeholder='you@example.com'
                value={credentials.email}
                onChange={handleChange('email')}
              />
              <FormField
                id='password'
                label='Password'
                type='password'
                placeholder='••••••••'
                value={credentials.password}
                onChange={handleChange('password')}
              />
            </CardContent>
            <CardFooter className='flex flex-col space-y-4'>
              <Button
                type='submit'
                disabled={isPending}
                className='w-full bg-gradient-to-r from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 text-zinc-100 font-semibold py-2 rounded-md transition duration-300 focus:ring-2 focus:ring-zinc-500'
              >
                {isPending ? 'Cargando...' : 'Ingresar'}
              </Button>
              {error && <p className='text-red-500 text-sm'>{error}</p>}
              <div className='flex justify-around text-sm text-zinc-400 w-full'>
                <NavLink onClick={() => handleNavigation('/forgot-password')} text='¿Olvidaste tu contraseña?' />
                <NavLink onClick={() => handleNavigation('/register')} text='Crear cuenta' />
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-800/50 to-transparent' />
    </div>
  )
}
