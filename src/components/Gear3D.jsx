import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Gear3D = ({ position = [0, 0, 0], rotationSpeed = 1, size = 1, color = "#00d4ff" }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1 * size, 1 * size, 0.3 * size, 16]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const toothLength = 0.4 * size;
        const toothWidth = 0.2 * size;
        const toothHeight = 0.3 * size;
        
        return (
          <mesh
            key={i}
            castShadow
            receiveShadow
            position={[
              Math.cos(angle) * (1 * size + toothLength / 2),
              0,
              Math.sin(angle) * (1 * size + toothLength / 2)
            ]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[toothWidth, toothHeight, toothLength]} />
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
};

export default Gear3D;