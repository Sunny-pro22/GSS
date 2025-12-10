import React, { useRef, useEffect } from 'react';
import './customCursor.css';

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

export default CustomCursor;