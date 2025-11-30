import { useEffect, useRef, useState } from "react";

interface ParticleSphereProps {
  isVisible: boolean;
}

export function ParticleSphere({ isVisible }: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
  }>>([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const particleCount = 200;
    const radius = Math.min(canvas.width, canvas.height) * 0.3;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const centerZ = 0;

    // Initialize particles on sphere surface
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        x: x + centerX,
        y: y + centerY,
        z: z + centerZ,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
      });
    }

    particlesRef.current = particles;

    // Animation
    let rotationX = 0;
    let rotationY = 0;
    const rotationSpeed = 0.002;

    const animate = () => {
      if (!ctx || !canvasRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rotationX += rotationSpeed;
      rotationY += rotationSpeed * 0.7;

      // Rotate and project particles
      const projected: Array<{ x: number; y: number; z: number; originalIndex: number }> = [];

      particlesRef.current.forEach((particle, index) => {
        // Rotate around X axis
        let x = particle.x - centerX;
        let y = particle.y - centerY;
        let z = particle.z - centerZ;

        // Rotate around Y axis
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        // Rotate around X axis
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        projected.push({
          x: x1 + centerX,
          y: y1 + centerY,
          z: z2 + centerZ,
          originalIndex: index,
        });
      });

      // Sort by Z depth
      projected.sort((a, b) => b.z - a.z);

      // Draw connections
      const connectionColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      ctx.strokeStyle = connectionColor;
      ctx.lineWidth = 1;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      const particleColor = isDark ? "255, 255, 255" : "0, 0, 0";
      projected.forEach((p) => {
        const size = (p.z + radius) / (radius * 2) * 3 + 1;
        const opacity = (p.z + radius) / (radius * 2) * 0.8 + 0.2;

        ctx.fillStyle = `rgba(${particleColor}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, isDark]);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
    </div>
  );
}

