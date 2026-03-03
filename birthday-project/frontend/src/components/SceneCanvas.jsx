import React from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene/Scene.jsx";

export default function SceneCanvas({
  photos,
  backgroundPhotos,
  candlesOff,
  showConfetti,
  birthdayMessage,
}) {
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        camera={{ position: [0, 3.5, 9], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#050816"]} />
        <Scene
          photos={photos}
          backgroundPhotos={backgroundPhotos}
          candlesOff={candlesOff}
          showConfetti={showConfetti}
          birthdayMessage={birthdayMessage}
        />
      </Canvas>
    </div>
  );
}

