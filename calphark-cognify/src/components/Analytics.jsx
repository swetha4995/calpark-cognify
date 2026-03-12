import { motion } from 'framer-motion';
import { TrendingUp, Clock, Target } from 'lucide-react';

export default function Analytics() {
  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.1 },
    { day: 'Fri', hours: 2.9 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 2.2 },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Hours Chart */}
        <div className="lg:col-span-2 bg-dark-surface border border-dark-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Weekly Learning Hours</h3>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500 font-medium">+12%</span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between h-48 gap-4">
            {weeklyData.map((item, index) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-3">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.hours / maxHours) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
                  className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-bg px-2 py-1 rounded text-xs text-text-primary font-medium whitespace-nowrap">
                    {item.hours}h
                  </div>
                </motion.div>
                <span className="text-xs text-text-muted font-medium">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="space-y-6">
          {/* Total Time */}
          <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-text-secondary">Total Time</span>
            </div>
            <div className="text-3xl font-bold text-text-primary">20.2h</div>
            <div className="text-xs text-text-muted mt-1">This week</div>
          </div>

          {/* Goals Reached */}
          <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-sm text-text-secondary">Goals Reached</span>
            </div>
            <div className="text-3xl font-bold text-text-primary">8/10</div>
            <div className="text-xs text-text-muted mt-1">80% completion</div>
          </div>
        </div>
      </div>
    </section>
  );
}
