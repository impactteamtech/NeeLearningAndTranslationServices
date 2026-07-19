import { useState, useEffect } from "react";
import {
  FiUser,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiKey,
} from "react-icons/fi";
import { useCurrentUser } from "../../features/auth/authQueries";
import { ErrorState } from "../ui/adminUi";
import { getErrorMessage } from "../ui/adminFormat";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LearnerSettingsPage = () => {
  const userQuery = useCurrentUser();
  const user = userQuery.data;

  // Form states - Personal Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [infoErrors, setInfoErrors] = useState<Record<string, string>>({});
  const [infoSubmitPending, setInfoSubmitPending] = useState(false);
  const [infoSubmitNotice, setInfoSubmitNotice] = useState("");

  // Form states - Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordSubmitPending, setPasswordSubmitPending] = useState(false);
  const [passwordSubmitNotice, setPasswordSubmitNotice] = useState("");

  // Sync initial values once user profile is loaded
  useEffect(() => {
    if (user) {
      setFullName(user.full_name ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  // Reset Personal Info form to last saved state
  const resetInfoForm = () => {
    if (user) {
      setFullName(user.full_name ?? "");
      setEmail(user.email ?? "");
      setInfoErrors({});
      setInfoSubmitNotice("");
    }
  };

  // Reset Password form
  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordErrors({});
    setPasswordSubmitNotice("");
  };

  // Submit Personal Info changes
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (infoSubmitPending) return;

    // Client-side validations
    const errors: Record<string, string> = {};
    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (fullName.trim().length < 2) {
      errors.fullName = "Full name must contain at least 2 characters";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (Object.keys(errors).length > 0) {
      setInfoErrors(errors);
      setInfoSubmitNotice("");
      return;
    }

    setInfoErrors({});
    setInfoSubmitNotice("");
    setInfoSubmitPending(true);

    // Simulate validation/loading state before presenting the notice banner
    setTimeout(() => {
      setInfoSubmitPending(false);
      setInfoSubmitNotice(
        "Profile editing is not available yet because the backend update API has not been implemented."
      );
    }, 800);
  };

  // Submit Password changes
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordSubmitPending) return;

    // Client-side validations
    const errors: Record<string, string> = {};

    if (!currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else {
      if (newPassword.length < 8) {
        errors.newPassword = "New password must contain at least 8 characters";
      }
      if (!/[A-Z]/.test(newPassword)) {
        errors.newPassword = (errors.newPassword ? errors.newPassword + ". " : "") + "Must contain at least one uppercase letter";
      }
      if (!/[a-z]/.test(newPassword)) {
        errors.newPassword = (errors.newPassword ? errors.newPassword + ". " : "") + "Must contain at least one lowercase letter";
      }
      if (!/[0-9]/.test(newPassword)) {
        errors.newPassword = (errors.newPassword ? errors.newPassword + ". " : "") + "Must contain at least one number";
      }
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== newPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (newPassword && currentPassword && newPassword === currentPassword) {
      errors.newPassword = "The new password must not be the same as the current password";
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      setPasswordSubmitNotice("");
      return;
    }

    setPasswordErrors({});
    setPasswordSubmitNotice("");
    setPasswordSubmitPending(true);

    // Simulate validation/loading state before presenting the notice banner
    setTimeout(() => {
      setPasswordSubmitPending(false);
      setPasswordSubmitNotice(
        "Password updates are not available yet because the backend change-password API has not been implemented."
      );
    }, 800);
  };

  const isLoading = userQuery.isLoading;
  const isError = userQuery.isError;

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="overflow-hidden rounded-3xl bg-haiti-navy px-5 py-7 text-white shadow-sm sm:px-8 sm:py-9">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
            Account settings
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Learner Settings</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
            Manage your personal information and account security.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
          <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
        </div>
      ) : isError ? (
        <ErrorState
          title="Could not load settings data"
          message={getErrorMessage(userQuery.error)}
          onRetry={() => userQuery.refetch()}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Card 1: Personal Information */}
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6 flex flex-col justify-between">
            <form onSubmit={handleSaveInfo} className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-haiti-red">
                      Personal info
                    </span>
                    <h2 className="mt-1 text-lg font-extrabold text-slate-900">
                      Personal Information
                    </h2>
                    <p className="mt-1.5 text-xs font-semibold text-slate-400">
                      Update your display name and registered email address.
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-haiti-navy">
                    <FiUser className="size-5" />
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Full Name Field */}
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Full Name
                    </span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (infoErrors.fullName) {
                          setInfoErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.fullName;
                            return copy;
                          });
                        }
                      }}
                      className={`h-11 w-full rounded-xl border px-4 text-sm font-semibold text-slate-700 outline-none transition ${
                        infoErrors.fullName
                          ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                          : "border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:border-haiti-navy focus:bg-white"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {infoErrors.fullName && (
                      <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1">
                        <FiAlertCircle />
                        {infoErrors.fullName}
                      </p>
                    )}
                  </label>

                  {/* Email Field */}
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email Address
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (infoErrors.email) {
                          setInfoErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.email;
                            return copy;
                          });
                        }
                      }}
                      className={`h-11 w-full rounded-xl border px-4 text-sm font-semibold text-slate-700 outline-none transition ${
                        infoErrors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                          : "border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:border-haiti-navy focus:bg-white"
                      }`}
                      placeholder="Enter your email"
                    />
                    {infoErrors.email && (
                      <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1">
                        <FiAlertCircle />
                        {infoErrors.email}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              {/* Bottom Notice & Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                {infoSubmitNotice && (
                  <div className="mb-4 flex gap-2.5 rounded-xl border border-blue-100 bg-blue-50/40 p-4.5 text-xs font-semibold text-haiti-navy">
                    <FiAlertCircle className="size-4 shrink-0 text-blue-600" />
                    <span>{infoSubmitNotice}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={infoSubmitPending}
                    className="inline-flex min-h-11 min-w-[7.5rem] items-center justify-center gap-1.5 rounded-xl bg-haiti-navy px-5 text-sm font-bold text-white shadow-xs transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy disabled:pointer-events-none disabled:opacity-50"
                  >
                    {infoSubmitPending ? (
                      <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetInfoForm}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </article>

          {/* Card 2: Password and Security */}
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6 flex flex-col justify-between">
            <form onSubmit={handleUpdatePassword} className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-haiti-red">
                      Security
                    </span>
                    <h2 className="mt-1 text-lg font-extrabold text-slate-900">
                      Password and Security
                    </h2>
                    <p className="mt-1.5 text-xs font-semibold text-slate-400">
                      Change your password to keep your account safe.
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-600">
                    <FiKey className="size-5" />
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Current Password Field */}
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Current Password
                    </span>
                    <div className="relative">
                      <input
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value);
                          if (passwordErrors.currentPassword) {
                            setPasswordErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.currentPassword;
                              return copy;
                            });
                          }
                        }}
                        className={`h-11 w-full rounded-xl border pl-4 pr-11 text-sm font-semibold text-slate-700 outline-none transition ${
                          passwordErrors.currentPassword
                            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                            : "border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:border-haiti-navy focus:bg-white"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                        aria-label={showCurrent ? "Hide current password" : "Show current password"}
                      >
                        {showCurrent ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
                      </button>
                    </div>
                    {passwordErrors.currentPassword && (
                      <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1">
                        <FiAlertCircle />
                        {passwordErrors.currentPassword}
                      </p>
                    )}
                  </label>

                  {/* New Password Field */}
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                      New Password
                    </span>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          if (passwordErrors.newPassword) {
                            setPasswordErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.newPassword;
                              return copy;
                            });
                          }
                        }}
                        className={`h-11 w-full rounded-xl border pl-4 pr-11 text-sm font-semibold text-slate-700 outline-none transition ${
                          passwordErrors.newPassword
                            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                            : "border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:border-haiti-navy focus:bg-white"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                        aria-label={showNew ? "Hide new password" : "Show new password"}
                      >
                        {showNew ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
                      </button>
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="mt-1.5 text-xs font-bold text-red-500 flex items-start gap-1 leading-snug">
                        <FiAlertCircle className="mt-0.5 shrink-0" />
                        <span>{passwordErrors.newPassword}</span>
                      </p>
                    )}
                  </label>

                  {/* Confirm New Password Field */}
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Confirm New Password
                    </span>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (passwordErrors.confirmPassword) {
                            setPasswordErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.confirmPassword;
                              return copy;
                            });
                          }
                        }}
                        className={`h-11 w-full rounded-xl border pl-4 pr-11 text-sm font-semibold text-slate-700 outline-none transition ${
                          passwordErrors.confirmPassword
                            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                            : "border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:border-haiti-navy focus:bg-white"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                        aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                      >
                        {showConfirm ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
                      </button>
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1">
                        <FiAlertCircle />
                        {passwordErrors.confirmPassword}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              {/* Bottom Notice & Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                {passwordSubmitNotice && (
                  <div className="mb-4 flex gap-2.5 rounded-xl border border-blue-100 bg-blue-50/40 p-4.5 text-xs font-semibold text-haiti-navy">
                    <FiAlertCircle className="size-4 shrink-0 text-blue-600" />
                    <span>{passwordSubmitNotice}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={passwordSubmitPending}
                    className="inline-flex min-h-11 min-w-[8.5rem] items-center justify-center gap-1.5 rounded-xl bg-haiti-navy px-5 text-sm font-bold text-white shadow-xs transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy disabled:pointer-events-none disabled:opacity-50"
                  >
                    {passwordSubmitPending ? (
                      <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      "Update Password"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetPasswordForm}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            </form>
          </article>
        </div>
      )}
    </section>
  );
};
