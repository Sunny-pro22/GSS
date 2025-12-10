import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const DigitalMarketing3D = () => {
  const groupRef = useRef();
  const channelsRef = useRef([]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }

    // Animate channels
    channelsRef.current.forEach((channel, i) => {
      if (channel) {
        channel.position.y = 0.3 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Central Hub */}
      <mesh position={[0, 0, 0]} castShadow>
        <dodecahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} />
      </mesh>

      {/* Marketing Channels */}
      {[
        { position: [1.5, 0.3, 0], color: '#00d4ff', size: 0.25 },
        { position: [-1.5, 0.3, 0], color: '#0099ff', size: 0.25 },
        { position: [0, 0.3, 1.5], color: '#00d4ff', size: 0.25 },
        { position: [0, 0.3, -1.5], color: '#0099ff', size: 0.25 },
        { position: [1, 0.3, 1], color: '#00d4ff', size: 0.2 },
        { position: [-1, 0.3, -1], color: '#0099ff', size: 0.2 }
      ].map((channel, i) => (
        <group key={i} ref={el => channelsRef.current[i] = el}>
          <mesh position={channel.position} castShadow>
            <sphereGeometry args={[channel.size, 16, 16]} />
            <meshStandardMaterial 
              color={channel.color} 
              emissive={channel.color}
              emissiveIntensity={0.4}
            />
          </mesh>
          
          {/* Connection Line */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  0, 0, 0,
                  channel.position[0], channel.position[1], channel.position[2]
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={channel.color} transparent opacity={0.4} />
          </line>
        </group>
      ))}

      {/* Pulse Effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          transparent 
          opacity={0.1}
          emissive="#00d4ff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
};

export default DigitalMarketing3D;