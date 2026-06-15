import { Link } from 'react-router-dom';

interface LogoProps {
  /** 'dark' (default) — for white/light backgrounds (Navbar)
   *  'light'           — for dark backgrounds (Footer)  */
  variant?: 'dark' | 'light';
}

const Logo = ({ variant = 'dark' }: LogoProps) => {
  const isLight = variant === 'light';

  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <img
        className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
        src="/logo.png"
        alt="Nee's Learning logo"
      />
      <span
        className="font-sans font-bold text-xl tracking-tight"
        style={{ color: isLight ? '#ffffff' : 'var(--color-dark)' }}
      >
        Nee
        <span style={{ color: isLight ? 'rgba(255,255,255,0.70)' : 'var(--color-accent)' }}>
          's
        </span>{' '}
        Learning
      </span>
    </Link>
  );
};

export default Logo;