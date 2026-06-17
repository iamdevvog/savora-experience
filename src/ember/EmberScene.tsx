import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Embers({ count = 600 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();

  const positions = useRef<Float32Array>(
    (() => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        arr[i * 3] = (Math.random() - 0.5) * 30;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
      return arr;
    })(),
  );

  const speeds = useRef<Float32Array>(
    (() => {
      const arr = new Float32Array(count);
      for (let i = 0; i < count; i++) arr[i] = 0.004 + Math.random() * 0.012;
      return arr;
    })(),
  );

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds.current[i];
      arr[i * 3] += Math.sin((arr[i * 3 + 1] + i) * 0.5) * 0.002;
      if (arr[i * 3 + 1] > 10) {
        arr[i * 3] = (Math.random() - 0.5) * 30;
        arr[i * 3 + 1] = -10;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
    }
    pos.needsUpdate = true;

    // parallax with mouse
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.x * 0.15, delta * 2);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -mouse.y * 0.1, delta * 2);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ff9a3c"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function SmokeOrbs() {
  const group = useRef<THREE.Group>(null!);
  const { mouse } = useThree();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * 0.02;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse.x * 1.2, delta * 1.5);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, mouse.y * 0.8, delta * 1.5);
  });
  return (
    <group ref={group}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[Math.cos(i) * 6, Math.sin(i * 1.4) * 3, -5 - i]}>
          <sphereGeometry args={[1.6 + i * 0.3, 32, 32]} />
          <meshBasicMaterial color={i % 2 ? "#7a2a0c" : "#c4541a"} transparent opacity={0.06} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function MouseLight() {
  const light = useRef<THREE.PointLight>(null!);
  const { mouse, viewport } = useThree();
  useFrame((_, delta) => {
    if (!light.current) return;
    light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, mouse.x * viewport.width * 0.5, delta * 4);
    light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, mouse.y * viewport.height * 0.5, delta * 4);
  });
  return <pointLight ref={light} position={[0, 0, 4]} intensity={2.5} color="#ffa863" distance={20} />;
}

export function EmberScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.2} />
        <MouseLight />
        <SmokeOrbs />
        <Embers count={500} />
      </Canvas>
      {/* soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.08_0.02_40)_100%)]" />
    </div>
  );
}