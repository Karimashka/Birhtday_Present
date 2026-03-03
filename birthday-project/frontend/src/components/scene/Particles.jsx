import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLES_COUNT = 400;

export function Particles() {
  const basePositions = useMemo(() => {
    const arr = new Float32Array(PARTICLES_COUNT * 3);
    for (let i = 0; i < PARTICLES_COUNT; i++) {
      const i3 = i * 3;
      arr[i3 + 0] = (Math.random() - 0.5) * 25;
      arr[i3 + 1] = Math.random() * 10 + 2;
      arr[i3 + 2] = (Math.random() - 0.5) * 25;
    }
    return arr;
  }, []);

  const speeds = useMemo(
    () =>
      Array.from(
        { length: PARTICLES_COUNT },
        () => 0.02 + Math.random() * 0.03
      ),
    []
  );

  const pointsRef = useRef();

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const positionsArray =
      pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < PARTICLES_COUNT; i++) {
      const i3 = i * 3;
      const baseY = basePositions[i3 + 1];
      positionsArray[i3 + 1] = baseY + Math.sin(t * speeds[i] + i) * 0.4;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLES_COUNT}
          array={basePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.8}
        color={new THREE.Color("#ffcdd2")}
      />
    </points>
  );
}

