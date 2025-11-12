import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

function AnimatedBackground() {
  const canvasRef = useRef(null);
  const squaresRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create squares
    const createSquares = () => {
      const squares = [];
      const gridSize = 50;
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          squares.push({
            x: i * gridSize,
            y: j * gridSize,
            size: gridSize,
            baseX: i * gridSize,
            baseY: j * gridSize,
            offsetX: 0,
            offsetY: 0,
            opacity: 0.05
          });
        }
      }
      return squares;
    };

    squaresRef.current = createSquares();

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      squaresRef.current.forEach((square) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - square.baseX;
        const dy = mouseRef.current.y - square.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          // Apply shake effect
          const force = (maxDistance - distance) / maxDistance;
          square.offsetX = (Math.random() - 0.5) * 10 * force;
          square.offsetY = (Math.random() - 0.5) * 10 * force;
          square.opacity = 0.05 + force * 0.15;
        } else {
          // Return to base position
          square.offsetX *= 0.9;
          square.offsetY *= 0.9;
          square.opacity = Math.max(0.05, square.opacity * 0.95);
        }

        // Draw square
        ctx.strokeStyle = `rgba(255, 215, 0, ${square.opacity})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(
          square.baseX + square.offsetX,
          square.baseY + square.offsetY,
          square.size,
          square.size
        );
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-background" />;
}

export default AnimatedBackground;
