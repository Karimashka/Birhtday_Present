import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Table } from "./Table.jsx";
import { Cake } from "./Cake.jsx";
import { PhotoFrames } from "./PhotoFrames.jsx";
import { Particles } from "./Particles.jsx";
import { Confetti } from "./Confetti.jsx";
import { BirthdayText } from "./BirthdayText.jsx";
import { CityBackground } from "./CityBackground.jsx";
import { Lights } from "./Lights.jsx";

export function Scene({
  photos,
  backgroundPhotos,
  candlesOff,
  showConfetti,
  birthdayMessage,
}) {
  const hasMessage = Boolean(birthdayMessage);

  return (
    <>
      <Suspense fallback={null}>
        <CityBackground backgroundPhotos={backgroundPhotos} />
        <Lights />

        <group position={[0, 0, 0]}>
          <Table />
          <Cake candlesOff={candlesOff} />
          <PhotoFrames photos={photos} />
          {hasMessage && <BirthdayText />}
        </group>

        <Particles />
        {showConfetti && <Confetti />}
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={0.4}
        target={[0, 1.0, 0]}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={0.45}
      />
    </>
  );
}

