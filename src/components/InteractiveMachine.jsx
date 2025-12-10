import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import Gear3D from './Gear3D';

const InteractiveMachine = () => {
  const groupRef = useRef();
  const [isRotating, setIsRotating] = useState(true);

  useFrame((state, delta) => {
    if (groupRef.current && isRotating) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group 
      ref={groupRef} 
      onClick={() => setIsRotating(!isRotating)}
      onPointerEnter={() => document.body.style.cursor = 'none'}
      onPointerLeave={() => document.body.style.cursor = 'default'}
    >
      {/* Base Platform */}
      <mesh position={[0, -1.5, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.5, 0.1, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Central Column */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Rotating Arm */}
      <group>
        <mesh position={[0, 0.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[2.5, 0.1, 0.1]} />
          <meshStandardMaterial color="#00d4ff" metalness={0.6} roughness={0.3} />
        </mesh>
        
        <mesh position={[1.2, 0.5, 1.2]} castShadow>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#0099ff" emissive="#0099ff" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Floating Gears */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Gear3D position={[-1, 1, 0]} rotationSpeed={1} size={0.4} color="#00d4ff" />
        <Gear3D position={[1, 1, 0]} rotationSpeed={-1} size={0.3} color="#0099ff" />
        <Gear3D position={[0, 1, 1]} rotationSpeed={0.8} size={0.35} color="#00d4ff" />
      </Float>

      {/* Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={1} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[
            (Math.random() - 0.5) * 4,
            Math.random() * 2,
            (Math.random() - 0.5) * 4
          ]}>
            <sphereGeometry args={[0.05 + Math.random() * 0.05]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#00d4ff" : "#0099ff"} 
              emissive={i % 2 === 0 ? "#00d4ff" : "#0099ff"}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export default InteractiveMachine;