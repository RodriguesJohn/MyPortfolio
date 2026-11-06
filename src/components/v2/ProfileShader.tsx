import { useEffect, useRef } from "react";

/**
 * Blue-only animated mesh-gradient shader for the profile cards.
 * The CSS `.v2-profile-shader` gradient sits underneath as a fallback
 * (no WebGL) and as the first paint before the canvas is ready.
 */

const VERTEX = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uShift;

const vec3 deep  = vec3(0.235, 0.443, 0.776); // #3c71c6
const vec3 navy  = vec3(0.298, 0.522, 0.851); // #4c85d9
const vec3 mid   = vec3(0.369, 0.592, 0.898); // #5e97e5
const vec3 sky   = vec3(0.502, 0.710, 0.949); // #80b5f2
const vec3 ice   = vec3(0.682, 0.835, 0.984); // #aed5fb

float blob(vec2 uv, vec2 c, float r) {
  return smoothstep(r, 0.0, length(uv - c));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  uv.y = 1.0 - uv.y;
  float t = uTime * 0.42 + uShift;

  // Soft domain warp so the colour fields flow into each other.
  vec2 w = uv;
  w.x += 0.14 * sin(uv.y * 3.1 + t * 1.7);
  w.y += 0.14 * sin(uv.x * 2.7 - t * 1.3);
  w += 0.05 * vec2(sin(w.y * 5.0 + t), cos(w.x * 4.0 - t));

  // Base: deeper at the bottom-right, lighter at the top-left.
  vec3 col = mix(sky, navy, smoothstep(0.0, 1.2, w.x * 0.45 + w.y * 0.75));

  // Moving light and dark pools.
  vec2 c1 = vec2(0.22 + 0.26 * sin(t * 0.9), 0.20 + 0.12 * cos(t * 0.7));
  vec2 c2 = vec2(0.80 + 0.12 * cos(t * 0.8), 0.32 + 0.18 * sin(t * 0.6));
  vec2 c3 = vec2(0.62 + 0.26 * sin(t * 0.5 + 1.7), 0.84 + 0.10 * cos(t * 0.9));
  vec2 c4 = vec2(0.18 + 0.12 * cos(t * 0.6 + 2.1), 0.78 + 0.14 * sin(t * 0.8));

  col = mix(col, ice,  blob(w, c1, 0.62) * 0.75);
  col = mix(col, mid,  blob(w, c2, 0.58) * 0.70);
  col = mix(col, deep, blob(w, c3, 0.70) * 0.65);
  col = mix(col, sky,  blob(w, c4, 0.55) * 0.55);

  // Sub-pixel dither to stop gradient banding (invisible, not a grain effect).
  float d = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (d - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`;

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

type ProfileShaderProps = {
  /** Offsets the animation so stacked cards don't move in lockstep. */
  shift?: number;
};

const ProfileShader = ({ shift = 0 }: ProfileShaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uShift = gl.getUniformLocation(program, "uShift");
    gl.uniform1f(uShift, shift);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const draw = (ms: number) => {
      gl.uniform1f(uTime, ms / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    let frame = 0;
    let visible = true;
    const loop = (ms: number) => {
      draw(ms);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion.matches || !visible) {
        draw(4000);
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    resize();
    canvas.style.opacity = "1";
    start();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion.matches) draw(4000);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);
    reduceMotion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      reduceMotion.removeEventListener("change", start);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [shift]);

  return (
    <>
      <div className="v2-profile-shader" aria-hidden="true" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full rounded-[inherit] opacity-0 transition-opacity duration-500"
        aria-hidden="true"
      />
    </>
  );
};

export default ProfileShader;
