import { Trash } from 'lucide-react'
import { TableCell, TableRow } from './ui/table'
import useDeleteSession from '@/hooks/useDeleteSession'

interface SessionRowProps {
  id: string
  userAgent: string
  createdAt: string
  expiresAt: string
  isCurrent?: boolean
}

export const SessionRow = ({ id, userAgent, createdAt, expiresAt, isCurrent }: SessionRowProps) => {
  const { deleteSession, isPending } = useDeleteSession(id)

  return (
    <TableRow
      className={`border-zinc-700 hover:bg-zinc-800 ${isCurrent ? 'bg-zinc-800' : ''}`}
    >
      <TableCell className='text-zinc-300 text-center'>{userAgent}</TableCell>
      <TableCell className='text-zinc-300 text-center'>{new Date(createdAt).toLocaleString()}</TableCell>
      <TableCell className='text-zinc-300 text-center'>{isCurrent ? 'Yes' : 'No'}</TableCell>
      <TableCell className='text-zinc-300 text-center'>{new Date(expiresAt).toLocaleString()}</TableCell>
      <TableCell className='text-zinc-300 flex items-center justify-center'>
        <button onClick={() => deleteSession()} disabled={isPending} className='text-red-500 hover:text-red-700'>
          <Trash size={18} />
        </button>
      </TableCell>
    </TableRow>
  )
}

export default SessionRow
