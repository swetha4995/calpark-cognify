import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { getGroqChatReply } from '../services/groqChat';

export default function AIMentorButton({ isDark = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      text: 'Welcome back! 👋 Ask me anything about your current lesson and I will break it down step by step.',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isThinking) return;

    const userPrompt = message.trim();

    setMessages((prev) => [
      ...prev,
      { type: 'user', text: userPrompt, timestamp: new Date() },
    ]);

    setMessage('');
    setIsThinking(true);

    const context = [
      ...messages.slice(-6).map((msg) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
      { role: 'user', content: userPrompt },
    ];

    try {
      const reply = await getGroqChatReply(context);
      setMessages((prev) => [
        ...prev,
        { type: 'ai', text: reply, timestamp: new Date() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: 'ai',
          text: 'I could not connect right now. Please try again in a moment.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 lg:bottom-8 right-6 w-16 h-16 z-50 group rounded-2xl ${
          isDark ? 'glass-dark' : 'glass'
        }`}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 via-emerald-400 to-teal-500 opacity-95 group-hover:opacity-100 transition-opacity" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute -inset-2 rounded-3xl bg-cyan-300/30 blur-lg"
        />
        <div className="relative z-10 h-full w-full rounded-2xl flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -2, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
              alt="AI Robot"
              className="h-9 w-9 object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
              loading="lazy"
            />
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="absolute -top-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white"
            />
          </motion.div>
        </div>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-28 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-[380px] h-[500px] z-50 flex flex-col overflow-hidden rounded-3xl ${
              isDark ? 'liquid-glass-dark' : 'liquid-glass'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 ${isDark ? 'border-slate-700' : 'border-slate-200'} border-b`}>
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center overflow-hidden skeu-card ${isDark ? 'skeu-card-dark' : ''}`}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                    alt="AI Robot"
                    className="h-6 w-6 object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>AI Mentor</h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Always here to help</p>
                </div>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className={`p-1.5 rounded-xl transition ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
              >
                <X className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-500'}`} />
              </motion.button>
            </div>

            {/* Messages Container */}
            <div className={`flex-1 p-4 overflow-y-auto space-y-3 scroll-smooth ${isDark ? 'bg-slate-900/50' : 'bg-slate-50/30'}`}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} gap-2.5`}
                >
                  {msg.type === 'ai' && (
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-600'}`}>
                      <span className="text-xs font-bold">AI</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[72%] rounded-2xl px-3 py-2.5 text-sm animate-scale-spring ${
                      msg.type === 'user'
                        ? isDark
                          ? 'bg-indigo-600/80 text-white glass'
                          : 'bg-indigo-600 text-white'
                        : isDark
                        ? 'glass-dark skeu-card-dark'
                        : 'skeu-card'
                    }`}
                  >
                    <p className={`break-words whitespace-pre-wrap ${msg.type === 'user' ? 'text-white' : isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      {msg.text}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${isDark ? 'bg-cyan-900/40 text-cyan-300' : 'bg-cyan-100 text-cyan-700'}`}>
                    <span className="text-[10px] font-bold">AI</span>
                  </div>
                  <div className={`rounded-2xl px-3 py-2 ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '120ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '240ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className={`p-3 border-t ${isDark ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-white/50'}`}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className={`flex-1 h-10 rounded-xl px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                    isDark
                      ? 'bg-slate-800 border border-slate-700 text-slate-100 focus:ring-indigo-500/50'
                      : 'bg-white border border-slate-200 text-slate-700 focus:ring-indigo-200'
                  }`}
                />
                <motion.button
                  type="submit"
                  disabled={isThinking || !message.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white inline-flex items-center justify-center transition"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
