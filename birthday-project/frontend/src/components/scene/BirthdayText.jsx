import React from "react";
import { Text } from "@react-three/drei";

export function BirthdayText() {
  return (
    <group position={[0, 3.0, 0]}>
      <Text
        position={[0, 0, 0]}
        fontSize={0.4}
        color="#ffe4f3"
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        maxWidth={4}
        lineHeight={1.2}
        outlineWidth={0.02}
        outlineColor="#ff9a9e"
      >
        {"С днём рождения,\nСолнышко ❤️!"}
      </Text>
    </group>
  );
}

