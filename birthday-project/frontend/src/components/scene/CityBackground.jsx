import React, { useMemo } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

export function CityBackground({ backgroundPhotos }) {
  const hasBackground = Array.isArray(backgroundPhotos) && backgroundPhotos.length > 0;

  const urls = useMemo(() => {
    if (!hasBackground) return [];
    const limited = backgroundPhotos.slice(0, 4);
    return limited;
  }, [hasBackground, backgroundPhotos]);

  const textures = hasBackground ? useLoader(TextureLoader, urls) : [];

  const panels = useMemo(
    () => [
      { position: [-9, 2.2, -10], rotationY: 0.43 },
      { position: [-3,2.2, -11.5], rotationY: 0.18 },
      { position: [3, 2.2, -11.5], rotationY: -0.18 },
      { position: [9, 2.2, -10], rotationY: -0.43 },
    ],
    []
  );

  return (
    <group>
      <mesh scale={[40, 40, 40]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial side={THREE.BackSide} color="#050816" />
      </mesh>

      <fog attach="fog" args={["#050416", 10, 40]} />

      {hasBackground &&
        textures.map((tex, index) => {
          const panel = panels[index] || panels[panels.length - 1];
          return (
            <mesh
              key={index}
              position={panel.position}
              rotation={[0, panel.rotationY, 0]}
            >
              <planeGeometry args={[6, 5]} />
              <meshStandardMaterial
                map={tex}
                roughness={0.9}
                metalness={0}
              />
            </mesh>
          );
        })}
    </group>
  );
}

