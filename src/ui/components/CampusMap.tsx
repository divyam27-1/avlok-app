import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
import { Polyline, Tooltip } from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { getShortestPath, getLastConfirmedNode, getCurrentTargetNode, getGraph } from '../../electron/drone_path';

const graph = getGraph();

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41], // Adjust anchor for proper placement
});


L.Marker.prototype.options.icon = DefaultIcon;

const CampusMap = () => {

    // const [markerPos, setMarkerPos] = useState<L.LatLng | null>(null);
    const [currentNode, setCurrentNode] = useState(getLastConfirmedNode());
    const [allNodes, setAllNodes] = useState<L.LatLng[]>([]);
    const [routePath, setRoutePath] = useState<L.LatLng[]>([]);

    useEffect(() => {
        const nodes = Object.values(graph).map((node) => new L.LatLng(node.latitude, node.longitude));
        setAllNodes(nodes); // Set all nodes as markers
    }, []);
    

    

    const mapRef = useRef(null);
    const latitude = 12.9716;
    const longitude = 77.5946;

    const handleMarkerClick = (node) => {
        setRoutePath([]);
        const lastNode = currentNode;
        const targetNode = node['id'];
    
                if (lastNode && targetNode) {
                    const route = getShortestPath(lastNode, targetNode);
    
                    if (route.length > 0) {
                        // Convert the route into LatLng objects
                        const path = route.map((nodeId) => {
                            const nodeData = graph[nodeId];
                            return new L.LatLng(nodeData.latitude, nodeData.longitude);
                        });
                        setRoutePath(path); // Set the route for the polyline
                        setCurrentNode(targetNode);
                    }
                } else {
                    console.warn("Last node or target node is missing");
                }
      };

    return (
        // <div>
        // <iframe
        //     className="h-screen w-screen"
        //     src="https://www.openstreetmap.org/export/embed.html?bbox=79.56560611724855%2C13.701237426461857%2C79.60980892181398%2C13.721916812271687&amp;layer=mapnik"
        //     style={{border: "1px solid black"}}>
        // </iframe>
        
        // <br/>
        // </div>
        <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{height: "100vh", width: "100vw", zIndex: 1}}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            >
            </TileLayer>
            {allNodes.map((pos, idx) => (
        <Marker key={`node-${idx}`} position={pos} eventHandlers={{
            click: () => handleMarkerClick(graph[`node${idx + 1}`]),
        }}>
            <Tooltip>
                <span>Node {idx + 1}</span>
            </Tooltip>
        </Marker>
    ))}
    {routePath.length > 0 && <Polyline positions={routePath} color="blue" />}
        </MapContainer>
    )
}

export default CampusMap;