import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const SEOOptimization3D = () => {
  const groupRef = useRef();
  const keywordsRef = useRef([]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }

    // Update keyword positions
    keywordsRef.current.forEach((keyword, i) => {
      if (keyword) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2;
        keyword.position.x = Math.cos(angle + state.clock.elapsedTime * 0.5) * radius;
        keyword.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.3;
        keyword.position.z = Math.sin(angle + state.clock.elapsedTime * 0.5) * radius;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Central Search Sphere */}
      <mesh castShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.2} />
      </mesh>

      {/* Search Rays */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <cylinderGeometry args={[0.02, 0.05, 3, 8]} />
          <meshStandardMaterial color="#0099ff" transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Orbiting Keywords */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2;
        return (
          <mesh
            key={i}
            ref={el => keywordsRef.current[i] = el}
            position={[
              Math.cos(angle) * radius,
              Math.sin(i) * 0.3,
              Math.sin(angle) * radius
            ]}
            castShadow
          >
            <boxGeometry args={[0.3, 0.1, 0.1]} />
            <meshStandardMaterial color="#0099ff" />
          </mesh>
        );
      })}

      {/* Ranking Indicators */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} position={[0, -1.5 + i * 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 8]} />
          <meshStandardMaterial color={i === 2 ? "#00d4ff" : "#0099ff"} />
        </mesh>
      ))}
    </group>
  );
};

export default SEOOptimization3D;