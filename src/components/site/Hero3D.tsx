import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Site = { brand: string; a: string; b: string; bg: string; fg: string; t1: string; t2: string };

const SITES: Site[] = [
  {
    brand: "De Korst",
    a: "#D9822B",
    b: "#8A4B1E",
    bg: "#FFF4E0",
    fg: "#3A2412",
    t1: "Vers brood,",
    t2: "elke ochtend.",
  },
  {
    brand: "Studio Mila",
    a: "#7C5CE0",
    b: "#35245F",
    bg: "#F4EFFA",
    fg: "#231A38",
    t1: "Jouw haar,",
    t2: "ons vak.",
  },
  {
    brand: "Van Dijk Bouw",
    a: "#2F8F5B",
    b: "#14402A",
    bg: "#EAF1EC",
    fg: "#14261B",
    t1: "Bouwen met",
    t2: "vakmanschap.",
  },
  {
    brand: "Lupo",
    a: "#E0452B",
    b: "#7C1E0E",
    bg: "#FFE9D6",
    fg: "#3B1209",
    t1: "Tafel voor",
    t2: "twee?",
  },
  {
    brand: "Atelier Wonen",
    a: "#2D6C9C",
    b: "#12344D",
    bg: "#E8EEF2",
    fg: "#10222E",
    t1: "Ruimte voor",
    t2: "jouw stijl.",
  },
  {
    brand: "Lieke Coaching",
    a: "#15998A",
    b: "#0B4D44",
    bg: "#E3F4F1",
    fg: "#082E29",
    t1: "Groei begint",
    t2: "met een gesprek.",
  },
  {
    brand: "Glow Beauty",
    a: "#D94C8A",
    b: "#6B1B43",
    bg: "#FBE4EE",
    fg: "#4A0E2B",
    t1: "Straal",
    t2: "van binnen uit.",
  },
];

function makeTexture(s: Site) {
  const W = 640;
  const H = 400;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d")!;
  x.fillStyle = s.bg;
  x.fillRect(0, 0, W, H);
  // nav
  x.fillStyle = s.a;
  x.beginPath();
  x.arc(44, 44, 9, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = s.fg;
  x.font = "600 26px Georgia, serif";
  x.fillText(s.brand, 62, 53);
  x.globalAlpha = 0.45;
  x.font = "16px system-ui, sans-serif";
  x.fillText("Home    Over    Contact", W - 250, 50);
  x.globalAlpha = 1;
  // kop
  x.fillStyle = s.fg;
  x.font = "64px Georgia, serif";
  x.fillText(s.t1, 40, 188);
  x.fillStyle = s.a;
  x.font = "italic 64px Georgia, serif";
  x.fillText(s.t2, 40, 258);
  // knop
  x.fillStyle = s.a;
  x.beginPath();
  x.roundRect(40, 296, 190, 52, 26);
  x.fill();
  x.fillStyle = "#fff";
  x.font = "600 20px system-ui, sans-serif";
  x.fillText("Bekijk meer  →", 66, 329);
  // tegels
  const g = x.createLinearGradient(400, 100, 600, 380);
  g.addColorStop(0, s.a);
  g.addColorStop(1, s.b);
  x.fillStyle = g;
  x.beginPath();
  x.roundRect(410, 110, 190, 270, 22);
  x.fill();
  x.globalAlpha = 0.35;
  x.fillStyle = "#fff";
  x.beginPath();
  x.arc(505, 200, 46, 0, Math.PI * 2);
  x.fill();
  x.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function Panel({ s, angle, R }: { s: Site; angle: number; R: number }) {
  const tex = useMemo(() => makeTexture(s), [s]);
  return (
    <group position={[Math.sin(angle) * R, 0, Math.cos(angle) * R]} rotation={[0, angle, 0]}>
      <RoundedBox args={[2.5, 1.62, 0.07]} radius={0.06} smoothness={4}>
        <meshStandardMaterial color="#1B1210" roughness={0.4} metalness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.037]}>
        <planeGeometry args={[2.4, 1.5]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.037]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.4, 1.5]} />
        <meshBasicMaterial color={s.a} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Scene() {
  const ring = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const sy = window.scrollY / window.innerHeight;
    if (ring.current) {
      ring.current.rotation.y = t * 0.22 + sy * 1.6 + mouse.current.x * 0.5;
      ring.current.rotation.x += (0.12 + mouse.current.y * 0.16 - ring.current.rotation.x) * 0.05;
      ring.current.position.y = Math.sin(t * 0.8) * 0.12;
    }
    if (core.current) {
      core.current.rotation.x = t * 0.3;
      core.current.rotation.y = t * 0.4;
    }
  });

  const R = 3.5;
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <pointLight position={[0, 0, 0]} intensity={30} color="#FF6A3D" distance={9} />
      <group ref={ring}>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.95, 4]} />
          <MeshDistortMaterial
            color="#E94F37"
            emissive="#FF5A36"
            emissiveIntensity={0.9}
            distort={0.38}
            speed={2.2}
            roughness={0.25}
          />
        </mesh>
        {SITES.map((s, i) => (
          <Panel key={s.brand} s={s} angle={(i / SITES.length) * Math.PI * 2} R={R} />
        ))}
      </group>
    </>
  );
}

export function Hero3D() {
  return (
    <div
      aria-hidden
      className="relative mx-auto h-[380px] w-full max-w-[720px] md:h-[520px] lg:h-[640px]"
    >
      <Canvas
        camera={{ position: [0, 1.3, 11.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
