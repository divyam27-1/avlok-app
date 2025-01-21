import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
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

    const [markerPos, setMarkerPos] = useState<L.LatLng | null>(null);

    const MapClickHandler = () => {
        useMapEvents({
            click(e){
                // setMarkerPos(e.latlng);
                let lastNode = getLastConfirmedNode();
                let targetNode = getCurrentTargetNode();
                if (lastNode && targetNode){
                    let route = getShortestPath(lastNode, targetNode);
                    for (let node of route){
                        let nodeData = graph[node];
                        setMarkerPos(new LatLng(nodeData.latitude, nodeData.longitude));
                    }
                } else {
                    setMarkerPos(e.latlng);
                }
            },
        });
        return null;
    }

    const mapRef = useRef(null);
    const latitude = 51.505;
    const longitude = -0.09;

    return (
        // <div>
        // <iframe
        //     className="h-screen w-screen"
        //     src="https://www.openstreetmap.org/export/embed.html?bbox=79.56560611724855%2C13.701237426461857%2C79.60980892181398%2C13.721916812271687&amp;layer=mapnik"
        //     style={{border: "1px solid black"}}>
        // </iframe>
        
        // <br/>
        // </div>
        <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            >
            </TileLayer>
            <MapClickHandler></MapClickHandler>
            {markerPos && <Marker position={markerPos}></Marker>}
        </MapContainer>
    )
}

export default CampusMap;