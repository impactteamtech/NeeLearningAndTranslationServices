import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiEdit3, FiGlobe, FiTarget, FiUser } from "react-icons/fi";
import { useMyLearnerProfile } from "../../features/learner/learnerQueries";
import type { LearnerProfile } from "../../features/learner/learnerTypes";
import {
  initialsFrom,
  LANGUAGE_OPTIONS,
  safeImageUrl,
} from "./learner-settings/settings.constants";

export type LearnerWelcomeBannerProps = {
  learnerName?: string;
  profile?: LearnerProfile | null;
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
  profile: propProfile,
  isLoading,
}: LearnerWelcomeBannerProps) => {
  const { data: fetchedProfile, isLoading: isProfileLoading } = useMyLearnerProfile();
  const profile = propProfile !== undefined ? propProfile : fetchedProfile;
  const [imgFailed, setImgFailed] = useState(false);

  const displayName = getDisplayName(learnerName);
  const avatarUrl =
    !imgFailed && profile?.profile_picture_url
      ? safeImageUrl(profile.profile_picture_url)
      : null;

  const preferredLanguageLabel = LANGUAGE_OPTIONS.find(
    (opt) => opt.value === profile?.preferred_language
  )?.label;

  return (
    <header className="relative isolate overflow-hidden rounded-2xl border border-haiti-navy/10 bg-haiti-navy px-5 py-6 text-white shadow-sm sm:px-7 sm:py-7 lg:px-8">
      {/* Decorative background gradient circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-blue-500/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-1/3 size-72 rounded-full bg-cyan-400/10 blur-2xl"
      />

      <div className="relative grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,26%)] lg:items-center lg:gap-8">
        <div className="min-w-0 space-y-5">
          {/* Top category / tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-widest text-slate-200 backdrop-blur-xs">
              <FiUser className="size-3 text-blue-300" /> Learner Overview
            </span>
            {preferredLanguageLabel && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/25 px-3 py-1 text-[0.68rem] font-bold text-blue-100 backdrop-blur-xs">
                <FiGlobe className="size-3 text-blue-300" /> {preferredLanguageLabel}
              </span>
            )}
          </div>

          {/* Welcome Title with Avatar */}
          <div className="flex flex-wrap items-center gap-3.5">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${displayName ?? "Learner"} profile`}
                onError={() => setImgFailed(true)}
                className="size-14 rounded-full border-2 border-white/90 object-cover shadow-md ring-2 ring-blue-400/40 shrink-0"
              />
            ) : (
              <div className="flex size-14 items-center justify-center rounded-full bg-linear-to-br from-blue-600 via-slate-800 to-indigo-900 text-lg font-extrabold text-white shadow-md ring-2 ring-blue-400/40 shrink-0">
                {initialsFrom(displayName)}
              </div>
            )}
            <div className="min-w-0">
              <h1
                aria-busy={isLoading || isProfileLoading}
                className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
              >
                {isLoading ? (
                  <span className="inline-block h-8 w-48 animate-pulse rounded-md bg-white/20" />
                ) : (
                  <span>
                    Welcome back{displayName ? `, ${displayName}` : "!"} 👋
                  </span>
                )}
              </h1>
              <p className="mt-0.5 text-xs font-semibold text-blue-200">
                Monitor your session statistics, booking statuses, and learning goals.
              </p>
            </div>
          </div>

          {/* User Details Grid: Bio & Learning Goals */}
          <div className="grid gap-3.5 sm:grid-cols-2">
            {/* About / Bio Box */}
            <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md transition hover:bg-white/[0.14]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-extrabold text-blue-200">
                  <FiUser className="size-3.5 text-blue-300" /> About Me
                </span>
              </div>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-100 line-clamp-3">
                {profile?.bio?.trim() ? (
                  profile.bio
                ) : (
                  <span className="italic text-slate-300">
                    No bio added yet. Add a short summary about yourself in settings!
                  </span>
                )}
              </p>
            </div>

            {/* Learning Goals Box */}
            <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md transition hover:bg-white/[0.14]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-extrabold text-amber-200">
                  <FiTarget className="size-3.5 text-amber-300" /> Learning Goal
                </span>
              </div>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-100 line-clamp-3">
                {profile?.learning_goals?.trim() ? (
                  profile.learning_goals
                ) : (
                  <span className="italic text-slate-300">
                    No learning goals specified yet. Set your goals in settings!
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <nav
            aria-label="Learner dashboard shortcuts"
            className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap"
          >
            <Link
              to="/dashboard/learner/services"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Browse Services
              <FiArrowRight className="size-3.5" />
            </Link>
            <Link
              to="/dashboard/learner/bookings"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-extrabold text-white backdrop-blur-xs transition hover:bg-white/20 hover:border-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View My Bookings
            </Link>
            <Link
              to="/dashboard/learner/settings"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-extrabold text-white backdrop-blur-xs transition hover:bg-white/20 hover:border-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <FiEdit3 className="size-3.5 text-blue-200" />
              Edit Profile
            </Link>
          </nav>
        </div>

        {/* Right Illustration */}
        <div className="hidden min-w-0 justify-center md:flex lg:justify-end">
          <div className="group relative flex h-44 w-full max-w-56 items-center justify-center">
            <img
              src="/learner-related-pictures/student.png"
              alt="Learner dashboard illustration"
              className="relative h-full max-h-44 w-auto max-w-full object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

