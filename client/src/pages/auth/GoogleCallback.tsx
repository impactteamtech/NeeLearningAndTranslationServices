import { useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGoogleCallbackMutation } from "../../features/auth/authQueries";
import { dashboardPathByRole } from "../../features/auth/authRouting";

export const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const callback = useGoogleCallbackMutation();
  const submittedCode = useRef<string | null>(null);
  const code = searchParams.get("code");
  const providerError = searchParams.get("error");

  useEffect(() => {
    if (!code || submittedCode.current === code) return;
    submittedCode.current = code;

    callback.mutate(code, {
      onSuccess: (user) => {
        navigate(dashboardPathByRole[user.role], { replace: true });
      },
    });
  }, [callback, code, navigate]);

  const errorMessage = providerError
    ? "Google sign-in was cancelled or denied."
    : !code
      ? "Google did not return an authorization code."
      : callback.error instanceof Error
        ? callback.error.message
        : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">
        {errorMessage ? (
          <>
            <h1 className="text-2xl font-bold text-haiti-navy">Unable to sign in</h1>
            <p className="mt-3 text-sm text-slate-500">{errorMessage}</p>
            <Link
              to="/login"
              className="mt-6 inline-flex rounded-full bg-haiti-navy px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
            >
              Return to login
            </Link>
          </>
        ) : (
          <>
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-haiti-navy/20 border-t-haiti-navy" />
            <h1 className="mt-6 text-2xl font-bold text-haiti-navy">Completing Google sign-in</h1>
            <p className="mt-2 text-sm text-slate-500">Please keep this page open.</p>
          </>
        )}
      </section>
    </main>
  );
};

export default GoogleCallback;
