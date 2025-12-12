import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useTheme } from '../Hooks/useTheme';
import InteractiveMachine from './InteractiveMachine';

const Hero3DScene = () => {
  const { isDarkTheme } = useTheme();
  const canvasRef = useRef();
  
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.style.background = isDarkTheme ? '#0a0a0a' : '#ffffff';
    }
  }, [isDarkTheme]);
  
  return (
    <Canvas
      ref={canvasRef}
      shadows
      camera={{ position: [6, 3, 6], fov: 45 }}
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'var(--bg-primary)'
      }}
      gl={{ alpha: false }}
    >
      <color attach="background" args={[isDarkTheme ? '#0a0a0a' : '#ffffff']} />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#0099ff" />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      <InteractiveMachine />
      <Environment preset="dawn" />
    </Canvas>
  );
};

export default Hero3DScene;
