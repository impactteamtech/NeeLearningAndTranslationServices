import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/"  className='flex items-center gap-3'>
        <img
            className='w-15 h-15'
            src="/logo.png" alt="logo"  />
        <h1 className='font-medium text-2xl' style={{ color: "var(--color-brand-navy)" }}>
            Nee <span style={{ color: "var(--color-brand-navy)" }}>'s</span>
        </h1>
    </Link>
  )
}

export default Logo