import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere({ position = [0, 0, 0], color = '#8b5cf6', scale = 1 }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial color={color} attach="material" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
}

function FloatingOrb({ position = [0, 0, 0], size = 0.5, color = '#ec4899' }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} wireframe transparent opacity={0.8} />
      </mesh>
    </Float>
  );
}

function ParticleField({ count = 200 }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({ x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 20, z: (Math.random() - 0.5) * 20, scale: Math.random() * 0.5 + 0.1 });
    }
    return temp;
  }, [count]);
  return (
    <>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]} scale={p.scale}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
        </mesh>
      ))}
    </>
  );
}

function GeometricShapes() {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh position={[-3, 2, -2]} rotation={[0.5, 0.5, 0]}>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[4, -1, -3]} rotation={[0.3, 0.8, 0.2]}>
        <torusGeometry args={[0.6, 0.2, 16, 32]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Ring({ radius = 2, color = '#8b5cf6', rotation = [0, 0, 0] }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.5;
  });
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

function AnimatedRing({ radius = 2, color = '#8b5cf6', progress = 0.75 }) {
  const arc = Math.PI * 2 * progress;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.08, 16, 100, arc]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} metalness={0.7} />
    </mesh>
  );
}

export function Scene3D({ type = 'default', className = '' }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
        
        {type === 'hero' && (
          <>
            <AnimatedSphere position={[2, 0, 0]} color="#8b5cf6" scale={1.2} />
            <AnimatedSphere position={[-2, 1, -1]} color="#ec4899" scale={0.8} />
            <FloatingOrb position={[0, 2, -2]} size={0.4} color="#22d3ee" />
            <FloatingOrb position={[-3, -1, -3]} size={0.3} color="#f59e0b" />
            <ParticleField count={150} />
            <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
            <Sparkles count={100} scale={12} size={4} speed={0.4} opacity={0.5} color="#8b5cf6" />
            <GeometricShapes />
            <Ring radius={4} color="#8b5cf6" />
            <Ring radius={5} color="#ec4899" rotation={[0, Math.PI / 3, 0]} />
          </>
        )}

        {type === 'card' && (
          <>
            <AnimatedSphere position={[0, 0, 0]} color="#8b5cf6" scale={0.5} />
            <FloatingOrb position={[1, 0.5, 0]} size={0.2} color="#ec4899" />
            <ParticleField count={50} />
          </>
        )}

        {type === 'progress' && (
          <>
            <AnimatedRing radius={1.5} color="#8b5cf6" progress={0.75} />
            <Stars radius={50} depth={30} count={2000} factor={3} fade speed={0.5} />
          </>
        )}

        {type === 'default' && (
          <>
            <AnimatedSphere position={[0, 0, 0]} color="#8b5cf6" scale={1} />
            <ParticleField count={100} />
            <Stars radius={80} depth={40} count={3000} factor={3} fade speed={0.5} />
          </>
        )}
      </Canvas>
    </div>
  );
}

export function Progress3D({ progress = 0.75, size = 200 }) {
  return (
    <div style={{ width: size, height: size }} className="relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <AnimatedRing radius={1.5} color="#8b5cf6" progress={progress} />
        <Stars radius={50} depth={30} count={1000} factor={2} fade speed={0.3} />
      </Canvas>
    </div>
  );
}

export default Scene3D;
