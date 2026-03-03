import React from "react";
import { ContactShadows } from "@react-three/drei";

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#fde2ff" />

      <pointLight
        position={[0, 4.5, 3]}
        intensity={1.5}
        distance={18}
        decay={2}
        color="#ffd1a1"
        castShadow
      />

      <pointLight
        position={[0, 4, -5]}
        intensity={0.7}
        distance={18}
        decay={2}
        color="#60a5fa"
      />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.45}
        width={10}
        height={10}
        blur={2.6}
        far={8}
        resolution={1024}
        color="#090314"
      />
    </>
  );
}

