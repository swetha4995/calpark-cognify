import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import AvatarPlaceholder from './AvatarPlaceholder';

export default function AIMentorButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 lg:bottom-8 right-8 w-16 h-16 z-50 group"
      >
        {/* 3D AI Avatar in Floating Button */}
        <AvatarPlaceholder size="md" userName="AI Mentor" />
        
        {/* Pulse Ring */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500"
        />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 w-96 h-[500px] bg-dark-surface border border-dark-border rounded-lg shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-dark-border">
              <div className="flex items-center gap-3">
                <AvatarPlaceholder size="sm" userName="AI Mentor" />
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">AI Mentor</h3>
                  <p className="text-xs text-text-muted">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-dark-border rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {/* Bot Message */}
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <AvatarPlaceholder size="sm" userName="AI" />
                </div>
                <div className="bg-dark-bg rounded-lg px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-text-primary">
                    Hello! I'm your AI mentor. How can I help you with your learning today?
                  </p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-dark-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <button className="btn-primary px-4 py-2.5">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
