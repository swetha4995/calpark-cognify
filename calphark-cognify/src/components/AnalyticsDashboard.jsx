import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Target, Award, Calendar } from 'lucide-react';

const weeklyActivity = [
  { day: 'Mon', value: 45, label: 'M' },
  { day: 'Tue', value: 70, label: 'T' },
  { day: 'Wed', value: 85, label: 'W' },
  { day: 'Thu', value: 60, label: 'T' },
  { day: 'Fri', value: 95, label: 'F' },
  { day: 'Sat', value: 40, label: 'S' },
  { day: 'Sun', value: 55, label: 'S' },
];

const stats = [
  { label: 'Total Lessons', value: '42', change: '+12%', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
  { label: 'Study Time', value: '18h', change: '+8%', icon: Calendar, color: 'from-purple-500 to-pink-500' },
  { label: 'Accuracy', value: '87%', change: '+5%', icon: Target, color: 'from-green-500 to-emerald-500' },
  { label: 'Achievements', value: '24', change: '+3', icon: Award, color: 'from-orange-500 to-amber-500' },
];

const subjects = [
  { name: 'Mathematics', progress: 85, color: 'from-blue-500 to-cyan-500' },
  { name: 'Physics', progress: 72, color: 'from-purple-500 to-pink-500' },
  { name: 'Chemistry', progress: 68, color: 'from-green-500 to-emerald-500' },
  { name: 'Biology', progress: 90, color: 'from-orange-500 to-amber-500' },
];

export default function AnalyticsDashboard() {
  const maxValue = Math.max(...weeklyActivity.map(d => d.value));

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[24px] p-6 shadow-lg border border-gray-100"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-semibold">{stat.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[28px] p-8 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Activity</h3>
          <div className="flex items-end justify-between gap-3 h-48">
            {weeklyActivity.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.value / maxValue) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`w-full bg-gradient-to-t ${
                    day.value === maxValue 
                      ? 'from-purple-500 to-pink-500' 
                      : 'from-blue-500 to-cyan-500'
                  } rounded-t-xl relative group hover:opacity-80 transition-opacity cursor-pointer`}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {day.value} min
                  </div>
                </motion.div>
                <span className="text-xs font-medium text-gray-500">{day.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">450 minutes</span> this week 
              <span className="text-green-600 font-semibold ml-2">↗ +15%</span>
            </p>
          </div>
        </motion.div>

        {/* Subject Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[28px] p-8 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Subject Progress</h3>
          <div className="space-y-6">
            {subjects.map((subject, index) => (
              <div key={subject.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{subject.name}</span>
                  <span className="text-sm font-bold text-gray-800">{subject.progress}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${subject.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Average completion: <span className="font-semibold text-gray-800">81%</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Learning Streak Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[28px] p-8 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Learning Streak</h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {[...Array(28)].map((_, i) => {
            const intensity = Math.random();
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.01 }}
                className={`aspect-square rounded-lg ${
                  intensity > 0.7 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                    : intensity > 0.4 
                    ? 'bg-gradient-to-br from-green-300 to-emerald-400' 
                    : intensity > 0.2
                    ? 'bg-gradient-to-br from-green-200 to-emerald-200'
                    : 'bg-gray-100'
                } hover:scale-110 transition-transform cursor-pointer`}
                title={`Day ${i + 1}`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Less</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <div className="w-4 h-4 bg-green-200 rounded"></div>
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <div className="w-4 h-4 bg-green-600 rounded"></div>
          </div>
          <span className="text-gray-500">More</span>
        </div>
      </motion.div>
    </div>
  );
}
