import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaGoogle, FaCheck, FaTimes } from "react-icons/fa";
import { HiArrowRight, HiSparkles } from "react-icons/hi";
import AuthBrandPanel from "../../components/auth/AuthBrandPanel";
import {
  useGoogleAuthorizationMutation,
  useRegisterMutation,
} from "../../features/auth/authQueries";
import { dashboardPathByRole } from "../../features/auth/authRouting";

export const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const googleMutation = useGoogleAuthorizationMutation();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const isSubmitting = registerMutation.isPending;

  // Password criteria computation
  const password = formState.password;
  const passwordCriteria = {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasUpperOrSpecial: /[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formState.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formState.password) {
      newErrors.password = "Password is required";
    } else {
      if (!passwordCriteria.minLength) {
        newErrors.password = "Password must meet all security guidelines";
      }
      if (!passwordCriteria.hasNumber) {
        newErrors.password = "Password must meet all security guidelines";
      }
      if (!passwordCriteria.hasUpperOrSpecial) {
        newErrors.password = "Password must meet all security guidelines";
      }
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registerMutation.mutate(
      {
        registration: {
          full_name: formState.name.trim(),
          email: formState.email.trim(),
          password: formState.password,
        },
      },
      {
        onSuccess: (user) => {
          setRegisterSuccess(true);
          navigate(dashboardPathByRole[user.role], { replace: true });
        },
      }
    );
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-stretch font-sans selection:bg-haiti-red/20 selection:text-haiti-navy">
      
      <AuthBrandPanel mode="register" />

      {/* Right Panel - Register Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-white">
        
        {/* Floating background blobs for mobile */}
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-haiti-red/5 blur-3xl pointer-events-none lg:hidden" />
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-haiti-navy/5 blur-3xl pointer-events-none lg:hidden" />

        <div className="w-full max-w-[460px] flex flex-col gap-8 relative z-10">
          
          {/* Logo for mobile only */}
          <div className="flex flex-col items-center text-center gap-2 lg:hidden">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <img src="/logo.png" alt="Nee Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-2.5 text-center lg:text-left">
            <span className="inline-flex items-center justify-center lg:justify-start gap-2 text-xs uppercase tracking-widest font-bold text-haiti-red">
              <HiSparkles className="w-3.5 h-3.5 animate-pulse" />
              Nee's Learning Portal
            </span>
            <h1 className="font-roxborough font-bold text-3xl sm:text-4xl text-haiti-navy tracking-tight">
              Create Your Account
            </h1>
            <p className="text-gray-500 text-sm font-sans">
              Sign up today and get full access to lessons, translation tracking, and cultural workshops.
            </p>
          </div>

          {registerSuccess ? (
            /* Success Screen Animation */
            <div className="flex flex-col items-center justify-center text-center gap-6 py-8 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-haiti-red/10 border border-haiti-red/20 flex items-center justify-center text-haiti-red shadow-lg animate-bounce">
                <FaCheck className="w-8 h-8" />
              </div>
              <h3 className="font-roxborough font-bold text-2xl text-haiti-navy">Registration Completed!</h3>
              <p className="max-w-xs text-sm text-gray-500 leading-relaxed font-sans">
                Mèsi ampil! Welcome to Nee's Learning portal. A confirmation link has been sent to your email. Redirecting you to your portal...
              </p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4">
                <div className="bg-linear-to-r from-[#00209F] to-haiti-red h-full w-[45%] rounded-full animate-marquee" style={{ animationDuration: "1.5s" }} />
              </div>
            </div>
          ) : (
            /* Registration Form */
            <div className="flex flex-col gap-7">
              {/* Social Login Buttons */}
              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={() => googleMutation.mutate()}
                  disabled={googleMutation.isPending}
                  className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-gray-400 bg-white hover:bg-slate-50 hover:border-gray-300 font-sans text-xs font-semibold text-gray-700 cursor-pointer hover:-translate-y-0.5 transition-all duration-300 shadow-xs"
                >
                  {googleMutation.isPending ? (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-haiti-navy" />
                  ) : (
                    <FaGoogle className="w-4 h-4 text-red-500" />
                  )}
                  <span>Continue with Google</span>
                </button>
             
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">or register with email</span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {(registerMutation.error || googleMutation.error) && (
                  <p role="alert" className="rounded-xl border border-haiti-red/15 bg-haiti-red/5 px-4 py-3 text-xs font-semibold text-haiti-red">
                    {(registerMutation.error ?? googleMutation.error)?.message}
                  </p>
                )}
                
                {/* Full Name field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider font-bold text-haiti-navy/70">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaUser className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-5 py-3.5 rounded-xl border font-sans text-sm focus:outline-none transition-all duration-300 bg-slate-50/30 hover:bg-slate-50/50 focus:bg-white ${
                        errors.name 
                          ? "border-haiti-red focus:border-haiti-red focus:ring-4 focus:ring-haiti-red/5" 
                          : "border-blue-700/15 focus:border-haiti-navy focus:ring-4 focus:ring-haiti-navy/5"
                      }`}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  {errors.name && (
                    <span className="text-[11px] text-haiti-red font-semibold mt-0.5">{errors.name}</span>
                  )}
                </div>

                {/* Email address field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-haiti-navy/70">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaEnvelope className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-5 py-3.5 rounded-xl border font-sans text-sm focus:outline-none transition-all duration-300 bg-slate-50/30 hover:bg-slate-50/50 focus:bg-white ${
                        errors.email 
                          ? "border-haiti-red focus:border-haiti-red focus:ring-4 focus:ring-haiti-red/5" 
                          : "border-blue-700/15 focus:border-haiti-navy focus:ring-4 focus:ring-haiti-navy/5"
                      }`}
                      placeholder="name@example.com"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[11px] text-haiti-red font-semibold mt-0.5">{errors.email}</span>
                  )}
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-xs uppercase tracking-wider font-bold text-haiti-navy/70">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaLock className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formState.password}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-12 py-3.5 rounded-xl border font-sans text-sm focus:outline-none transition-all duration-300 bg-slate-50/30 hover:bg-slate-50/50 focus:bg-white ${
                        errors.password 
                          ? "border-haiti-red focus:border-haiti-red focus:ring-4 focus:ring-haiti-red/5" 
                          : "border-blue-700/15 focus:border-haiti-navy focus:ring-4 focus:ring-haiti-navy/5"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-haiti-navy transition-colors duration-200 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Real-time reactive password validation checklists */}
                  <div className="mt-2.5 p-3.5 bg-slate-50 rounded-xl border border-blue-700/5 flex flex-col gap-2">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Security Guidelines</p>
                    <div className="flex flex-col gap-1.5 mt-0.5">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        {passwordCriteria.minLength ? (
                          <FaCheck className="text-green-500 w-3 h-3" />
                        ) : (
                          <FaTimes className="text-gray-400 w-3 h-3" />
                        )}
                        <span className={passwordCriteria.minLength ? "text-green-600" : "text-gray-500"}>
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        {passwordCriteria.hasNumber ? (
                          <FaCheck className="text-green-500 w-3 h-3" />
                        ) : (
                          <FaTimes className="text-gray-400 w-3 h-3" />
                        )}
                        <span className={passwordCriteria.hasNumber ? "text-green-600" : "text-gray-500"}>
                          At least one number (0-9)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        {passwordCriteria.hasUpperOrSpecial ? (
                          <FaCheck className="text-green-500 w-3 h-3" />
                        ) : (
                          <FaTimes className="text-gray-400 w-3 h-3" />
                        )}
                        <span className={passwordCriteria.hasUpperOrSpecial ? "text-green-600" : "text-gray-500"}>
                          At least one uppercase letter or special character
                        </span>
                      </div>
                    </div>
                  </div>
                  {errors.password && (
                    <span className="text-[11px] text-haiti-red font-semibold mt-0.5">{errors.password}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative inline-flex items-center justify-center gap-3 bg-linear-to-br from-[#080c18] via-[#0d1f7a] to-[#00209F] text-white py-4 px-8 rounded-full font-sans text-xs font-bold tracking-[0.12em] uppercase cursor-pointer border-none shadow-[0_4px_20px_rgba(0,32,159,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,32,159,0.45)] active:translate-y-0 disabled:opacity-75 disabled:cursor-not-allowed group mt-3 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <HiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Mobile back link */}
                <Link
                  to="/"
                  className="inline-flex lg:hidden items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-haiti-navy transition-colors duration-200 mt-2 font-semibold"
                >
                  ← Back to Home
                </Link>

              </form>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="text-center text-xs text-gray-500 border-t border-slate-100 pt-6 font-semibold">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-haiti-red hover:underline font-bold"
            >
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
