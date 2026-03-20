import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

function Login({ onLogin }) {
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      setError("Please enter your email address");
      return;
    }
    
    if (!password) {
      setError("Please enter your password");
      return;
    }
    
    // Extract name from email for demo purposes
    const name = trimmedEmail.split('@')[0] || "Student";
    onLogin({ name: name.charAt(0).toUpperCase() + name.slice(1), email: trimmedEmail, userType });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      {/* Decorative Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (i % 4) * 0.6,
              repeat: Infinity,
              delay: (i % 6) * 0.35,
            }}
            className="absolute text-gray-300"
            style={{
              left: `${5 + ((i * 37) % 90)}%`,
              top: `${5 + ((i * 53) % 90)}%`,
              fontSize: `${10 + ((i * 7) % 12)}px`,
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-[40px] shadow-2xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left Side - Educational Elements */}
            <div className="hidden lg:flex items-center justify-center p-8 xl:p-12 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
              {/* Decorative Gradient Orbs */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-30" />
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30" />

              <div className="relative w-full max-w-md">
                {/* Educational Illustrations Container */}
                <div className="flex items-center justify-center">
                  <div className="relative w-full h-[500px]">
                    
                    {/* Books Stack - Bottom Left */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute bottom-0 left-0"
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[100px] filter drop-shadow-lg"
                      >
                        📚
                      </motion.div>
                    </motion.div>

                    {/* Computer/Monitor - Center Left */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="absolute top-16 left-0"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, -3, 3, 0],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[120px] filter drop-shadow-lg"
                      >
                        🖥️
                      </motion.div>
                    </motion.div>

                    {/* Backpack - Center */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                        }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[140px] filter drop-shadow-2xl"
                      >
                        🎒
                      </motion.div>
                    </motion.div>

                    {/* Number/ABC blocks - Top Left */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="absolute top-0 left-10"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[80px] filter drop-shadow-lg"
                      >
                        🔢
                      </motion.div>
                    </motion.div>

                    {/* Magnifying Glass - Bottom Right */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="absolute bottom-20 right-0"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.15, 1],
                          rotate: [0, 10, 0],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[80px] filter drop-shadow-lg"
                      >
                        🔍
                      </motion.div>
                    </motion.div>

                    {/* Clock - Top Right */}
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="absolute top-10 right-0"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="text-[70px] filter drop-shadow-lg"
                      >
                        ⏰
                      </motion.div>
                    </motion.div>

                    {/* Pencil/Ruler - Right Side */}
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="absolute top-1/3 right-10"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 15, -5, 0],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[60px] filter drop-shadow-lg"
                      >
                        ✏️
                      </motion.div>
                    </motion.div>

                    {/* Apple - Bonus decoration */}
                    <motion.div
                      initial={{ y: -30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="absolute bottom-5 right-20"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, -10, 10, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[50px] filter drop-shadow-lg"
                      >
                        🍎
                      </motion.div>
                    </motion.div>

                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="relative p-6 md:p-10 lg:p-12 flex flex-col justify-center bg-white">

              {/* User Type Toggle */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2 mb-6 lg:mb-8 relative z-10"
              >
                <button
                  type="button"
                  onClick={() => setUserType("student")}
                  className={`flex-1 px-8 py-3 rounded-full font-bold text-base transition-all duration-300 ${
                    userType === "student"
                      ? "bg-indigo-600 text-white shadow-lg scale-105"
                      : "bg-white text-indigo-600 border-2 border-indigo-200 hover:border-indigo-400"
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("teacher")}
                  className={`flex-1 px-8 py-3 rounded-full font-bold text-base transition-all duration-300 ${
                    userType === "teacher"
                      ? "bg-indigo-600 text-white shadow-lg scale-105"
                      : "bg-white text-indigo-600 border-2 border-indigo-200 hover:border-indigo-400"
                  }`}
                >
                  Teacher
                </button>
              </motion.div>

              {/* Login Card Header */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-[28px] p-6 lg:p-8 mb-6 lg:mb-8 text-center shadow-xl relative z-10"
              >
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-wide">LOG IN</h1>
              </motion.div>

              {/* Login Form */}
              <motion.form
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-5 lg:space-y-6 relative z-10"
              >
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-indigo-600 font-bold mb-2.5 text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-gray-800 placeholder:text-gray-400 text-base"
                    placeholder="jondoe32@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    autoFocus
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-indigo-600 font-bold mb-2.5 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-gray-800 pr-12 text-base"
                      placeholder="••••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors p-1"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-semibold"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Forgot Password */}
                <div className="text-left -mt-2">
                  <button
                    type="button"
                    className="text-indigo-600 text-sm font-bold hover:text-indigo-700 hover:underline transition-all"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-base"
                >
                  Log in
                </motion.button>
              </motion.form>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 lg:mt-8 text-center relative z-10"
              >
                <p className="text-gray-500 text-sm">
                  Don't have an account?{" "}
                  <button className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition-all">
                    Sign up
                  </button>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Calphark Cognify · AI-Powered Learning Platform
        </motion.p>
      </div>
    </div>
  );
}

export default Login;
