import { useState } from "react";
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
import { PerformanceFeedbackDemo } from "./components/PerformanceFeedbackDemo";
import { QuizResultScreen } from "./components/QuizResultScreen";
import { QuizIntegration } from "./components/QuizIntegration";

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState(null); // Track performance level for persistent background

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
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <div className="space-y-8">
            <WelcomeHeroSection 
              userName={user.name}
              onStartLearning={() => handleNavigate('lessons')}
            />
            
            <div className="grid xl:grid-cols-12 gap-6">
              <div className="xl:col-span-8 space-y-6">
                <XPProgressCard user={user} />
                <LearningRoadmapComponent />
              </div>

              <div className="xl:col-span-4 space-y-6">
                <AIMentorCard onOpenMentor={() => handleNavigate('mentor')} />
                <TodaysTargetsCard />
                <LeaderboardWidget />
              </div>
            </div>

            <LessonExplorer onStartLesson={(id) => console.log('Start lesson:', id)} />
          </div>
        );
      
      case 'roadmap':
        return (
          <div className="space-y-6">
            <div className="card-premium p-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🗺️</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Learning Roadmap</h1>
                  <p className="text-gray-600 mt-1">Track your personalized learning journey</p>
                </div>
              </div>
            </div>
            <LearningRoadmapComponent />
          </div>
        );
      
      case 'lessons':
        return (
          <div className="space-y-6">
            <div className="card-premium p-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">📚</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">All Lessons</h1>
                  <p className="text-gray-600 mt-1">Explore our comprehensive learning content</p>
                </div>
              </div>
            </div>
            <LessonExplorer onStartLesson={(id) => console.log('Start lesson:', id)} />
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
              <div className="card-premium p-6 hover:shadow-xl transition-all">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ask Questions</h3>
                <p className="text-sm text-gray-600">Get instant answers to your doubts</p>
              </div>
              <div className="card-premium p-6 hover:shadow-xl transition-all">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Homework Help</h3>
                <p className="text-sm text-gray-600">Step-by-step problem solving</p>
              </div>
              <div className="card-premium p-6 hover:shadow-xl transition-all">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Personalized Tips</h3>
                <p className="text-sm text-gray-600">Custom learning recommendations</p>
              </div>
            </div>

            <div className="card-premium p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Start Chatting</h3>
                <p className="text-gray-600 mb-6">Click the AI Mentor button in the bottom-right corner to start a conversation!</p>
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
          <div className="card-premium p-12 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
            <p className="text-gray-600">This feature is under development</p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ease-out ${
      performanceLevel === 'high' 
        ? 'bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50' 
        : performanceLevel === 'average'
        ? 'bg-gradient-to-br from-blue-50 via-purple-50 to-lavender-50'
        : performanceLevel === 'low'
        ? 'bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50'
        : 'bg-slate-50'
    }`}>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#eef2ff,transparent_55%),linear-gradient(to_bottom,#f8fafc,#f8fafc)] pointer-events-none" />

      {/* Main App Container */}
      <div className="relative z-10">
        <TopNavBar user={user} onNavigate={handleNavigate} />

        <div className="pt-[73px]">
          <LeftSidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
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

          <BottomNavigation currentView={currentView} onNavigate={handleNavigate} />
        </div>

        {/* Floating AI Mentor Button */}
        <AIMentorButton />
      </div>
    </div>
  );
}

export default App;
