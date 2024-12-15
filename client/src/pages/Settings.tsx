import HomeLayout from '@/components/HomeLayout'
import SessionRow from '@/components/SessionRow'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useAuth from '@/hooks/useAuth'
import useSessions from '@/hooks/useSessions'

export default function Settings() {
  const username = useAuth().user?.username
  const { sessions } = useSessions()

  return (
    <HomeLayout username={username || ''}>
      <div className='mt-6'>
        <h2 className='text-2xl font-bold mb-4 text-zinc-100'>Your Sessions</h2>
        <Table className='border-zinc-700'>
          <TableHeader>
            <TableRow className='border-zinc-700 hover:bg-transparent'>
              <TableHead className='text-zinc-300 text-center'>User Agent</TableHead>
              <TableHead className='text-zinc-300 text-center'>Last Active</TableHead>
              <TableHead className='text-zinc-300 text-center'>Current Session</TableHead>
              <TableHead className='text-zinc-300 text-center'>Expires</TableHead>
              <TableHead className='text-zinc-300 text-center'>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => {
              const { _id: id } = session

              return (
                <SessionRow
                  key={id}
                  {...session}
                  id={id}
                />
              )
            })}
          </TableBody>
        </Table>
      </div>
    </HomeLayout>
  )
}
