import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import Loading from './components/Loading';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Custom SEO Hook
const useSEO = ({ 
  title, 
  description, 
  canonical, 
  ogImage = "/og-image.jpg",
  ogType = "website",
  keywords = "BRP Technology, mechanical engineering, digital solutions, SEO services, SMO services, digital marketing, Google Business Profile"
}) => {
  const siteUrl = "https://brptechnology.com";
  
  useEffect(() => {
    document.title = title;
    // ... (keep existing SEO implementation)
  }, [title, description, canonical, ogImage, ogType, keywords, siteUrl]);
};

// SEO Component wrapper
const SEO = (props) => {
  useSEO(props);
  return null;
};

// Theme Context
const ThemeContext = React.createContext();

// Theme Provider
const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for theme
const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const moveCursor = (e) => {
      if (cursor && cursorDot) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
          cursorDot.style.left = e.clientX + 'px';
          cursorDot.style.top = e.clientY + 'px';
        }, 50);
      }
    };

    const handleMouseDown = () => {
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    };

    const handleMouseUp = () => {
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    const handleMouseEnter = (e) => {
      if (e.target.matches('button, a, .btn, .service-card, .nav-link')) {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(0)';
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.matches('button, a, .btn, .service-card, .nav-link')) {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>
    </>
  );
};

// Floating Gears Background Component
const FloatingGearsBackground = () => {
  return (
    <div className="floating-gears-bg">
      <div className="floating-gear gear-1"></div>
      <div className="floating-gear gear-2"></div>
      <div className="floating-gear gear-3"></div>
      <div className="floating-gear gear-4"></div>
      <div className="floating-gear gear-5"></div>
      <div className="floating-gear gear-6"></div>
    </div>
  );
};

// 3D Gear Component
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

// Interactive Machine Model for Hero (Previous Mechanical Model)
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

// 3D Hero Scene - Mechanical Model
const Hero3DScene = () => {
  const { isDarkTheme } = useTheme();
  const canvasRef = useRef();
  
  // Set canvas background to match theme
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
      gl={{ alpha: false }} // Disable alpha for solid background
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



// Business Growth 3D Model - Enhanced with growth symbols
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

// SEO Optimization 3D Model - Enhanced
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

// Digital Marketing 3D Model - Enhanced
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

// Business Profile 3D Model - Enhanced
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
    </group>
  );
};

// Services 3D Scene - Enhanced with theme matching
const Services3DScene = () => {
  const { isDarkTheme } = useTheme();
  const [activeModel, setActiveModel] = useState('growth');
  const canvasRef = useRef();

  const models = {
    growth: <BusinessGrowth3D />,
    seo: <SEOOptimization3D />,
    marketing: <DigitalMarketing3D />,
    profile: <BusinessProfile3D />
  };

  // Set canvas background to match theme
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.style.background = isDarkTheme ? '#0a0a0a' : '#ffffff';
    }
  }, [isDarkTheme]);

  return (
    <Canvas
      ref={canvasRef}
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'var(--bg-primary)'
      }}
      gl={{ alpha: false }} // Disable alpha for solid background
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
        {models[activeModel]}
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

// Single Page Navigation Component
const SinglePageNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { isDarkTheme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-gear">
            <div className="gear-teeth-small"></div>
          </div>
          <div className="logo-link" onClick={() => scrollToSection('home')}>
            <h1 className="logo">BRP TECHNOLOGY</h1>
            <span className="logo-subtitle">PVT LIMITED</span>
          </div>
        </div>
        
        <nav className="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
          >
            <div className="theme-toggle-track">
              <div className="theme-toggle-thumb">
                {isDarkTheme ? '🌙' : '☀️'}
              </div>
            </div>
          </button>
          <button className="cta-button" onClick={() => scrollToSection('contact')}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );



};

