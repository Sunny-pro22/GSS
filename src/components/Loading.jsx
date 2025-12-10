import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loading.css';

const Loading = ({ onLoadingComplete }) => {
  const loadingRef = useRef(null);
  const gearRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(loadingRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: onLoadingComplete
          });
        }, 500);
      }
    });

    tl.fromTo(gearRef.current,
      { rotation: 0 },
      { rotation: 360, duration: 2, ease: "power2.inOut" }
    )
    .fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=1.5"
    );

    // Add floating gears
    for (let i = 1; i <= 3; i++) {
      const gear = document.createElement('div');
      gear.className = `loading-gear gear-${i}`;
      loadingRef.current.appendChild(gear);
      
      gsap.to(gear, {
        rotation: i % 2 === 0 ? 360 : -360,
        duration: 3 + i,
        repeat: -1,
        ease: "linear"
      });
    }

    return () => {
      // Cleanup
      const gears = document.querySelectorAll('.loading-gear');
      gears.forEach(gear => gear.remove());
    };
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen" ref={loadingRef}>
      <div className="loading-content">
        <div className="loading-gear-main" ref={gearRef}>
          <div className="gear-teeth"></div>
        </div>
        <div className="loading-text" ref={textRef}>
          <h2>BRP TECHNOLOGY</h2>
          <p>Loading Digital Excellence...</p>
        </div>
        <div className="loading-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;