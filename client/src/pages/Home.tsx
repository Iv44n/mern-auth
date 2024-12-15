import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, Mail, UserIcon, Calendar } from 'lucide-react'
import useAuth from '@/hooks/useAuth'
import UserInfoItem from '@/components/UserInfoItem'
import HomeLayout from '@/components/HomeLayout'

const formatDate = (date: string) => new Date(date).toLocaleString()

export default function HomeProfile() {
  const { user } = useAuth()
  const { username, email, verified, _id: userId, createdAt } = user || {}

  return (
    <HomeLayout username={username || ''}>
      <Card className='max-w-2xl mx-auto mt-16 bg-transparent border-none'>
        <CardHeader className='pb-4'>
          <CardTitle className='text-3xl text-zinc-100 text-center'>
            Welcome back, <span className='text-zinc-400'>{username}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-6'>
            <UserInfoItem icon={<Mail className='h-6 w-6 text-zinc-400' />} label='Email' value={email || ''} />
            <UserInfoItem icon={<UserIcon className='h-6 w-6 text-zinc-400' />} label='User ID' value={userId || ''} />
            <UserInfoItem icon={<Calendar className='h-6 w-6 text-zinc-400' />} label='Join Date' value={formatDate(createdAt || '')} />
          </div>

          {!verified && (
            <Alert variant='destructive' className='bg-zinc-900 text-zinc-100 border border-zinc-700 flex items-start pt-6 pb-4'>
              <AlertTriangle className='h-5 w-5 text-zinc-300 mt-3' />
              <div className='ml-3'>
                <AlertTitle className='font-semibold'>Unverified Email</AlertTitle>
                <AlertDescription>Please verify your email to unlock all features.</AlertDescription>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>
    </HomeLayout>
  )
}
