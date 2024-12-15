import UserMenu from './UserMenu'

export default function HomeLayout({ username, children }: { username: string, children: React.ReactNode }) {
  return (
    <main className='px-4 py-8 bg-gradient-to-br from-zinc-900 to-black w-full h-dvh'>
      <UserMenu username={username} />
      {children}
    </main>
  )
}
