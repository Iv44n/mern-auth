import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import queryClient from '@/config/queryClient'
import { logout } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import { User, Settings, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface UserMenuProps {
  username: string
}

const UserMenu = ({ username }: UserMenuProps) => {
  const navigate = useNavigate()

  const { mutate: handleLogout } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear()
      navigate('/login', { replace: true })
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full p-0'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/placeholder.svg?height=32&width=32' alt={`@${username}`} />
            <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56 bg-zinc-900 text-zinc-100' align='start' sideOffset={5}>
        <DropdownMenuItem className='hover:bg-zinc-800 focus:bg-zinc-800 focus:text-zinc-100'>
          <User className='mr-2 h-4 w-4' />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='hover:bg-zinc-800 focus:bg-zinc-800 focus:text-zinc-100'>
          <Settings className='mr-2 h-4 w-4' />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-zinc-700' />
        <DropdownMenuItem
          onClick={() => handleLogout()}
          className='hover:bg-red-600 focus:bg-red-600 text-red-500'
        >
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
