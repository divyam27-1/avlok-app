import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

const CampusMap = () => {
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
            url="https://www.openstreetmap.org/export/embed.html?bbox=79.56560611724855%2C13.701237426461857%2C79.60980892181398%2C13.721916812271687&amp;layer=mapnik"
            >
            </TileLayer>
            <Marker position={[latitude, longitude]} />
        </MapContainer>
    )
}

export default CampusMap;