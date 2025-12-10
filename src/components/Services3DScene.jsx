import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { useTheme } from '../Hooks/useTHEME';
import BusinessGrowth3D from './BusinessGrowth3D';
import SEOOptimization3D from './SEOOptimization3D';
import DigitalMarketing3D from './DigitalMarketing3D';
import BusinessProfile3D from './BusinessProfile3D';

const Services3DScene = ({ activeModel = 'growth' }) => {
  const { isDarkTheme } = useTheme();

  const models = {
    growth: <BusinessGrowth3D />,
    seo: <SEOOptimization3D />,
    marketing: <DigitalMarketing3D />,
    profile: <BusinessProfile3D />
  };

  useEffect(() => {
    console.log('Active Model:', activeModel);
  }, [activeModel]);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'var(--bg-primary)'
      }}
      gl={{ alpha: false }}
    >
      <color attach="background" args={[isDarkTheme ? '#0a0a0a' : '#ffffff']} />
      <ambientLight intensity={isDarkTheme ? 0.6 : 0.8} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={isDarkTheme ? 1 : 1.2} 
        color={isDarkTheme ? "#ffffff" : "#ffffff"}
      />
      <pointLight 
        position={[-10, -10, -10]} 
        color="#00d4ff" 
        intensity={isDarkTheme ? 0.3 : 0.2}
      />
      <pointLight 
        position={[10, 10, 10]} 
        color="#0099ff" 
        intensity={isDarkTheme ? 0.2 : 0.15}
      />
      
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        {models[activeModel] || models.growth}
      </Float>

      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.3}
      />
      
      <Environment 
        preset={isDarkTheme ? "night" : "city"} 
        background={false}
      />
    </Canvas>
  );
};

export default Services3DScene;