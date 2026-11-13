import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Domain-warped "zijde" in de merkkleuren. Links blijft licht zodat de kop leesbaar is,
// rechts en onderin ontstaat kleur en diepte. De muis buigt de stroming.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform vec3 uClick;
  uniform float uScroll;
  uniform float uPower;

  vec3 cream  = vec3(0.984, 0.965, 0.937);
  vec3 sand   = vec3(0.961, 0.902, 0.827);
  vec3 peach  = vec3(0.949, 0.690, 0.482);
  vec3 coral  = vec3(0.914, 0.310, 0.216);
  vec3 ember  = vec3(0.620, 0.150, 0.110);

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.02 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    float t = uTime * 0.07 + uScroll * 0.12;
    vec2 p0 = p;

    // muis duwt de stroming weg
    vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
    vec2 d = p - m;
    float push = exp(-dot(d, d) * 5.0);
    p += normalize(d + 1e-4) * push * 0.12 * uPower;

    // klik-rimpel
    float age = uTime - uClick.z;
    vec2 cd = (uClick.xy - 0.5) * vec2(aspect, 1.0);
    float rl = length(p0 - cd);
    float rip = exp(-pow((rl - age * 0.55) * 8.0, 2.0)) * exp(-age * 1.1) * step(0.0, age);
    p += normalize(p0 - cd + 1e-4) * rip * 0.1;

    vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p * 1.8 + 3.0 * q + vec2(1.7, 9.2) + t * 1.3),
                  fbm(p * 1.8 + 3.0 * q + vec2(8.3, 2.8) - t * 1.1));
    float f = fbm(p * 1.4 + 3.2 * r) + rip * 0.35;

    // zijde-banden
    float band = sin((f + r.x * 0.9) * 9.0 + t * 6.0) * 0.5 + 0.5;
    band = smoothstep(0.15, 0.95, band);

    vec3 col = mix(sand, peach, smoothstep(0.2, 0.75, f));
    col = mix(col, coral, smoothstep(0.45, 0.95, f * 0.7 + band * 0.5));
    col = mix(col, ember, smoothstep(0.78, 1.0, f * 0.6 + band * 0.55) * 0.55);
    col += band * 0.06;

    // leesbaarheid: links en bovenin terug naar crème
    float left = smoothstep(0.78, 0.22, uv.x + (uv.y - 0.5) * 0.15);
    float amount = 1.0 - left * 0.93;
    amount *= mix(1.0, 0.55, smoothstep(0.55, 0.0, uv.y)); // onderin zachter
    col = mix(cream, col, amount);

    // fijne korrel
    col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.035;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Silk({ still, level }: { still: boolean; level: number }) {
  const { size, gl } = useThree();
  const target = useRef(new THREE.Vector2(0.7, 0.5));
  const current = useRef(new THREE.Vector2(0.7, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.7, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uClick: { value: new THREE.Vector3(0.5, 0.5, -100) },
      uScroll: { value: 0 },
      uPower: { value: level >= 4 ? 2.4 : 1 },
    }),
    [level],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    const onDown = (e: PointerEvent) => {
      if (level < 4) return;
      uniforms.uClick.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
        uniforms.uTime.value,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [level, uniforms]);

  useEffect(() => {
    uniforms.uRes.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame(({ clock }) => {
    uniforms.uTime.value = still ? 12 : clock.getElapsedTime();
    current.current.lerp(target.current, 0.04);
    if (level >= 4) uniforms.uScroll.value = window.scrollY / window.innerHeight;
    uniforms.uMouse.value.copy(current.current);
    void gl;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export function HeroWebGL({ level = 1 }: { level?: number }) {
  const still =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={coarse ? 1 : [1, 1.5]}
        frameloop={still ? "demand" : "always"}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <Silk still={still} level={level} />
      </Canvas>
    </div>
  );
}
