# 3D AI Mentor Avatar Integration Guide

## Overview
The application features 3D avatar placeholders for the **AI Learning Assistant** - an AI mentor that helps students with learning and clearing doubts. These placeholders are strategically positioned where students interact with the AI mentor.

## 🤖 About the AI Mentor Avatar
The avatar represents an intelligent learning companion that:
- Answers student questions 24/7
- Provides step-by-step explanations
- Offers personalized learning support
- Helps with homework and doubt clearing

## 📍 AI Avatar Placeholder Locations

### 1. **AI Mentor Card (Home Page)** - `AIMentorCard.jsx`
- **Size**: Extra Large (xl)
- **Location**: Home page, between XP Progress and Daily Challenges
- **Usage**: Main introduction to the AI mentor with call-to-action
- **Component**: `<AvatarPlaceholder size="xl" userName="AI Mentor" />`
- **Features**: Floating animations with lightbulb and sparkle icons

### 2. **Floating Chat Button** - `AIMentorButton.jsx`
- **Size**: Medium (md)  
- **Location**: Fixed bottom-right corner (bottom-24 lg:bottom-8 right-8)
- **Usage**: Quick access to AI mentor chat from any page
- **Component**: `<AvatarPlaceholder size="md" userName="AI Mentor" />`
- **Features**: Pulse ring animation, always visible

### 3. **Chat Interface Header** - `AIMentorButton.jsx`
- **Size**: Small (sm)
- **Location**: Top of chat modal window
- **Usage**: Identifies the AI mentor in conversations
- **Component**: `<AvatarPlaceholder size="sm" userName="AI Mentor" />`

### 4. **Chat Messages** - `AIMentorButton.jsx`
- **Size**: Small (sm)
- **Location**: Next to each AI response in chat
- **Usage**: Visual indicator for AI messages
- **Component**: `<AvatarPlaceholder size="sm" userName="AI" />`

### 5. **Mentor Section Component** - `MentorSection.jsx`
- **Size**: Large (lg)
- **Location**: Used in mentor-specific views and sections
- **Usage**: Dedicated mentor interaction areas
- **Component**: `<AvatarPlaceholder size="lg" userName="AI Mentor" />`

## 🎨 AvatarPlaceholder Component

**File**: `src/components/AvatarPlaceholder.jsx`

### Available Sizes
- `sm`: 8x8 (32px) - Navigation bars
- `md`: 12x12 (48px) - Cards and lists
- `lg`: 16x16 (64px) - Profile previews
- `xl`: 24x24 (96px) - Profile pages
- `2xl`: 32x32 (128px) - Hero sections

### Props
```jsx
<AvatarPlaceholder 
  size="md"           // Size variant (default: 'md')
  userName="John"     // User name for labels
  className=""        // Additional CSS classes
/>
```

## 🚀 Integration Options

### Option 1: React Three Fiber (Recommended)
Perfect for React applications with WebGL 3D models.

```bash
npm install three @react-three/fiber @react-three/drei
```

**Example Integration**:
```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Avatar3D({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

// Replace the placeholder content in AvatarPlaceholder.jsx
<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
  <ambientLight intensity={0.5} />
  <spotLight position={[10, 10, 10]} />
  <Avatar3D modelPath="/models/avatar.glb" />
  <OrbitControls enableZoom={false} />
</Canvas>
```

### Option 2: Ready Player Me
Pre-built avatar system with customization.

```bash
npm install @readyplayerme/react-avatar-creator
```

**Integration**:
```jsx
import { Avatar } from '@readyplayerme/react-avatar-creator';

<Avatar 
  modelSrc="https://models.readyplayerme.com/your-avatar-id.glb"
  style={{ width: '100%', height: '100%' }}
/>
```

### Option 3: Spline 3D
Design and export 3D scenes from Spline.

```bash
npm install @splinetool/react-spline
```

**Integration**:
```jsx
import Spline from '@splinetool/react-spline';

<Spline scene="https://prod.spline.design/your-scene-url/scene.splinecode" />
```

### Option 4: Vectary
Embed 3D models from Vectary.

```jsx
<iframe 
  src="https://app.vectary.com/viewer/your-model-id"
  style={{ width: '100%', height: '100%', border: 'none' }}
/>
```

## 🎭 Current Placeholder Features

The current placeholder includes:
- ✅ Gradient backgrounds with visual depth
- ✅ Hover animations and 3D rotation effects
- ✅ Shimmer loading effect
- ✅ Responsive sizing system
- ✅ Accessibility labels
- ✅ Integration tooltip

## 📝 Implementation Steps

1. **Choose your 3D solution** from the options above
2. **Install dependencies** via npm/yarn
3. **Create 3D model component** in `src/components/Avatar3D.jsx`
4. **Import and replace** the placeholder content in `AvatarPlaceholder.jsx`:
   ```jsx
   // Replace this section (lines ~35-45):
   {/* Avatar Icon (Replace this with 3D model integration) */}
   <div className="relative z-10 text-white flex flex-col items-center justify-center">
     <User className={...} />
   </div>
   
   // With your 3D component:
   <Avatar3D modelPath={modelPath} userName={userName} />
   ```
5. **Test responsiveness** across different sizes
6. **Optimize performance** - consider lazy loading for larger models

## 🎯 Best Practices

- **Performance**: Use compressed GLB/GLTF formats for 3D models
- **Loading States**: Keep the shimmer effect during model loading
- **Fallback**: Maintain the current icon as fallback if 3D fails to load
- **Mobile**: Consider simpler 2D avatars on mobile devices for performance
- **Caching**: Cache 3D models to improve load times
- **File Size**: Keep models under 1-2MB for optimal loading

## 🔗 Useful Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Ready Player Me](https://readyplayerme.com/)
- [Three.js Examples](https://threejs.org/examples/)
- [Spline Design](https://spline.design/)
- [GLB Model Optimization](https://gltf.report/)

## 💡 Tips

- Start with the hero section (2xl) avatar first - it's the most prominent
- Use the same model across all sizes, just adjust camera/scale
- Consider adding personality animations (idle, wave, celebrate)
- Match the purple-pink gradient theme in your 3D model materials
- Test on different devices for performance

---

**Note**: The placeholder will remain visible until you integrate your chosen 3D solution. The tooltip "Replace with 3D model" appears on hover to remind you of integration points.
