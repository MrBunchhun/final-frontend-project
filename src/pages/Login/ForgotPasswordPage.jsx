import { useState } from "react";
import { request } from "../../util/request";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await request("auth/request-password-reset", "post", {
        email,
      });
      setMessage(res.message);
    } catch (err) {
      setError(err?.error || "Failed to reset!.");
    }
  };

  return (
  <div className="min-h-screen bg-[#131313] flex items-center justify-center px-4">
    <div className="bg-[#1c1c1e] w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-800">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        Forgot Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 rounded-lg bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-medium transition duration-200"
        >
          Send to Reset
        </button>
      </form>

      {message && (
        <p className="text-green-400 text-sm text-center mt-6">{message}</p>
      )}

      {error && (
        <p className="text-red-500 text-sm text-center mt-6">{error}</p>
      )}
    </div>
  </div>
);
};

export default ForgotPasswordPage;
