import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import FormField from '@/components/FormField'
import { useMutation } from '@tanstack/react-query'
import { register } from '@/lib/api'
import { AxiosError } from 'axios'

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/', { replace: true })
    },
    onError: (err: any) => {
      console.error(err)
      const errorMessage = err instanceof AxiosError
        ? err.response?.data.error
        : err.error || err?.code || 'An unexpected error occurred. Please try again.'
      setError(errorMessage)
    }
  })

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const username = form.get('username') as string
    const email = form.get('email') as string
    const password = form.get('password') as string
    const confirmPassword = form.get('confirmPassword') as string

    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }
    if (!username || !email || !password || !confirmPassword) {
      return setError('All fields are required')
    }

    setError(null)
    mutate({ username, email, password, confirmPassword })
  }, [mutate])

  return (
    <div className='min-h-screen bg-gradient-to-br from-black to-zinc-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <h1 className='text-3xl font-bold text-zinc-100 mb-8 text-center'>Create an Account</h1>
        <Card className='w-full bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 shadow-2xl mx-auto'>
          <CardContent className='pt-6 pb-8 px-8'>
            {error && <div role='alert' aria-live='assertive' className='text-red-500 text-sm mb-4'>{error}</div>}
            <form className='space-y-4' onSubmit={handleSubmit}>
              <FormField id='username' label='Username' type='text' placeholder='johndoe' name='username' />
              <FormField id='email' label='Email' type='email' placeholder='Y8y1B@example.com' name='email' />
              <FormField id='password' label='Password' type='password' placeholder='********' name='password' />
              <FormField id='confirmPassword' label='Confirm Password' type='password' placeholder='********' name='confirmPassword' />

              <Button
                type='submit'
                disabled={isPending}
                className='w-full bg-gradient-to-r from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 text-zinc-100 font-semibold py-2 rounded-md transition duration-300 focus:ring-2 focus:ring-zinc-500'
              >
                {isPending ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className='text-center text-zinc-400 text-sm mt-4'>
          Already have an account? <Link to='/login' className='text-zinc-300 hover:text-zinc-100'>Log in</Link>
        </p>
      </div>
    </div>
  )
}
