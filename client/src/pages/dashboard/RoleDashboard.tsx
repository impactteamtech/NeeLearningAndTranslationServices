import { useNavigate } from "react-router-dom";
import { useCurrentUser, useLogout } from "../../features/auth/authQueries";
import type { UserRole } from "../../features/auth/authTypes";

type RoleDashboardProps = {
  role: UserRole;
};

export const RoleDashboard = ({ role }: RoleDashboardProps) => {
  const { data: user } = useCurrentUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-lg rounded-3xl border border-haiti-navy/10 bg-white p-10 text-center shadow-[0_24px_70px_rgba(0,32,159,0.1)]">
        <img src="/logo.png" alt="Nee Learning" className="mx-auto mb-8 h-12 w-auto" />
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-haiti-red">
          {user?.full_name}
        </p>
        <h1 className="font-roxborough text-4xl font-bold text-haiti-navy">
          Welcome {role}
        </h1>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 rounded-full bg-haiti-navy px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-haiti-navy-dark"
        >
          Sign out
        </button>
      </section>
    </main>
  );
};
