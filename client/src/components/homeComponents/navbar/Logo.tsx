import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <img
        className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
        src="/logo.png"
        alt="Nee's Learning logo"
      />
      <span className="font-sans font-bold text-xl tracking-tight text-primary">
        Nee<span className="text-accent">'s</span> Learning
      </span>
    </Link>
  );
};

export default Logo;