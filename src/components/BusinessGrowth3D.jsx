import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const BusinessGrowth3D = () => {
  const groupRef = useRef();
  const barsRef = useRef([]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }

    // Animate bars growth
    barsRef.current.forEach((bar, i) => {
      if (bar) {
        const targetHeight = [1.2, 0.8, 1.5, 1.0, 1.8, 1.3, 1.1][i];
        const pulse = Math.sin(state.clock.elapsedTime * 2 + i) * 0.1 + 1;
        bar.scale.y = targetHeight * pulse;
      }
    });
  });

  const barHeights = [1.2, 0.8, 1.5, 1.0, 1.8, 1.3, 1.1];
  const barColors = ['#00d4ff', '#0099ff', '#00d4ff', '#0099ff', '#00d4ff', '#0099ff', '#00d4ff'];

  return (
    <group ref={groupRef}>
      {/* Chart Base */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 2]} />
        <meshStandardMaterial color="#333333" transparent opacity={0.8} />
      </mesh>

      {/* Growing Bars */}
      {barHeights.map((height, index) => (
        <group key={index} position={[-1.5 + index * 0.5, 0, 0]}>
          <mesh 
            ref={el => barsRef.current[index] = el}
            position={[0, height / 2, 0]} 
            castShadow
          >
            <boxGeometry args={[0.3, height, 0.3]} />
            <meshStandardMaterial 
              color={barColors[index]} 
              emissive={barColors[index]} 
              emissiveIntensity={0.3} 
            />
          </mesh>
          
          {/* Data Points */}
          <mesh position={[0, height + 0.2, 0]} castShadow>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Connection Lines */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={7}
            array={new Float32Array([
              -1.5, 1.2, 0,
              -1.0, 0.8, 0,
              -0.5, 1.5, 0,
              0, 1.0, 0,
              0.5, 1.8, 0,
              1.0, 1.3, 0,
              1.5, 1.1, 0
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.6} />
      </line>

      {/* Floating Business Icons */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-2, 1, 0]} castShadow>
          <coneGeometry args={[0.2, 0.4, 4]} />
          <meshStandardMaterial color="#0099ff" />
        </mesh>
        
        <mesh position={[2, 0.5, 0]} castShadow>
          <torusGeometry args={[0.15, 0.05, 8, 16]} />
          <meshStandardMaterial color="#00d4ff" />
        </mesh>
        
        <mesh position={[0, 2, 0]} castShadow>
          <dodecahedronGeometry args={[0.2]} />
          <meshStandardMaterial color="#0099ff" />
        </mesh>
      </Float>

      {/* Growth Arrows */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} position={[-1 + i * 1, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.08, 0.3, 4]} />
          <meshStandardMaterial color="#00d4ff" />
        </mesh>
      ))}
    </group>
  );
};

export default BusinessGrowth3D;