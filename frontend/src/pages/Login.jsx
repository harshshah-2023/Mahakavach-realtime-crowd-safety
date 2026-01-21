import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-6 py-10 font-inter select-none">

      {/* Outer container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-xl p-8"
      >

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-emirates text-3xl text-dark mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm">
            Login to access your dashboard, alerts and community.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          <div>
            <label className="text-sm text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white text-sm py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 text-center">
          <div className="border-t border-gray-200"></div>
        </div>

        {/* Signup Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Don’t have an account?</span>{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
