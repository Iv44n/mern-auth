interface NavLinkProps {
  onClick: () => void
  text: string
}

const NavLink = ({ onClick, text }: NavLinkProps) => (
  <button
    type='button'
    onClick={onClick}
    className='hover:text-zinc-100 focus:outline-none'
  >
    {text}
  </button>
)

export default NavLink
