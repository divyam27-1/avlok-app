import React, { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
import { SphereGeometry } from "@luma.gl/core";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

interface DeckDroneLayerProps {
  dronePosition: LatLng | null;
}

const INITIAL_VIEW_STATE = {
  latitude: 12.9716,
  longitude: 77.5946,
  zoom: 15,
  pitch: 45, // Adds 3D perspective
  bearing: 0,
};

const DeckDroneLayer: React.FC<DeckDroneLayerProps> = ({ dronePosition }) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [droneMesh, setDroneMesh] = useState<SphereGeometry | null>(null);

  useEffect(() => {
    // Load 3D model (GLTF)
    const loader = new GLTFLoader();
    loader.load("../../../public/flying_drone.glb", (gltf) => {
      setDroneMesh(gltf.scene);
    });

    if (dronePosition) {
      setViewState((prev) => ({
        ...prev,
        latitude: dronePosition.lat,
        longitude: dronePosition.lng,
      }));
    }
  }, [dronePosition]);

  const droneLayer = new SimpleMeshLayer({
    id: "drone-layer",
    data: dronePosition ? [{ position: [dronePosition.lng, dronePosition.lat] }] : [],
    mesh: droneMesh || new SphereGeometry(1, 16, 16), // Use sphere if model is not loaded
    getPosition: (d) => d.position,
    getColor: [255, 0, 0], // Red color
    sizeScale: 100, // Scale the model
    pickable: true,
  });

  return (
    <DeckGL
      viewState={viewState}
      layers={[droneLayer]}
      controller={true}
      onViewStateChange={({ viewState }) =>
        setViewState((prev) => ({
          ...prev,
          latitude: viewState.latitude,
          longitude: viewState.longitude,
          zoom: viewState.zoom,
          pitch: viewState.pitch,
          bearing: viewState.bearing,
        }))
      }
    />
  );
};

export default DeckDroneLayer;
