import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loading.css';

const Loading = ({ onLoadingComplete }) => {
  const containerRef = useRef(null);
  const gear1Ref = useRef(null);
  const gear2Ref = useRef(null);
  const gear3Ref = useRef(null);
  const pistonRef = useRef(null);
  const conveyorRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete();
        }, 500);
      }
    });

    // Initial animation sequence
    tl.fromTo(containerRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )
    .fromTo(gear1Ref.current,
      { rotation: 0, scale: 0 },
      { rotation: 360, scale: 1, duration: 1, ease: "back.out(1.7)" }
    )
    .fromTo(gear2Ref.current,
      { rotation: 0, scale: 0 },
      { rotation: -360, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    )
    .fromTo(gear3Ref.current,
      { rotation: 0, scale: 0 },
      { rotation: 360, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    )
    .fromTo(pistonRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
    .fromTo(conveyorRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5 }
    );

    // Continuous animations
    const masterTl = gsap.timeline({ repeat: -1 });
    
    // Gears rotation
    masterTl.to(gear1Ref.current, {
      rotation: 360,
      duration: 2,
      ease: "none",
      repeat: -1
    })
    .to(gear2Ref.current, {
      rotation: -360,
      duration: 2,
      ease: "none",
      repeat: -1
    }, 0)
    .to(gear3Ref.current, {
      rotation: 360,
      duration: 2,
      ease: "none",
      repeat: -1
    }, 0);

    // Piston animation
    masterTl.to(pistonRef.current, {
      y: -20,
      duration: 0.3,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    }, 0);

    // Conveyor belt movement
    masterTl.to('.conveyor-item', {
      x: 400,
      duration: 2,
      stagger: 0.5,
      repeat: -1,
      ease: "none"
    }, 0);

    // Progress bar animation
    gsap.to(progressBarRef.current, {
      width: "100%",
      duration: 3,
      ease: "power2.inOut",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (progressRef.current) {
          progressRef.current.textContent = `${progress}%`;
        }
      }
    });

    return () => {
      tl.kill();
      masterTl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div className="loading-container" ref={containerRef}>
      <div className="loading-content">
        {/* Company Logo/Title */}
        <div className="company-title">
          <h1>BRP TECHNOLOGY</h1>
          <p>PVT LIMITED</p>
        </div>

        {/* Mechanical System */}
        <div className="mechanical-system">
          {/* Gears System */}
          <div className="gears-container">
            <div className="gear gear-large" ref={gear1Ref}>
              <div className="gear-teeth"></div>
              <div className="gear-center"></div>
            </div>
            <div className="gear gear-medium" ref={gear2Ref}>
              <div className="gear-teeth"></div>
              <div className="gear-center"></div>
            </div>
            <div className="gear gear-small" ref={gear3Ref}>
              <div className="gear-teeth"></div>
              <div className="gear-center"></div>
            </div>
          </div>

          {/* Piston System */}
          <div className="piston-system">
            <div className="piston-cylinder">
              <div className="piston-rod" ref={pistonRef}></div>
            </div>
            <div className="piston-base"></div>
          </div>

          {/* Conveyor Belt */}
          <div className="conveyor-system" ref={conveyorRef}>
            <div className="conveyor-belt">
              <div className="conveyor-item"></div>
              <div className="conveyor-item"></div>
              <div className="conveyor-item"></div>
            </div>
            <div className="conveyor-track"></div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" ref={progressBarRef}></div>
          </div>
          <div className="progress-text" ref={progressRef}>0%</div>
        </div>

        <div className="loading-message">
          Initializing Systems...
        </div>
      </div>
    </div>
  );
};

export default Loading;