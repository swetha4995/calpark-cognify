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
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,#dbeafe,transparent_35%),radial-gradient(circle_at_80%_20%,#c7d2fe,transparent_40%),linear-gradient(160deg,#f8fafc,#eef2ff)] flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      <motion.div
        animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-cyan-200/45 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -10, 0], y: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-indigo-300/45 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[30px] md:rounded-[36px] border border-white/70 bg-white/55 backdrop-blur-2xl shadow-[0_24px_80px_rgba(30,41,59,0.18)]"
      >
        <div className="hidden lg:flex relative p-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.28),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.35),transparent_45%)]" />
          <div className="relative z-10 self-end">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity }}
              className="w-20 h-20 rounded-2xl bg-cyan-400/20 border border-cyan-200/30 backdrop-blur-md mb-6 flex items-center justify-center"
            >
              <span className="text-4xl">C</span>
            </motion.div>
            <h2 className="text-4xl font-extrabold leading-tight">Learn smarter with AI-crafted study journeys.</h2>
            <p className="mt-4 text-slate-300 max-w-md">Professional roadmap guidance, adaptive quizzes, and mentor support in one premium workspace.</p>
          </div>
        </div>

        <div className="p-5 sm:p-6 md:p-10 lg:p-12 bg-white/70">
          <div className="mb-6 md:mb-8">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">Welcome Back</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 leading-tight">Sign in to Calphark Cognify</h1>
          </div>

          <div className="inline-flex rounded-2xl p-1.5 bg-slate-100 mb-5 md:mb-6 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                userType === 'student' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setUserType('teacher')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                userType === 'teacher' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Teacher
            </button>
          </div>

          <motion.form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full h-12 rounded-xl border border-slate-200 bg-white/90 px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="jondoe32@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-white/90 px-4 pr-12 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="********"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-rose-600 text-sm font-medium">
                {error}
              </motion.p>
            )}

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Secure authentication enabled</span>
              <button type="button" className="text-indigo-600 font-semibold hover:text-indigo-700">Forgot Password?</button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-lg shadow-indigo-200/70 hover:from-indigo-700 hover:to-cyan-600 transition"
            >
              Log in
            </motion.button>
          </motion.form>

          <p className="mt-6 md:mt-7 text-sm text-slate-500 text-center">
            Do not have an account? <button className="text-indigo-600 font-semibold hover:text-indigo-700">Sign up</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
