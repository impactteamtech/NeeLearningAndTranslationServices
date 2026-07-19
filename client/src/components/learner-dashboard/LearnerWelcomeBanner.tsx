import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export type LearnerWelcomeBannerProps = {
  learnerName?: string;
  isLoading?: boolean;
};

const getDisplayName = (learnerName?: string) => {
  const normalizedName = learnerName?.trim();

  if (!normalizedName || ["null", "undefined"].includes(normalizedName.toLowerCase())) {
    return undefined;
  }

  return normalizedName;
};

export const LearnerWelcomeBanner = ({
  learnerName,
  isLoading,
}: LearnerWelcomeBannerProps) => {
  const displayName = getDisplayName(learnerName);

  return (
    <header className="relative isolate overflow-hidden rounded-2xl border border-haiti-navy/10 bg-haiti-navy px-5 py-6 shadow-sm sm:px-7 sm:py-7 lg:px-8">


      <div className="relative grid min-w-0 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(13rem,36%)] md:items-center md:gap-8">
        <div className="min-w-0 space-y-5">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/80">
              Learner Overview
            </span>
            <h1
              aria-busy={isLoading}
              className="mt-2 flex min-h-9 flex-wrap items-center gap-x-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
            >
              <span>Welcome back{isLoading || displayName ? "," : ""}</span>
              {isLoading ? (
                <span
                  aria-label="Loading learner name"
                  className="inline-block h-7 w-36 animate-pulse rounded-md bg-haiti-navy/10 sm:h-8 sm:w-48"
                />
              ) : displayName ? (
                <span className="break-words text-haiti-navy">{displayName}</span>
              ) : null}
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-100">
              Monitor your session statistics, booking statuses, available services, and learning trends.
            </p>
          </div>

          <nav aria-label="Learner dashboard shortcuts" className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/dashboard/learner/services"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-blue-700/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy"
            >
              Browse Services
              <FiArrowRight className="size-3.5" />
            </Link>
            <Link
              to="/dashboard/learner/bookings"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border  bg-white px-4 py-2.5 text-xs font-extrabold text-haiti-navy shadow-sm transition hover:border-haiti-navy/25 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy"
            >
              View My Bookings
            </Link>
          </nav>
        </div>

        <div className="flex min-w-0 justify-center md:justify-end">
          <div className="group relative flex h-40 w-full max-w-64 items-center justify-center md:h-44">
       
            <img
              src="/learner-related-pictures/student.png"
              alt="Learner dashboard illustration"
              className="relative h-full max-h-44 w-auto max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
