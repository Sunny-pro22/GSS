import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const BusinessProfile3D = () => {
  const groupRef = useRef();
  const starsRef = useRef([]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }

    // Animate stars
    starsRef.current.forEach((star, i) => {
      if (star) {
        star.scale.x = star.scale.y = star.scale.z = 0.8 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.3;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Profile Card */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Business Logo */}
      <mesh position={[-0.6, 0.3, 0.06]} castShadow>
        <circleGeometry args={[0.2, 16]} />
        <meshStandardMaterial color="#00d4ff" />
      </mesh>

      {/* Business Name */}
      <mesh position={[0.4, 0.3, 0.06]} castShadow>
        <boxGeometry args={[0.8, 0.08, 0.01]} />
        <meshStandardMaterial color="#0099ff" />
      </mesh>

      {/* Contact Info */}
      <mesh position={[0, 0.1, 0.06]} castShadow>
        <boxGeometry args={[1.2, 0.06, 0.01]} />
        <meshStandardMaterial color="#00d4ff" />
      </mesh>

      {/* Address */}
      <mesh position={[0, -0.1, 0.06]} castShadow>
        <boxGeometry args={[1.5, 0.06, 0.01]} />
        <meshStandardMaterial color="#0099ff" />
      </mesh>

      {/* Rating Stars */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh 
          key={i} 
          ref={el => starsRef.current[i] = el}
          position={[-0.6 + i * 0.2, -0.4, 0.06]} 
          castShadow
        >
          <sphereGeometry args={[0.05, 8, 6]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Verification Badge */}
      <mesh position={[0.8, 0.5, 0.06]} castShadow>
        <ringGeometry args={[0.1, 0.15, 16]} />
        <meshStandardMaterial color="#00d4ff" />
      </mesh>

      {/* Glow Effect */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, -0.1]}>
          <sphereGeometry args={[1.3, 16, 16]} />
          <meshStandardMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.1} 
            emissive="#00d4ff"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
};

export default BusinessProfile3D;