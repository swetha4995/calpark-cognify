import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { 
  X, Send, Bot, Loader2, Mic, Image, ThumbsUp, ThumbsDown, Copy, CheckCheck, 
  MessageSquare, Sparkles, Zap, ChevronDown, Moon, Sun, Cpu, Brain, BookOpen,
  Terminal, Code2, List, Hash, Quote, Link2, Bold, Italic, Sticker
} from 'lucide-react';
import { getGroqChatReply } from '../services/groqChat';

const SUGGESTIONS = [
  { icon: BookOpen, text: 'Explain a concept', color: 'from-blue-500 to-cyan-500' },
  { icon: LightbulbIcon, text: 'Get a hint', color: 'from-amber-500 to-orange-500' },
  { icon: Code2, text: 'Solve this problem', color: 'from-emerald-500 to-teal-500' },
  { icon: Brain, text: 'Create a quiz', color: 'from-violet-500 to-purple-500' },
];

function LightbulbIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
      <path d="M9 18h6"/><path d="M10 22h4"/>
    </svg>
  );
}

function TypingEffect({ text }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
}

function MessageBubble({ msg, isDark, onReaction, onCopy, copiedId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
            msg.type === 'ai'
              ? 'bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500'
              : 'bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500'
          }`}
        >
          {msg.type === 'ai' ? (
            <Bot className="w-5 h-5 text-white" />
          ) : (
            <span className="text-white font-bold text-sm">ME</span>
          )}
        </motion.div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          {/* Message Box */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`relative rounded-2xl px-4 py-3 shadow-xl ${
              msg.type === 'user'
                ? 'bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white rounded-tr-sm'
                : isDark
                ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 rounded-tl-sm border border-slate-700/50'
                : 'bg-white text-slate-800 rounded-tl-sm border border-slate-200 shadow-xl'
            }`}
          >
            {/* Decorative corner */}
            <div className={`absolute top-0 ${msg.type === 'user' ? 'right-0' : 'left-0'} w-6 h-6 ${
              msg.type === 'user'
                ? 'bg-gradient-to-bl from-cyan-400 to-transparent rounded-bl-xl'
                : 'bg-gradient-to-br from-slate-300/50 to-transparent rounded-br-xl'
            }`} />
            
            <div className="relative">
              {msg.isTyping ? (
                <TypingEffect text={msg.text} />
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.text}</p>
              )}
            </div>
          </motion.div>

          {/* Actions & Meta */}
          <div className={`flex items-center gap-3 px-1 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <span className={`text-[11px] font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            
            {msg.type === 'ai' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-1"
              >
                {/* Copy */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onCopy(msg.text, msg.id)}
                  className={`p-1.5 rounded-lg transition-all ${
                    isDark 
                      ? 'hover:bg-slate-700 text-slate-500 hover:text-blue-400' 
                      : 'hover:bg-slate-100 text-slate-400 hover:text-blue-500'
                  }`}
                >
                  {copiedId === msg.id ? <CheckCheck className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                </motion.button>
                
                {/* Reactions */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onReaction(msg.id, 'up')}
                  className={`p-1.5 rounded-lg transition-all ${
                    msg.reactions === 'up' 
                      ? 'text-green-500 bg-green-500/20' 
                      : isDark 
                      ? 'hover:bg-slate-700 text-slate-500 hover:text-green-400' 
                      : 'hover:bg-slate-100 text-slate-400 hover:text-green-500'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onReaction(msg.id, 'down')}
                  className={`p-1.5 rounded-lg transition-all ${
                    msg.reactions === 'down' 
                      ? 'text-red-500 bg-red-500/20' 
                      : isDark 
                      ? 'hover:bg-slate-700 text-slate-500 hover:text-red-400' 
                      : 'hover:bg-slate-100 text-slate-400 hover:text-red-500'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AIMentorButton({ isDark = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isTypingMessage, setIsTypingMessage] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hello! I'm your AI learning assistant. I can help you understand complex topics, solve problems step-by-step, create practice quizzes, and much more. What would you like to learn today?",
      timestamp: new Date(),
      reactions: null,
      isTyping: false,
    },
  ]);
  const [copiedId, setCopiedId] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!message.trim() || isThinking) return;

    setShowSuggestions(false);
    const userPrompt = message.trim();
    const userMsg = { id: Date.now(), type: 'user', text: userPrompt, timestamp: new Date(), reactions: null, isTyping: false };
    
    setMessages((prev) => [...prev, userMsg]);
    const currentMessage = message;
    setMessage('');
    setIsThinking(true);
    setIsTypingMessage(true);

    const context = messages.slice(-6).map((msg) => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }));

    try {
      const reply = await getGroqChatReply([...context, { role: 'user', content: currentMessage }]);
      
      // Add message with typing effect
      const aiMsgId = Date.now() + 1;
      setMessages((prev) => [...prev, { 
        id: aiMsgId, 
        type: 'ai', 
        text: reply, 
        timestamp: new Date(), 
        reactions: null, 
        isTyping: true 
      }]);
      
      // After a delay, set isTyping to false to show full text
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => 
          msg.id === aiMsgId ? { ...msg, isTyping: false } : msg
        ));
      }, reply.length * 20 + 500);
      
    } catch {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        text: "I apologize, but I'm having trouble connecting right now. Please check your internet connection and try again. 🙏",
        timestamp: new Date(),
        reactions: null,
        isTyping: false,
      }]);
    } finally {
      setIsThinking(false);
      setIsTypingMessage(false);
    }
  };

  const handleReaction = (id, reaction) => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, reactions: msg.reactions === reaction ? null : reaction } : msg)));
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSuggestion = (text) => {
    setMessage(text);
    inputRef.current?.focus();
  };

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 100, rotateX: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 100, 
      rotateX: -15,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { type: 'spring', stiffness: 400, damping: 15, delay: 0.3 }
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 lg:bottom-8 right-6 z-50"
      >
        <div className="relative">
          {/* Glow rings */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 rounded-2xl blur-xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1.5, 1.2], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 rounded-2xl blur-2xl"
          />
          
          {/* Main button */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-fuchsia-500/40">
            <motion.div
              animate={{ y: [0, -3, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Bot className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Notification badge */}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.3, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-white rounded-full"
              />
            </motion.span>
          </div>
        </div>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed bottom-28 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-[440px] lg:w-[500px] h-[650px] md:h-[720px] flex flex-col overflow-hidden rounded-3xl ${
              isDark
                ? 'bg-slate-950/95 border border-slate-800/50 shadow-2xl shadow-black/50'
                : 'bg-white/95 border border-slate-200/50 shadow-2xl shadow-violet-500/10'
            }`}
            style={{ backdropFilter: 'blur(40px)' }}
          >
            {/* Header */}
            <div className={`relative flex-shrink-0 ${isDark ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900' : 'bg-gradient-to-r from-white via-slate-50 to-white'}`}>
              {/* Decorative top bar */}
              <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
              
              <div className="relative p-4 md:p-5">
                <div className="flex items-center justify-between">
                  {/* Profile */}
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-xl shadow-fuchsia-500/30"
                      >
                        <Brain className="w-7 h-7 text-white" />
                      </motion.div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    
                    <div>
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        AI Learning Assistant
                      </h3>
                      <div className="flex items-center gap-2">
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2 h-2 bg-green-400 rounded-full"
                        />
                        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Online • Ready to help
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Actions */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                      }`}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Quick Tags */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-2 mt-4 overflow-x-auto scrollbar-hide"
                >
                  {['Study Help', 'Homework', 'Concepts', 'Practice'].map((tag, i) => (
                    <motion.button
                      key={tag}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05, type: 'spring' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSuggestion(`I need help with ${tag.toLowerCase()}`)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        i === 0
                          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30'
                          : isDark
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 md:p-5 space-y-5 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50/50'}`}>
              {/* Welcome Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-2xl p-4 mb-4 ${
                  isDark ? 'bg-gradient-to-br from-violet-900/30 to-fuchsia-900/30 border border-violet-500/20' : 'bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-200/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                  <span className={`font-semibold ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>
                    Capabilities
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { icon: BookOpen, text: 'Topic explanations' },
                    { icon: Code2, text: 'Problem solving' },
                    { icon: Brain, text: 'Custom quizzes' },
                    { icon: Zap, text: 'Instant answers' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <item.icon className="w-3.5 h-3.5" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Messages List */}
              {messages.map((msg, idx) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  isDark={isDark}
                  onReaction={handleReaction}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                />
              ))}

              {/* Thinking Indicator */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className={`rounded-2xl rounded-tl-sm px-4 py-3 ${isDark ? 'bg-slate-800/80' : 'bg-white shadow-xl border border-slate-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                            className="w-2 h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                          />
                        ))}
                      </div>
                      <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Thinking...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {showSuggestions && messages.length === 1 && !isThinking && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`overflow-hidden ${isDark ? 'bg-slate-950/50' : 'bg-slate-50/50'}`}
                >
                  <div className="px-4 pb-3 pt-2">
                    <p className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      Try asking about
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTIONS.map((s, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSuggestion(s.text)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all shadow-md ${
                            isDark 
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-md bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                            <s.icon className="w-3 h-3 text-white" />
                          </span>
                          <span>{s.text}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className={`flex-shrink-0 p-4 border-t ${isDark ? 'border-slate-800/50 bg-slate-950/80' : 'border-slate-200/50 bg-white/80'}`}>
              <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                {/* Side Actions */}
                <div className="flex flex-col gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    <Image className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Input Field */}
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask me anything about your studies..."
                    rows={1}
                    className={`w-full rounded-2xl px-4 py-3 pr-12 text-sm placeholder:text-slate-400 resize-none transition-all focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-slate-800/80 text-white border border-slate-700/50 focus:ring-violet-500/50 focus:border-violet-500/50'
                        : 'bg-slate-100 text-slate-700 border border-slate-200 focus:ring-violet-500/50 focus:border-violet-500/50'
                    }`}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                  
                  {/* Character count */}
                  {message.length > 0 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`absolute bottom-2 right-12 text-[10px] ${
                        message.length > 500 ? 'text-red-500' : isDark ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {message.length}/500
                    </motion.span>
                  )}
                  
                  {/* Clear button */}
                  {message && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => { setMessage(''); inputRef.current?.focus(); }}
                      className={`absolute bottom-2 right-3 p-1.5 rounded-lg transition-all ${
                        isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-200 text-slate-500'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>

                {/* Send Button */}
                <motion.button
                  type="submit"
                  disabled={!message.trim() || isThinking}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 text-white flex items-center justify-center shadow-xl shadow-fuchsia-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-shadow hover:shadow-2xl hover:shadow-fuchsia-500/40"
                >
                  {isThinking ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <Loader2 className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              </form>

              {/* Footer */}
              <div className="flex items-center justify-center gap-4 mt-3">
                <span className={`text-[10px] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                  Powered by AI • Responses are for learning assistance
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
