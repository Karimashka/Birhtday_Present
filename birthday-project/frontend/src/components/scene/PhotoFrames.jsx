import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export function PhotoFrames({ photos }) {
  const urls = useMemo(
    () =>
      (photos && photos.length
        ? photos
        : ["/static/photo1.jpg", "/static/photo2.jpg", "/static/photo3.jpg"]
      ).slice(0, 3),
    [photos]
  );

  const textures = useLoader(TextureLoader, urls);

  const framePositions = [
    [-1.5, 1.1, 0.3],
    [0, 1.15, -1.4],
    [1.5, 1.1, 0.3],
  ];

  const frameRotations = [
    [0, 0.35, 0],
    [0, 0, 0],
    [0, -0.35, 0],
  ];

  return (
    <group>
      {textures.map((tex, index) => (
        <group
          key={index}
          position={framePositions[index]}
          rotation={frameRotations[index]}
          scale={[1.44, 1.44, 1.44]}
        >
          <mesh castShadow position={[0, 0.35, 0]}>
            <boxGeometry args={[0.7, 0.9, 0.04]} />
            <meshStandardMaterial
              color="#2d1b2f"
              roughness={0.45}
              metalness={0.2}
            />
          </mesh>

          <mesh castShadow position={[0, 0.35, 0.023]}>
            <planeGeometry args={[0.6, 0.8]} />
            <meshStandardMaterial
              map={tex}
              roughness={0.9}
              metalness={0}
              toneMapped
            />
          </mesh>

          <mesh castShadow position={[0, 0, -0.1]} rotation={[-0.7, 0, 0]}>
            <boxGeometry args={[0.5, 0.02, 0.3]} />
            <meshStandardMaterial color="#1a1018" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

