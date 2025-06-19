import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileStore } from "../../store/profileStore";
import { request } from "../../util/request";
import ErrorMessage from "../../component/ErrorMessage";

const LoginPage = () => {
  const navigate = useNavigate();
  const { funLogin } = profileStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await request("auth/login", "post", form);
      funLogin(res.user, res.token);
      navigate("/");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
    }
  };

  const handleSocialLogin = (provider) => {
    const popup = window.open(
      `https://final-information-production.up.railway.app/api/auth/${provider}`,
      "_blank",
      "width=500,height=600"
    );

    const receiveMessage = (event) => {
      if (
        event.origin !== "https://final-information-production.up.railway.app"
      )
        return;

      const { user, token } = event.data || {};
      if (user && token) {
        funLogin(user, token);
        navigate("/");
      } else {
        setError("Social login failed.");
      }
    };

    window.addEventListener("message", receiveMessage);

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        window.removeEventListener("message", receiveMessage);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#131313] flex items-center justify-center px-4">
      <div className="bg-[#1c1c1e] w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-800">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full px-4 py-2 rounded-lg bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-lg bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {error && <ErrorMessage message={error} />}

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-medium transition duration-200"
          >
            Login
          </button>

          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-yellow-400 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