// ServiceCard Component
const ServiceCard = ({ service, index, onHover, onLeave }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 100, opacity: 0, rotationY: 180 },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [index]);

  return (
    <div 
      className={`service-card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      ref={cardRef}
    >
      <div className="service-card-inner">
        <div className="service-card-front">
          <div className="service-icon">
            <span className="service-emoji">{service.emoji}</span>
          </div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <div className="flip-indicator">Click to learn more →</div>
        </div>
        
        <div className="service-card-back">
          <h3>{service.title}</h3>
          <ul className="service-features">
            {service.features.map((feature, featureIndex) => (
              <li key={featureIndex}>{feature}</li>
            ))}
          </ul>
          <button className="service-cta" onClick={(e) => {
            e.stopPropagation();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
          }}>
            Get Started
          </button>
          <div className="flip-indicator">← Click to go back</div>
        </div>
      </div>
    </div>
  );
};

// Home Section Component
const HomeSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useSEO({
    title: "BRP Technology - Business Growth & Digital Excellence",
    description: "BRP Technology specializes in business profile optimization, digital marketing, and SEO services to drive your business growth.",
    canonical: "/",
    keywords: "BRP Technology, business profile, digital marketing, SEO services, Google Business, digital solutions"
  });

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, []);

  const scrollToServices = () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      <FloatingGearsBackground />
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title" ref={titleRef}>
            Business Growth 
            <span className="gradient-text"> Digital Excellence</span>
          </h1>
          <p className="hero-description" ref={subtitleRef}>
            BRP Technology specializes in business profile optimization, digital marketing, 
            and SEO services to drive measurable growth and online presence for your business.
          </p>
          <div className="hero-buttons" ref={ctaRef}>
            <button className="btn btn-primary" onClick={scrollToServices}>
              Explore Services
            </button>
            <button className="btn btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Get Started
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <Hero3DScene />
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToServices}>
        <div className="scroll-wheel"></div>
      </div>
    </section>
  );
};

// Services Section Component - Updated Layout
// Services Section Component - Updated Layout
const ServicesSection = () => {
  const servicesRef = useRef(null);
  const titleRef = useRef(null);
  const modelRef = useRef(null);

  const services = [
    {
      emoji: '📈',
      title: 'Business Profile Optimization',
      description: 'Maximize your online presence with optimized business profiles across all platforms.',
      features: ['Google Business Profile', 'Social Media Profiles', 'Local Directory Listings', 'Review Management'],
      model: 'profile'
    },
    {
      emoji: '🔍',
      title: 'SEO Services',
      description: 'Improve search engine rankings and drive organic traffic to your website.',
      features: ['Keyword Research', 'On-Page Optimization', 'Technical SEO', 'Content Strategy'],
      model: 'seo'
    },
    {
      emoji: '📱',
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your online presence.',
      features: ['Social Media Marketing', 'PPC Advertising', 'Email Campaigns', 'Content Marketing'],
      model: 'marketing'
    },
    {
      emoji: '📊',
      title: 'Analytics & Reporting',
      description: 'Data-driven insights to measure performance and optimize strategies.',
      features: ['Performance Tracking', 'Custom Dashboards', 'ROI Analysis', 'Competitor Insights'],
      model: 'growth'
    },
    {
      emoji: '🎯',
      title: 'Local SEO',
      description: 'Dominate local search results and attract customers in your area.',
      features: ['Local Listings', 'Map Optimization', 'Local Reviews', 'Geo-Targeted Content'],
      model: 'seo'
    },
    {
      emoji: '⚡',
      title: 'Marketing Automation',
      description: 'Streamline your marketing efforts with automated workflows and systems.',
      features: ['CRM Integration', 'Lead Nurturing', 'Workflow Automation', 'Performance Analytics'],
      model: 'marketing'
    }
  ];

  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    // Animate model container
    gsap.fromTo(modelRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: modelRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="services" className="services-section" ref={servicesRef}>
      <FloatingGearsBackground />
      <div className="section-header">
        <h1 ref={titleRef}>Our Business Services</h1>
        <p>Comprehensive digital solutions to grow your business and online presence</p>
      </div>

      <div className="services-layout">
        <div className="services-model-container" ref={modelRef}>
          <div className="services-3d-scene">
            <Services3DScene />
          </div>
        </div>

        <div className="services-cards-container">
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard 
                key={index} 
                service={service} 
                index={index}
                onHover={() => setHoveredService(service.model)}
                onLeave={() => setHoveredService(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.about-content',
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="about" className="about-section" ref={aboutRef}>
      <FloatingGearsBackground />
      <div className="section-header">
        <h1>About BRP Technology</h1>
        <p>Your Partner in Digital Business Growth</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            At BRP Technology, we specialize in helping businesses establish and grow their 
            digital presence through comprehensive business profile optimization and digital 
            marketing strategies.
          </p>
          <p>
            Our team of experts combines technical expertise with business acumen to deliver 
            measurable results that drive growth and increase online visibility.
          </p>
          
          <div className="business-highlights">
            <div className="highlight-item">
              <h3>🏢 Business Focused</h3>
              <p>Strategies designed to drive real business results and ROI</p>
            </div>
            <div className="highlight-item">
              <h3>📊 Data Driven</h3>
              <p>Decisions based on analytics and performance metrics</p>
            </div>
            <div className="highlight-item">
              <h3>⚡ Results Oriented</h3>
              <p>Focused on delivering measurable growth and success</p>
            </div>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Businesses Served</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.contact-form',
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="contact" className="contact-section" ref={contactRef}>
      <FloatingGearsBackground />
      <div className="section-header">
        <h1>Get In Touch</h1>
        <p>Ready to grow your business? Let's connect!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <h2>📍 Business Hours</h2>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 2:00 PM</p>
          </div>
          <div className="contact-item">
            <h2>📞 Contact Info</h2>
            <p>+1 (555) 123-4567</p>
            <p>info@brptechnology.com</p>
          </div>
          <div className="contact-item">
            <h2>🔄 Quick Response</h2>
            <p>We typically respond within 2 business hours</p>
          </div>
          <div className="contact-item">
            <h2>🎯 Free Consultation</h2>
            <p>Get a free business growth assessment</p>
          </div>
        </div>

        <form className="contact-form">
          <div className="form-group">
            <input type="text" placeholder="Your Business Name" className="form-input" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Your Email" className="form-input" required />
          </div>
          <div className="form-group">
            <input type="tel" placeholder="Your Phone" className="form-input" />
          </div>
          <div className="form-group">
            <select className="form-input" required>
              <option value="">Select Service Needed</option>
              <option value="business-profile">Business Profile Optimization</option>
              <option value="seo">SEO Services</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="analytics">Analytics & Reporting</option>
              <option value="local-seo">Local SEO</option>
              <option value="automation">Marketing Automation</option>
            </select>
          </div>
          <div className="form-group">
            <textarea placeholder="Tell us about your business goals..." rows="5" className="form-input" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Get Free Consultation</button>
        </form>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="app-footer">
      <FloatingGearsBackground />
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo-section">
            <h2>BRP TECHNOLOGY</h2>
            <span>PVT LIMITED</span>
          </div>
          <p>Helping businesses grow through digital excellence and strategic optimization.</p>
          <button className="theme-toggle footer-theme-toggle" onClick={toggleTheme}>
            <div className="theme-toggle-track">
              <div className="theme-toggle-thumb">
                {isDarkTheme ? '🌙' : '☀️'}
              </div>
            </div>
            <span>Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme</span>
          </button>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <nav>
            <button onClick={() => scrollToSection('home')}>Home</button>
            <button onClick={() => scrollToSection('services')}>Services</button>
            <button onClick={() => scrollToSection('about')}>About</button>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
          </nav>
        </div>
        
        <div className="footer-section">
          <h3>Business Services</h3>
          <nav>
            <button onClick={() => scrollToSection('services')}>Business Profiles</button>
            <button onClick={() => scrollToSection('services')}>SEO Optimization</button>
            <button onClick={() => scrollToSection('services')}>Digital Marketing</button>
            <button onClick={() => scrollToSection('services')}>Analytics</button>
          </nav>
        </div>
        
        <div className="footer-section">
          <h3>Connect</h3>
          <nav>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </nav>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 BRP Technology Pvt Limited. All rights reserved. | Business Growth Specialists</p>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <div className="app">
        {isLoading && <Loading onLoadingComplete={handleLoadingComplete} />}
        
        {!isLoading && (
          <>
            <CustomCursor />
            <SinglePageNav />
            <main className="main-content">
              <HomeSection />
              <ServicesSection />
              <AboutSection />
              <ContactSection />
            </main>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;