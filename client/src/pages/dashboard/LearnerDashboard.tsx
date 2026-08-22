import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiX,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { useCurrentUser, useLogoutMutation } from "../../features/auth/authQueries";
import { useMyLearnerProfile } from "../../features/learner/learnerQueries";
import { initialsFrom, safeImageUrl } from "../../components/learner-dashboard/learner-settings/settings.constants";

type NavigationItem = {
  label: string;
  to: string;
  icon: IconType;
  end?: boolean;
};

const navigationItems: NavigationItem[] = [
  { label: "Overview", to: "/dashboard/learner", icon: FiGrid, end: true },
  { label: "Browse Services", to: "/dashboard/learner/services", icon: FiBookOpen },
  { label: "Tutor Availability", to: "/dashboard/learner/availability", icon: FiClock },
  { label: "My Bookings", to: "/dashboard/learner/bookings", icon: FiCalendar, end: true },
  { label: "Upcoming", to: "/dashboard/learner/bookings/upcoming", icon: FiClock },
  { label: "History", to: "/dashboard/learner/bookings/history", icon: FiBookOpen },
  { label: "My Files", to: "/dashboard/learner/files", icon: FiFileText },
  { label: "My Account", to: "/dashboard/learner/settings", icon: FiSettings },
];

const navigationLinkClass = (isActive: boolean) =>
  `group flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy ${
    isActive
      ? "bg-haiti-navy text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-haiti-navy"
  }`;

const LearnerSidebar = ({
  open,
  onClose,
  onLogout,
  isLoggingOut,
}: {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  isLoggingOut: boolean;
}) => {
  const { data: user } = useCurrentUser();
  const { data: profile } = useMyLearnerProfile();
  const [imgFailed, setImgFailed] = useState(false);

  const avatarUrl =
    !imgFailed && profile?.profile_picture_url
      ? safeImageUrl(profile.profile_picture_url)
      : null;

  return (
    <>
      <button
        type="button"
        aria-label="Close learner navigation"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-950/35 transition-opacity lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />
      <aside
        id="learner-navigation"
        aria-label="Learner dashboard navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white px-3 pb-4 pt-4 shadow-2xl transition-transform lg:translate-x-0 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-12 items-center justify-between gap-2 px-1">
          <NavLink
            to="/dashboard/learner"
            onClick={onClose}
            className="inline-flex min-w-0 items-center gap-3"
          >
            <img src="/logo.png" alt="" className="size-10 shrink-0 object-contain" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold text-slate-950">
                Learner Dashboard
              </span>
              <span className="block truncate text-xs font-bold text-slate-400">
                {user?.role ?? "learner"} access
              </span>
            </span>
          </NavLink>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <FiX className="size-5" />
          </button>
        </div>

        <nav className="mt-7 flex-1 space-y-1.5 overflow-y-auto">
          {navigationItems.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) => navigationLinkClass(isActive)}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <NavLink
            to="/dashboard/learner/settings"
            onClick={onClose}
            title="Manage account & profile picture"
            className="group mb-3 flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3 shadow-xs transition duration-200 hover:border-slate-300 hover:bg-slate-100/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy"
          >
            <div className="relative shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={`${user?.full_name ?? "Learner"} profile`}
                  onError={() => setImgFailed(true)}
                  className="size-11 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-slate-200/80 transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div className="flex size-11 items-center justify-center rounded-full bg-linear-to-br from-haiti-navy via-slate-800 to-blue-900 text-sm font-extrabold text-white shadow-sm ring-1 ring-slate-200/80 transition-transform duration-200 group-hover:scale-105">
                  {initialsFrom(user?.full_name)}
                </div>
              )}
              <span
                className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-emerald-500"
                title="Online"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold text-slate-900 transition-colors group-hover:text-haiti-navy">
                {user?.full_name ?? "Learner"}
              </p>
              <p className="truncate text-xs font-semibold text-slate-500">
                {user?.email ?? "Signed in"}
              </p>
              <span className="mt-1 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-haiti-navy">
                Learner
              </span>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50/80 px-3 text-sm font-extrabold text-haiti-red shadow-xs transition hover:border-red-200 hover:bg-red-100 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
          >
            <FiLogOut className="size-4" />
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </aside>
    </>
  );
};

export const LearnerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => navigate("/login", { replace: true }),
    });
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <LearnerSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        isLoggingOut={logoutMutation.isPending}
      />
      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:hidden">
          <button
            type="button"
            aria-label="Open learner navigation"
            aria-controls="learner-navigation"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
            className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-haiti-navy shadow-sm"
          >
            <FiMenu className="size-5" />
          </button>
          <span className="ml-3 text-sm font-extrabold text-haiti-navy">
            Learner dashboard
          </span>
        </header>
        <main className="mx-auto w-full max-w-[96rem] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LearnerDashboard;
