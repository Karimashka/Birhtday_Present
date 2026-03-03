import React from "react";

export function Table() {
  return (
    <group position={[0, 0, 0]}>
      {/* Круглая столешница */}
      <mesh receiveShadow castShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.15, 48]} />
        <meshStandardMaterial
          color="#2a1a24"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Квадратная скатерть, немного свисающая со стола */}
      <mesh position={[0, 1.06, 0]}>
        <boxGeometry args={[5.4, 0.04, 5.4]} />
        <meshStandardMaterial
          color="#151515"
          roughness={0.85}
          metalness={0.0}
        />
      </mesh>

      {/* Ножка стола */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.25, 0.5, 1.1, 24]} />
        <meshStandardMaterial
          color="#1a1016"
          metalness={0.05}
          roughness={0.6}
        />
      </mesh>

      {/* Основание */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.3, 0.2, 32]} />
        <meshStandardMaterial color="#100810" roughness={0.7} />
      </mesh>
    </group>
  );
}

