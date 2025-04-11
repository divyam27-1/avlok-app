import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function DroneModel({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF("/flying_drone.glb");
  return <primitive object={scene} scale={0.5} position={position} />;
}

function CameraController({ dronePosition }: { dronePosition: [number, number, number] }) {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.lerp(new THREE.Vector3(...dronePosition, 100), 0.1);
      cameraRef.current.lookAt(new THREE.Vector3(...dronePosition, 0));
    }
  });

  return <perspectiveCamera ref={cameraRef} position={[0, 0, 100]} />;
}

export default function Drone3D({ dronePosition }: { dronePosition: { lat: number, lng: number } }) {
  const convertTo3D = (lat: number, lng: number): [number, number, number] => {
    const x = (lng - 77.5946) * 5000;
    const y = -(lat - 12.9716) * 5000;
    return [x, y, 50];
  };

  const drone3DPosition = convertTo3D(dronePosition.lat, dronePosition.lng);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-50">
      <Canvas>
        <ambientLight intensity={1} />
        <CameraController dronePosition={drone3DPosition} />
        <DroneModel position={drone3DPosition} />
      </Canvas>
    </div>
  );
}
