import { motion } from 'framer-motion';
import { User } from 'lucide-react';

function AvatarPlaceholder({ size = 'md', userName = 'User', className = '' }) {
  // Size variants
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32'
  };

  return (
    <div 
      className={`relative ${sizeClasses[size]} ${className}`}
      role="img" 
      aria-label="3D Avatar Placeholder"
    >
      {/* 3D Avatar Container */}
      <motion.div
        whileHover={{ scale: 1.05, rotateY: 10 }}
        className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-lg relative overflow-hidden"
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Placeholder Content - Replace with 3D Model */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Background Glow */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-2xl" />
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-purple-900/30 to-transparent rounded-2xl" />
          </div>
          
          {/* Avatar Icon (Replace this with 3D model integration) */}
          <div className="relative z-10 text-white flex flex-col items-center justify-center">
            <User className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : size === 'lg' ? 'w-8 h-8' : size === 'xl' ? 'w-12 h-12' : 'w-16 h-16'}`} strokeWidth={2.5} />
          </div>
          
          {/* 3D Effect Layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
        </div>

        {/* Shimmer Effect */}
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
        />

        {/* Border Highlight */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-white/30 ring-inset" />
      </motion.div>

      {/* Label for larger sizes */}
      {(size === 'xl' || size === '2xl') && (
        <div className="mt-3 text-center">
          <p className="text-sm font-semibold text-gray-700">{userName}</p>
          <p className="text-xs text-gray-500">3D Avatar Placeholder</p>
        </div>
      )}

      {/* Tooltip for 3D model integration */}
      <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg opacity-0 hover:opacity-100 transition-opacity">
        Replace with 3D model
      </div>
    </div>
  );
}

export default AvatarPlaceholder;
