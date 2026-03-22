import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Login from "./components/Login";
import TopNavBar from "./components/TopNavBar";
import LeftSidebar from "./components/LeftSidebar";
import BottomNavigation from "./components/BottomNavigation";
import WelcomeHeroSection from "./components/WelcomeHeroSection";
import XPProgressCard from "./components/XPProgressCard";
import LessonExplorer from "./components/LessonExplorer";
import LearningRoadmapComponent from "./components/LearningRoadmapComponent";
import LeaderboardWidget from "./components/LeaderboardWidget";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import AIMentorCard from "./components/AIMentorCard";
import AIMentorButton from "./components/AIMentorButton";
import TodaysTargetsCard from "./components/TodaysTargetsCard";
import DailyChallengeCard from "./components/DailyChallengeCard";
import LevelProgress from "./components/LevelProgress";
import { PerformanceFeedbackDemo } from "./components/PerformanceFeedbackDemo";
import { QuizIntegration } from "./components/QuizIntegration";

const DEFAULT_SETTINGS = {
  theme: "light",
  notifications: true,
  soundEffects: true,
  reminderTime: "19:00",
};

const ACHIEVEMENTS = [
  { id: 1, title: "5-Day Streak", icon: "🔥", earned: true, description: "Studied for 5 days in a row." },
  { id: 2, title: "Quiz Master", icon: "🧠", earned: true, description: "Scored 90%+ in a quiz." },
  { id: 3, title: "Roadmap Explorer", icon: "🗺️", earned: true, description: "Completed first roadmap section." },
  { id: 4, title: "Focused Learner", icon: "🎯", earned: false, description: "Complete 3 practice sessions in one day." },
  { id: 5, title: "XP Champion", icon: "🏆", earned: false, description: "Reach 5000 XP." },
  { id: 6, title: "Consistency Pro", icon: "📈", earned: false, description: "Maintain a 14-day streak." },
];

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("home");
  const [isNavigating, setIsNavigating] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState(null);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("calphark-settings");
    if (!saved) return DEFAULT_SETTINGS;
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });
  const [lastActionMessage, setLastActionMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("calphark-settings", JSON.stringify(settings));
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
  }, [settings]);

  const isDark = settings.theme === "dark";

  useEffect(() => {
    if (!lastActionMessage) return;
    const timer = setTimeout(() => setLastActionMessage(""), 2200);
    return () => clearTimeout(timer);
  }, [lastActionMessage]);

  const cardClass = useMemo(
    () =>
      isDark
        ? "rounded-2xl border border-slate-700 bg-slate-800/90 p-6 text-slate-100 shadow-lg"
        : "card-premium p-6",
    [isDark]
  );

  const handleLogin = (userData) => {
    setUser({
      name: userData.name,
      email: userData.email || '',
      userType: userData.userType || 'student',
      level: 12,
      xp: 2840,
      xpMax: 3000,
      streak: 8,
    });
  };

  const handleNavigate = (view) => {
    setIsNavigating(true);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => setIsNavigating(false), 420);
  };

  const handleStartLesson = (id) => {
    setLastActionMessage(`Lesson ${id} opened in practice mode.`);
    setCurrentView("quiz");
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentView("home");
  };

  const toggleTheme = () => {
    setSettings((prev) => ({ ...prev, theme: prev.theme === "dark" ? "light" : "dark" }));
  };

  // Show login screen if user is not logged in
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Render content based on current view
  const renderMainContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="space-y-8 overflow-x-hidden">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <WelcomeHeroSection 
                userName={user.name}
                onStartLearning={() => handleNavigate('lessons')}
                isDark={isDark}
              />
            </motion.div>

            <div className="grid xl:grid-cols-12 gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08, duration: 0.35 }}
                className="xl:col-span-8 space-y-6 min-w-0"
              >
                <div className="min-w-0 overflow-hidden rounded-2xl">
                  <XPProgressCard user={user} isDark={isDark} />
                </div>
                <div className="min-w-0 overflow-hidden rounded-2xl">
                  <LearningRoadmapComponent isDark={isDark} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.14, duration: 0.35 }}
                className="xl:col-span-4 space-y-6 min-w-0"
              >
                <div className="min-w-0 overflow-hidden rounded-2xl">
                  <AIMentorCard onOpenMentor={() => handleNavigate('mentor')} isDark={isDark} />
                </div>
                <div className="min-w-0 overflow-hidden rounded-2xl">
                  <TodaysTargetsCard isDark={isDark} />
                </div>
                <div className="min-w-0 overflow-hidden rounded-2xl">
                  <LeaderboardWidget isDark={isDark} />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="min-w-0"
            >
              <LessonExplorer onStartLesson={handleStartLesson} isDark={isDark} />
            </motion.div>
          </div>
        );
      
      case 'roadmap':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`${cardClass} p-6 md:p-8 overflow-hidden`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                  <span className="text-3xl">🗺️</span>
                </div>
                <div className="min-w-0">
                  <h1 className={`text-2xl md:text-3xl font-bold break-words ${isDark ? "text-slate-100" : "text-gray-900"}`}>Learning Roadmap</h1>
                  <p className={`${isDark ? "text-slate-300" : "text-gray-600"} mt-1 break-words`}>Track your personalized learning journey</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.35 }}
              className="grid lg:grid-cols-12 gap-6 items-start"
            >
              <div className="lg:col-span-8 min-w-0">
                <LearningRoadmapComponent isDark={isDark} />
              </div>
              <div className="lg:col-span-4 min-w-0 space-y-6">
                <div className={cardClass}>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>Roadmap Focus</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    Complete the current Algebra module first, then unlock Linear Equations. Keep sessions short and daily for better retention.
                  </p>
                </div>
                <div className={cardClass}>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>Next Session Plan</h3>
                  <ul className={`space-y-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    <li>1. Revise one solved example.</li>
                    <li>2. Practice two equation questions.</li>
                    <li>3. Finish one checkpoint quiz.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        );
      
      case 'lessons':
        return (
          <div className="space-y-6">
            <div className={`${cardClass} p-8`}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">📚</span>
                </div>
                <div>
                  <h1 className={`text-3xl font-bold ${isDark ? "text-slate-100" : "text-gray-900"}`}>All Lessons</h1>
                  <p className={`${isDark ? "text-slate-300" : "text-gray-600"} mt-1`}>Explore our comprehensive learning content</p>
                </div>
              </div>
            </div>
            <LessonExplorer onStartLesson={handleStartLesson} isDark={isDark} />
          </div>
        );

      case 'games':
        return (
          <div className="space-y-6">
            <div className="liquid-glass rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 border-0 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🎮</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Practice Arena</h1>
                  <p className="text-white/90 mt-1">Gamified practice sessions and challenge rounds</p>
                </div>
              </div>
            </div>

            <div className="grid xl:grid-cols-12 gap-6">
              <div className="xl:col-span-5">
                <DailyChallengeCard />
              </div>
              <div className="xl:col-span-7 space-y-4">
                {[
                  { title: "Lightning Round", subtitle: "10 quick questions in 3 minutes", badge: "+90 XP" },
                  { title: "Accuracy Sprint", subtitle: "Focus on correctness under pressure", badge: "+120 XP" },
                  { title: "Revision Battle", subtitle: "Mixed-topic challenge mode", badge: "+150 XP" },
                ].map((mode, index) => (
                  <motion.div
                    key={mode.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={`${cardClass} flex items-center justify-between`}
                  >
                    <div>
                      <h3 className={`text-lg font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{mode.title}</h3>
                      <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>{mode.subtitle}</p>
                    </div>
                    <button
                      onClick={() => handleNavigate("quiz")}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all"
                    >
                      Start {mode.badge}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <div className="liquid-glass rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-8 border-0 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🏅</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Achievements</h1>
                  <p className="text-white/90 mt-1">Track streaks, badges, and milestone rewards</p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className={`${cardClass} space-y-4`}>
                  <h3 className={`text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Badge Collection</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {ACHIEVEMENTS.map((item) => (
                      <div
                        key={item.id}
                        className={`rounded-xl border p-4 ${
                          item.earned
                            ? isDark
                              ? "border-emerald-500/50 bg-emerald-500/10"
                              : "border-emerald-200 bg-emerald-50"
                            : isDark
                            ? "border-slate-700 bg-slate-900/50"
                            : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <p className={`font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{item.title}</p>
                            <p className={`text-xs ${item.earned ? "text-emerald-600" : isDark ? "text-slate-400" : "text-slate-500"}`}>
                              {item.earned ? "Unlocked" : "Locked"}
                            </p>
                          </div>
                        </div>
                        <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <LevelProgress level={user.level} title="Scholar Path" progress={95} />
                <div className={cardClass}>
                  <h4 className={`font-semibold mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>Next Milestone</h4>
                  <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>Earn 160 XP to unlock "XP Champion".</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="space-y-6">
            <div className="liquid-glass rounded-3xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500 p-8 border-0 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🏆</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Leaderboard</h1>
                  <p className="text-white/90 mt-1">Compare progress with top learners this week</p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className={`${cardClass} p-0 overflow-hidden`}>
                  {["Sarah Chen", "Alex Kumar", user.name, "Maya Wilson", "Jordan Lee"].map((name, idx) => (
                    <div
                      key={name}
                      className={`flex items-center justify-between px-5 py-4 ${
                        idx !== 4 ? (isDark ? "border-b border-slate-700" : "border-b border-slate-100") : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${idx < 3 ? "bg-amber-100 text-amber-700" : isDark ? "bg-slate-700 text-slate-100" : "bg-slate-100 text-slate-700"}`}>
                          #{idx + 1}
                        </div>
                        <div>
                          <p className={`font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{name}</p>
                          <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Streak: {12 - idx} days</p>
                        </div>
                      </div>
                      <p className={`font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{3000 - idx * 120} XP</p>
                    </div>
                  ))}
                </div>
              </div>
              <LeaderboardWidget isDark={isDark} />
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="card-premium bg-gradient-to-br from-primary-500 via-accent-500 to-accent-600 p-8 border-0 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">📊</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Progress Analytics</h1>
                  <p className="text-white/90 mt-1">Track your learning journey and achievements</p>
                </div>
              </div>
            </div>
            <AnalyticsDashboard />
          </div>
        );
      
      case 'mentor':
        return (
          <div className="space-y-6">
            <div className="card-premium bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-8 border-0 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🤖</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">AI Mentor</h1>
                  <p className="text-white/90 mt-1">Your personal learning assistant is ready to help!</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`${cardClass} hover:shadow-xl transition-all`}>
                <div className="text-4xl mb-3">💬</div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-slate-100" : "text-gray-900"}`}>Ask Questions</h3>
                <p className={`text-sm ${isDark ? "text-slate-300" : "text-gray-600"}`}>Get instant answers to your doubts</p>
              </div>
              <div className={`${cardClass} hover:shadow-xl transition-all`}>
                <div className="text-4xl mb-3">📝</div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-slate-100" : "text-gray-900"}`}>Homework Help</h3>
                <p className={`text-sm ${isDark ? "text-slate-300" : "text-gray-600"}`}>Step-by-step problem solving</p>
              </div>
              <div className={`${cardClass} hover:shadow-xl transition-all`}>
                <div className="text-4xl mb-3">🎯</div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-slate-100" : "text-gray-900"}`}>Personalized Tips</h3>
                <p className={`text-sm ${isDark ? "text-slate-300" : "text-gray-600"}`}>Custom learning recommendations</p>
              </div>
            </div>

            <div className={`${cardClass} p-8 text-center`}>
              <div className="max-w-2xl mx-auto">
                <div className="text-6xl mb-4">💡</div>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-slate-100" : "text-gray-900"}`}>Start Chatting</h3>
                <p className={`${isDark ? "text-slate-300" : "text-gray-600"} mb-6`}>Click the AI Mentor button in the bottom-right corner to start a conversation.</p>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className={`${cardClass} p-8`}>
              <h1 className={`text-3xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Settings</h1>
              <p className={`${isDark ? "text-slate-300" : "text-slate-600"} mt-2`}>Control app theme and study preferences.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className={`${cardClass} space-y-5`}>
                <h3 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Appearance</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`}>Theme Mode</p>
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Switch between dark and light UI.</p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isDark ? "bg-slate-700 text-slate-100 hover:bg-slate-600" : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    }`}
                  >
                    {isDark ? "Dark" : "Light"}
                  </button>
                </div>
              </div>

              <div className={`${cardClass} space-y-5`}>
                <h3 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Learning Preferences</h3>

                <label className="flex items-center justify-between">
                  <span className={isDark ? "text-slate-200" : "text-slate-800"}>Notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={() => setSettings((prev) => ({ ...prev, notifications: !prev.notifications }))}
                    className="h-4 w-4"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className={isDark ? "text-slate-200" : "text-slate-800"}>Sound Effects</span>
                  <input
                    type="checkbox"
                    checked={settings.soundEffects}
                    onChange={() => setSettings((prev) => ({ ...prev, soundEffects: !prev.soundEffects }))}
                    className="h-4 w-4"
                  />
                </label>

                <div className="flex items-center justify-between gap-3">
                  <span className={isDark ? "text-slate-200" : "text-slate-800"}>Daily Reminder</span>
                  <input
                    type="time"
                    value={settings.reminderTime}
                    onChange={(e) => setSettings((prev) => ({ ...prev, reminderTime: e.target.value }))}
                    className={`rounded-lg px-3 py-2 border ${
                      isDark
                        ? "bg-slate-900 border-slate-700 text-slate-100"
                        : "bg-white border-slate-300 text-slate-800"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="card-premium p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quiz & Performance Demo</h1>
                    <p className="text-gray-600 mt-1">Take a quiz to see the performance feedback system in action</p>
                  </div>
                </div>
                {performanceLevel && (
                  <button
                    onClick={() => setPerformanceLevel(null)}
                    className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-all"
                  >
                    Reset Background
                  </button>
                )}
              </div>
            </div>
            <QuizIntegration 
              isDark={isDark}
              soundEffects={settings.soundEffects}
              onQuizComplete={(score) => {
                // Determine performance level based on score
                if (score >= 80) {
                  setPerformanceLevel('high');
                } else if (score >= 50) {
                  setPerformanceLevel('average');
                } else {
                  setPerformanceLevel('low');
                }
              }}
            />
          </div>
        );
      
      default:
        return (
          <div className={`${cardClass} p-12 text-center`}>
            <div className="text-6xl mb-4">🚧</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-slate-100" : "text-gray-900"}`}>Coming Soon</h2>
            <p className={isDark ? "text-slate-300" : "text-gray-600"}>This feature is under development</p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ease-out ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800'
        : performanceLevel === 'high' 
        ? 'bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50' 
        : performanceLevel === 'average'
        ? 'bg-gradient-to-br from-blue-50 via-purple-50 to-lavender-50'
        : performanceLevel === 'low'
        ? 'bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50'
        : 'bg-slate-50'
    }`}>
      <div className={`fixed inset-0 pointer-events-none ${isDark ? "bg-[radial-gradient(circle_at_top,#1e293b,transparent_60%),linear-gradient(to_bottom,#020617,#111827)]" : "bg-[radial-gradient(circle_at_top,#eef2ff,transparent_55%),linear-gradient(to_bottom,#f8fafc,#f8fafc)]"}`} />

      {/* Main App Container */}
      <div className="relative z-10">
        {isNavigating && (
          <div className="fixed left-0 top-0 z-[90] h-1 w-full overflow-hidden bg-transparent">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut', repeat: Infinity }}
              className="h-full w-1/2 bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500"
            />
          </div>
        )}

        <TopNavBar
          user={user}
          onNavigate={handleNavigate}
          onSignOut={handleSignOut}
          onToggleTheme={toggleTheme}
          isDark={isDark}
        />

        <div className="pt-[73px]">
          <LeftSidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            isDark={isDark}
          />

          <main 
            className={`transition-all duration-300 ease-in-out pb-24 lg:pb-8 ${
              sidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]'
            }`}
          >
            <div className="container-professional py-6 md:py-7">
              <div className="animate-fade-in max-w-[1240px] mx-auto">
                {renderMainContent()}
              </div>
            </div>
          </main>

          <BottomNavigation currentView={currentView} onNavigate={handleNavigate} isDark={isDark} />
        </div>

        {/* Floating AI Mentor Button */}
        <AIMentorButton isDark={isDark} />
      </div>

      {lastActionMessage && (
        <div className="fixed right-4 top-24 z-[70] rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          {lastActionMessage}
        </div>
      )}
    </div>
  );
}

export default App;
