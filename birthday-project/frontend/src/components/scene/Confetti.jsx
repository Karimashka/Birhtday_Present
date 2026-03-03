import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CONFETTI_COUNT = 220;

export function Confetti() {
  const meshRef = useRef();

  const { positions, velocities, colors } = useMemo(() => {
    const positions = [];
    const velocities = [];
    const colors = [];

    const palette = ["#ff9a9e", "#fecfef", "#fbc2eb", "#a18cd1", "#f6d365"];

    for (let i = 0; i < CONFETTI_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * 5,
        3 + Math.random() * 3,
        (Math.random() - 0.5) * 5
      );
      velocities.push(
        (Math.random() - 0.5) * 0.03,
        -0.03 - Math.random() * 0.04,
        (Math.random() - 0.5) * 0.03
      );
      const c = new THREE.Color(palette[i % palette.length]);
      colors.push(c.r, c.g, c.b);
    }

    return { positions, velocities, colors };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const i3 = i * 3;

      positions[i3 + 0] += velocities[i3 + 0];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      if (positions[i3 + 1] < 0.3) {
        positions[i3 + 0] = (Math.random() - 0.5) * 4;
        positions[i3 + 1] = 3 + Math.random() * 2;
        positions[i3 + 2] = (Math.random() - 0.5) * 4;
      }

      dummy.position.set(
        positions[i3 + 0],
        positions[i3 + 1],
        positions[i3 + 2]
      );
      dummy.rotation.set(
        Math.sin(t * 3 + i) * Math.PI,
        Math.cos(t * 2 + i) * Math.PI,
        Math.sin(t * 1.5 + i) * Math.PI
      );
      const scale = 0.1 + (i % 10) * 0.01;
      dummy.scale.set(scale, scale * 0.3, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const colorArray = useMemo(() => new Float32Array(colors), [colors]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, CONFETTI_COUNT]} castShadow>
      <boxGeometry args={[0.2, 0.05, 0.02]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </boxGeometry>
      <meshStandardMaterial vertexColors />
    </instancedMesh>
  );
}

