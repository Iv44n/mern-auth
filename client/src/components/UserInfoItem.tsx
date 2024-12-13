interface UserInfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

export default function UserInfoItem({ icon, label, value }: UserInfoItemProps) {
  return (
    <div className='flex items-center space-x-3 p-4 bg-zinc-800 rounded-lg'>
      <div className='p-2 bg-zinc-700 rounded-full'>{icon}</div>
      <div>
        <p className='text-sm text-zinc-400'>{label}</p>
        <p className='text-lg font-semibold text-zinc-100'>{value}</p>
      </div>
    </div>
  )
}
