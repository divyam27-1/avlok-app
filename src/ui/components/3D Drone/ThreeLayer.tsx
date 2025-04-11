import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { LatLng, Map } from "leaflet";

interface ThreeLayerProps {
  dronePosition: LatLng | null;
  map: Map | null;
}

const ThreeLayer = ({ dronePosition, map }: ThreeLayerProps) => {
  const droneRef = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, "/flying_drone.glb"); // ✅ Ensure correct path

  useEffect(() => {
    if (!droneRef.current || !map || !dronePosition) return;

    const updateDronePosition = () => {
      const point = map.latLngToContainerPoint(dronePosition); // ✅ Use `latLngToContainerPoint` for better accuracy

      // Correct Three.js positioning
      droneRef.current?.position.set(point.x, -point.y, 0);
    };

    updateDronePosition(); // Initial positioning
    map.on("move", updateDronePosition);

    return () => map.off("move", updateDronePosition);
  }, [dronePosition, map]);

  useFrame(() => {
    if (droneRef.current) {
      droneRef.current.rotation.y += 0.01; // ✅ Rotate drone slightly
    }
  });

  return (
    <group ref={droneRef} scale={[5, 5, 5]}>
      <primitive object={gltf.scene} />
    </group>
  );
};

const CustomThreeLayer = ({ dronePosition, map }: ThreeLayerProps) => (
  <Canvas
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none", // ✅ Allow interactions with the map
      zIndex: 1000,
    }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 10]} />
    {dronePosition && map && <ThreeLayer dronePosition={dronePosition} map={map} />}
  </Canvas>
);

export default CustomThreeLayer;
