import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../util/request";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({}); // 👈 now store field errors
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear field error while typing
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    try {
      const res = await request("auth/register", "post", form);
      setMessage(res.message);
      setStep(2);
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors); // Laravel returns field errors under "errors"
      } else {
        setErrors({ general: err.message || "Registration failed." });
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    try {
      const res = await request("auth/verify-otp", "post", {
        email: form.email,
        otp,
      });
      setMessage(res.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setErrors({ general: err.message || "OTP verification failed." });
      }
    }
  };

  const handleResendOtp = async () => {
    setErrors({});
    setMessage("");

    try {
      const res = await request("auth/resend-otp", "post", {
        email: form.email,
      });
      setMessage(res.message);
      setCooldown(30);
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setErrors({ general: err.message || "Failed to resend OTP." });
      }
    }
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
  return (
    <div className="min-h-screen bg-[#131313] flex items-center justify-center px-4">
      <div className="bg-[#1c1c1e] w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-800">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          {step === 1 ? "Create Account" : "Verify OTP"}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 rounded-lg bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-4 py-2 rounded-lg bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-4 py-2 rounded-lg bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <p className="text-red-500 text-sm text-center mt-2">
                {errors.general}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-medium transition duration-200"
            >
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.otp && (
              <p className="text-red-400 text-sm mt-1">{errors.otp}</p>
            )}
            {errors.general && (
              <p className="text-red-400 text-sm text-center mt-1">
                {errors.general}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition duration-200"
            >
              Verify OTP
            </button>

            <div className="text-center mt-3">
              {cooldown > 0 ? (
                <p className="text-gray-400 text-sm">
                  You can resend OTP in {cooldown}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-400 text-sm hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        )}

        {message && (
          <p className="text-green-400 text-sm text-center mt-6">{message}</p>
        )}

        {step === 1 && (
          <p className="text-sm text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-yellow-400 hover:underline"
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
