import { motion } from 'framer-motion';
import { Check, Circle, Lock } from 'lucide-react';

export default function RoadmapTimeline() {
  const steps = [
    { id: 1, title: 'Basics of Algebra', status: 'completed', date: 'Jan 15' },
    { id: 2, title: 'Linear Equations', status: 'completed', date: 'Jan 22' },
    { id: 3, title: 'Quadratic Functions', status: 'current', date: 'In Progress' },
    { id: 4, title: 'Polynomial Expressions', status: 'locked', date: 'Locked' },
    { id: 5, title: 'Advanced Calculus', status: 'locked', date: 'Locked' },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">Learning Roadmap</h2>
      </div>

      <div className="bg-dark-surface border border-dark-border rounded-lg p-8">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-dark-border"></div>
          
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="relative flex items-start gap-6"
              >
                {/* Status Icon */}
                <div className="relative z-10">
                  {step.status === 'completed' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {step.status === 'current' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-4 ring-primary/20">
                      <Circle className="w-4 h-4 text-white fill-white" />
                    </div>
                  )}
                  {step.status === 'locked' && (
                    <div className="w-8 h-8 rounded-full bg-dark-border flex items-center justify-center opacity-50">
                      <Lock className="w-4 h-4 text-text-muted" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 pb-2 ${step.status === 'locked' ? 'opacity-50' : ''}`}>
                  <h3 className={`text-lg font-semibold mb-1 ${
                    step.status === 'current' ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted">{step.date}</p>
                  
                  {step.status === 'current' && (
                    <div className="mt-3 flex items-center gap-3">
                      <button className="btn-primary text-sm py-2 px-4">
                        Continue
                      </button>
                      <span className="text-xs text-text-muted">45% complete</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
