import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Polyline, Tooltip } from 'react-leaflet';
import { getShortestPath, getLastConfirmedNode, getGraph } from '../../electron/drone_path';
//import CustomThreeLayer from './ThreeLayer';

// Fetch the graph data
const graph = getGraph();

interface CampusMapProps {
    dronePosition: L.LatLng | null;
    setDronePosition: (pos: L.LatLng) => void;
    setDroneAltitude: (altitude: number) => void;
    setDroneTargetNode: (nodeId: string) => void;
}

// Default Leaflet marker
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;


const DroneIcon = L.icon({
    iconUrl: '../../../assets/applogo.png',
    iconSize: [33, 33], 
    iconAnchor: [15, 15], 
});

const CampusMap = ({ dronePosition, setDronePosition, setDroneAltitude, setDroneTargetNode }: CampusMapProps) => {
    const [currentNode, setCurrentNode] = useState(getLastConfirmedNode());
    const [allNodes, setAllNodes] = useState<L.LatLng[]>([]);
    const [routePath, setRoutePath] = useState<L.LatLng[]>([]);
    const mapRef = useRef(null);
    const [map, setMap] = useState<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current) {
            setMap(mapRef.current);
        }
    }, [mapRef]);

    useEffect(() => {
        const nodes = Object.values(graph).map((node) => new L.LatLng(node.latitude, node.longitude));
        setAllNodes(nodes);
    }, []);

    const moveDrone = async (path: L.LatLng[], targetNodeId: string) => {
        setDroneTargetNode(targetNodeId);
        for (const point of path) {
            setDronePosition(point);
            setDroneAltitude(20);
            await new Promise(res => setTimeout(res, 1000));
        }
    };

    const handleMarkerClick = (node: any) => {
        if (node === currentNode) return;
        setRoutePath([]);
        const lastNode = currentNode;
        const targetNode = node['id'];

        if (lastNode && targetNode) {
            const route = getShortestPath(lastNode, targetNode);
            if (route.length > 0) {
                const path = route.map((nodeId: string) => {
                    const nodeData = graph[nodeId];
                    return new L.LatLng(nodeData.latitude, nodeData.longitude);
                });
                setRoutePath(path);
                moveDrone(path, targetNode);
                setCurrentNode(targetNode);
            }
        }
    };

    return (
        <MapContainer center={[13.7080, 79.5920]} minZoom = {16}zoom={70} ref={mapRef} style={{ height: "100vh", width: "100vw", zIndex: 1 }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {allNodes.map((pos, idx) => (
                <Marker key={`node-${idx}`} position={pos} eventHandlers={{ click: () => handleMarkerClick(graph[`node${idx + 1}`]) }}>
                    <Tooltip>
                        <span>Node {idx + 1}</span>
                    </Tooltip>
                </Marker>
            ))}

            {dronePosition && (
                <>
                    {/* 2D Drone Marker */}
                    <Marker position={dronePosition} icon={DroneIcon}>
                        <Tooltip>Drone</Tooltip>
                    </Marker>

                    {/* 3D Drone Model 
                    <CustomThreeLayer dronePosition={dronePosition} map={map} />*/}
                </>
            )}

            {routePath.length > 0 && <Polyline positions={routePath} color="blue" />}
        </MapContainer>
    );
};

export default CampusMap;
