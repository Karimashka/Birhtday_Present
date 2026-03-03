import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Cake({ candlesOff }) {
  const candleLightsRef = useRef([]);
  const candleFlamesRef = useRef([]);

  useFrame(() => {
    const targetIntensity = candlesOff ? 0 : 1.7;

    candleLightsRef.current.forEach((light) => {
      if (!light) return;
      light.intensity += (targetIntensity - light.intensity) * 0.06;
    });

    candleFlamesRef.current.forEach((mesh) => {
      if (!mesh) return;
      const scaleTarget = candlesOff ? 0.0 : 1.0;
      mesh.scale.y += (scaleTarget - mesh.scale.y) * 0.08;
      mesh.scale.x = mesh.scale.z = mesh.scale.y * 0.6;
    });
  });

  const candleCount = 6;
  const candleRadius = 0.55;

  const candlePositions = Array.from({ length: candleCount }, (_, i) => {
    const angle = (i / candleCount) * Math.PI * 2;
    return [Math.cos(angle) * candleRadius, 1.77, Math.sin(angle) * candleRadius];
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.5, 48]} />
        <meshStandardMaterial
          color="#f5c9d6"
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>



      <mesh castShadow position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.6, 0.65, 0.35, 48]} />
        <meshStandardMaterial
          color="#f9e3ff"
          roughness={0.25}
          metalness={0.03}
        />
      </mesh>

      <mesh castShadow position={[0, 1.77, 0]}>
        <cylinderGeometry args={[0.64, 0.64, 0.1, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {[
        [0.5, 1.84, 0],
        [-0.5, 1.84, 0],
        [0, 1.84, 0.5],
        [0, 1.84, -0.5],
        [0.35, 1.84, 0.35],
        [0.35, 1.84, -0.35],
        [-0.35, 1.84, 0.35],
        [-0.35, 1.84, -0.35],
      ].map(([x, y, z], index) => (
        <mesh key={`berry-${index}`} castShadow position={[x, y, z]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#ff4b6e"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      ))}

      {candlePositions.map((pos, index) => (
        <group key={index} position={pos}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.25, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>

          <mesh
            castShadow
            position={[0, 0.2, 0]}
            ref={(el) => (candleFlamesRef.current[index] = el)}
          >
            <coneGeometry args={[0.06, 0.16, 16]} />
            <meshStandardMaterial
              color="#ffd27f"
              emissive="#ffcf73"
              emissiveIntensity={1.6}
            />
          </mesh>

          <pointLight
            ref={(el) => (candleLightsRef.current[index] = el)}
            color="#ffddaa"
            intensity={1.7}
            distance={3}
            decay={2}
            position={[0, 0.25, 0]}
            castShadow
          />
        </group>
      ))}
    </group>
  );
}

