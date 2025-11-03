import { useEffect, useState } from 'react';

export const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      if (!isVisible) {
        setIsVisible(true);
        currentX = targetX;
        currentY = targetY;
      }
    };

    const animate = () => {
      // Smooth following animation with easing
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      
      currentX += dx * 0.1;
      currentY += dy * 0.1;

      setPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-opacity duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative animate-bounce">
        <div className="text-6xl drop-shadow-lg">
          🐱
        </div>
        {/* Tail wagging effect */}
        <div className="absolute -right-4 top-4 text-3xl animate-pulse">
          🐾
        </div>
      </div>
    </div>
  );
};
