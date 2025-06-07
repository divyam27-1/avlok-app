import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapNavigationView = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered on IIT Tirupati
    const map = L.map(mapRef.current, {
      center: [13.6320, 79.5050],
      zoom: 15,
      zoomControl: false,
    });

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }
    ).addTo(map);

    // Helper to add markers
    const addMarker = (coords: [number, number], color: string) => {
      L.marker(coords, {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white;"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        }),
      }).addTo(map);
    };

    addMarker([13.6320, 79.5050], '#4caf50'); // Main campus marker
    addMarker([13.6330, 79.5070], '#2196f3'); // Drone at Academic Building
    addMarker([13.6300, 79.5030], '#ff9800'); // Drone at Hostel Area
    addMarker([13.6350, 79.5080], '#e91e63'); // Drone at Research Park

    const routeCoordinates: [number, number][] = [
      [13.6320, 79.5050], // Main campus
      [13.6330, 79.5060], // Waypoint 1
      [13.6340, 79.5065], // Waypoint 2
      [13.6335, 79.5075], // Waypoint 3
      [13.6330, 79.5070], // Academic Building
    ];
    L.polyline(routeCoordinates, {
      color: '#4caf50',
      weight: 5,
      opacity: 0.7,
      dashArray: '10, 10',
    }).addTo(map);

    // Handle right-click for context menu
    map.on('contextmenu', (e) => {
      const contextMenu = document.getElementById('contextMenu');
      if (!contextMenu) return;
      contextMenu.style.display = 'block';
      contextMenu.style.left = `${e.originalEvent.pageX}px`;
      contextMenu.style.top = `${e.originalEvent.pageY}px`;

      const closeMenu = () => {
        contextMenu.style.display = 'none';
        window.removeEventListener('click', closeMenu);
      };
      window.addEventListener('click', closeMenu);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Rajdhani', 'Orbitron', 'Segoe UI', sans-serif;
        }

        body {
          background-color: #0e0e18;
          
          color: #05d9e8;
          display: flex;
          flex-direction: column;
                    height: 100%;
          position: relative;
                    overflow: hidden;
        }

        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
              width: 100%;
          height: 100%;
          background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.1) 50%);
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.15;
        }

        header {
          background-color: #131327;
          padding: 12px 20px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          box-shadow: 0 0 15px rgba(255, 42, 109, 0.3);
          z-index: 10;
          border-bottom: 1px solid #ff2a6d;
          position: relative;
        }

        header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #05d9e8, #ff2a6d);
        }

        .logo {
          text-align: left;
          width:200px;
          font-size: 22px;
          font-weight: bold;
          color: #05d9e8;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(5, 217, 232, 0.5);
        }

        .controls {
          display: flex;
          align-items: center;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 15px;
          border-left: 1px solid #ff2a6d;
        }

        .avatar {
          width: 36px;
          height: 36px;
          background-color: rgba(255, 42, 109, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff2a6d;
          font-weight: bold;
          border: 1px solid #ff2a6d;
          box-shadow: 0 0 10px rgba(255, 42, 109, 0.3);
        }

        .main-container {
          display: flex;
          flex: 1;
          
        }

        .sidebar {
          width: 280px;
          background-color: #131327;
          display: flex;
          flex-direction: column;
          box-shadow: 0 0 15px rgba(5, 217, 232, 0.2);
          z-index: 5;
          border-right: 1px solid #05d9e8;
        }

        .search-box {
          position: relative;
          margin-bottom: 8px;
        }

        .search-box input {
          width: 100%;
          height: 40px;
          padding:  15px;
          padding-left: 35px;
          border-radius: 2px;
          border: 1px solid #05d9e8;
          background-color: rgba(5, 217, 232, 0.1);
          color: #05d9e8;
          font-size: 14px;
          box-shadow: 0 0 5px rgba(5, 217, 232, 0.3);
          letter-spacing: 1px;
        }

        .search-box input::placeholder {
          color: rgba(5, 217, 232, 0.5);
        }

        .search-box::before {
          content: "🔍";
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #05d9e8;
        }

        .nav-section {
          margin-bottom: 3px;
          position: relative;
        }

        .nav-section::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, #05d9e8, transparent);
          opacity: 0.3;
        }

        .section-title {
          color: #ff2a6d;
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 10px;
          padding-left: 5px;
          letter-spacing: 2px;
          text-shadow: 0 0 5px rgba(255, 42, 109, 0.5);
          font-weight: bold;
        }

        .location-list {
          list-style: none;
          margin-bottom: 3px;
        }

        .location-item {
          padding: 10px 12px;
          border-radius: 2px;
          margin-bottom: 3px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 10px;
          border-left: 2px solid transparent;
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 1px;
        }

        .location-item:hover {
          background-color: rgba(5, 217, 232, 0.1);
          border-left: 2px solid #05d9e8;
          box-shadow: 0 0 10px rgba(5, 217, 232, 0.2);
        }

        .location-item.active {
          background-color: rgba(255, 42, 109, 0.15);
          color: #ff2a6d;
          border-left: 2px solid #ff2a6d;
          box-shadow: 0 0 10px rgba(255, 42, 109, 0.2);
        }

        .location-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid #05d9e8;
        }

        .location-item.active .location-icon {
          border-color: #ff2a6d;
        }

        .route-info {
          background-color: #131327;
          border-radius: 1px;
          padding: 15px;
          margin-top: 0px;
          border: 1px solid #ff2a6d;
          position: relative;
          box-shadow: 0 0 15px rgba(255, 42, 109, 0.2);
        }

        .route-info::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #ff2a6d, #05d9e8);
        }

        .route-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3px;
        }

        .route-title {
          font-weight: 600;
          color: #ff2a6d;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 0 5px rgba(255, 42, 109, 0.5);
        }

        .route-status {
          padding: 2px 8px;
          border-radius: 2px;
          background-color: rgba(5, 217, 232, 0.2);
          color: #05d9e8;
          font-size: 12px;
          border: 1px solid #05d9e8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .route-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 15px;
        }

        .route-info-row {
          display: flex;
          justify-content: space-between;
        }

        .info-label {
          color: rgba(5, 217, 232, 0.7);
        }

        .info-value {
          font-weight: 500;
          color: #05d9e8;
          text-shadow: 0 0 3px rgba(5, 217, 232, 0.5);
        }

        .btn {
          border-radius: 2px;
          text-align: center;
          border: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-primary {
                          margin-left: 20px;

          background-color: rgba(255, 42, 109, 0.2);

          color: #ff2a6d;
          border: 1px solid #ff2a6d;
        }

        .btn-primary:hover {
          background-color: #ff2a6d;
          color: #131327;
          box-shadow: 0 0 10px rgba(255, 42, 109, 0.5);
        }

        .btn-outline {
                  margin-left: 900px;

          background-color: transparent;
          padding: 10px 15px;
          border: 1px solid #05d9e8;
          color: #05d9e8;
        }

        .btn-outline:hover {
          background-color: rgba(5, 217, 232, 0.15);
          box-shadow: 0 0 10px rgba(5, 217, 232, 0.3);
        }

        .map-container {
          flex: 1;
          position: relative;
          background-color: #131327;
          background-image:
            linear-gradient(rgba(5, 217, 232, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5, 217, 232, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        #map {
          width: 100%;
          height: 100%;
          background-color: #131327;
          opacity: 0.8;
        }

        .map-controls {
          position: absolute;
          width: 80px;
          right: 20px;
          top: 20px;
          background-color: #131327;
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(255, 42, 109, 0.3);
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 1000;
          border: 1px solid #ff2a6d;
        }

        .map-ctrl-btn {
          width: 40px;
          height: 40px;
          background-color: rgba(255, 42, 109, 0.1);
          border: 1px solid #ff2a6d;
          border-radius: 2px;
          color: #ff2a6d;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .map-ctrl-btn:hover {
          background-color: #ff2a6d;
          color: #131327;
          box-shadow: 0 0 10px rgba(255, 42, 109, 0.5);
        }

        .divider {
          height: 1px;
          background-color: #ff2a6d;
          margin: 5px 0;
          opacity: 0.5;
        }

        .layer-toggle {
          position: absolute;
          left: 20px;
          bottom: 20px;
          background-color: #131327;
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(5, 217, 232, 0.3);
          padding: 15px;
          padding-bottom: 10px;
          z-index: 1000;
          width:20%;
          height: 50%;
          border: 1px solid #05d9e8;
        }

        .layer-toggle::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #05d9e8, transparent);
        }

        .layer-toggle-title {
          font-weight: 600;
          margin-bottom: 10px;
          color: #05d9e8;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 0 5px rgba(5, 217, 232, 0.5);
        }

        .layer-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 20px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #131327;
          transition: .4s;
          border-radius: 2px;
          border: 1px solid #05d9e8;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 1px;
          background-color: #05d9e8;
          transition: .4s;
          border-radius: 1px;
          box-shadow: 0 0 5px rgba(5, 217, 232, 0.5);
        }

        input:checked + .toggle-slider {
          background-color: #131327;
          border-color: #ff2a6d;
        }

        input:checked + .toggle-slider:before {
          transform: translateX(20px);
          background-color: #ff2a6d;
          box-shadow: 0 0 5px rgba(255, 42, 109, 0.5);
        }

        .leaflet-container {
          font: inherit;
          filter: hue-rotate(140deg) saturate(1.5) brightness(0.8);
        }

        .leaflet-control-zoom a {
          color: #05d9e8;
          background-color: #131327;
          border: 1px solid #05d9e8;
        }

        .status-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #131327;
          padding: 8px 20px;
          box-shadow: 0 0 10px rgba(255, 42, 109, 0.3);
          border-top: 1px solid #ff2a6d;
          position: relative;
        }

        .status-bar::before {
          content: '';
          position: absolute;
          bottom: auto;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #ff2a6d, #05d9e8);
        }

        .coords {
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: #05d9e8;
          text-shadow: 0 0 5px rgba(5, 217, 232, 0.5);
          letter-spacing: 1px;
        }

        .compass {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .compass-icon {
          font-size: 18px;
          transform: rotate(45deg);
          color: #ff2a6d;
          text-shadow: 0 0 5px rgba(255, 42, 109, 0.5);
        }

        .scale-indicator {
          color: #05d9e8;
          border-left: 1px solid #ff2a6d;
          padding-left: 20px;
        }

        .context-menu {
          position: absolute;
          background-color: #131327;
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(5, 217, 232, 0.3);
          padding: 10px 0;
          min-width: 180px;
          z-index: 1100;
          display: none;
          border: 1px solid #05d9e8;
        }

        .context-menu-item {
          padding: 8px 15px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 10px;
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 1px;
          color: #05d9e8;
        }

        .context-menu-item:hover {
          background-color: rgba(5, 217, 232, 0.1);
          box-shadow: 0 0 10px rgba(5, 217, 232, 0.2);
        }

        .context-menu-separator {
          height: 1px;
          background: linear-gradient(90deg, #05d9e8, transparent);
          margin: 5px 0;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 5px rgba(5, 217, 232, 0.5);
          }
          50% {
            box-shadow: 0 0 15px rgba(5, 217, 232, 0.8);
          }
          100% {
            box-shadow: 0 0 5px rgba(5, 217, 232, 0.5);
          }
        }

        .search-box input:focus {
          animation: pulse 2s infinite;
        }

        .map-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            radial-gradient(circle at 30% 50%, rgba(255, 42, 109, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 50%, rgba(5, 217, 232, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 2;
        }

        @keyframes digitalNoise {
          0%, 100% { opacity: 0.03; }
          10% { opacity: 0.05; }
          20% { opacity: 0.02; }
          30% { opacity: 0.04; }
          40% { opacity: 0.01; }
          50% { opacity: 0.03; }
          60% { opacity: 0.06; }
          70% { opacity: 0.02; }
          80% { opacity: 0.04; }
          90% { opacity: 0.01; }
        }

        .map-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 3;
          animation: digitalNoise 8s steps(1) infinite;
        }
      `}</style>

      <header>
        <div className="logo">Navigation System</div>
        <div className="controls">
          <button className="btn btn-outline">View Routes</button>
          <button className="btn btn-primary">Start Navigation</button>
          <div className="user-info">
            <span>Navigator</span>
            <div className="avatar">N</div>
          </div>
        </div>
      </header>

      <div className="main-container">
        <div className="sidebar">
          <div className="search-box">
            <input type="text" placeholder="Search locations..." />
          </div>

          <div className="nav-section">
            <div className="section-title">Saved Locations</div>
            <ul className="location-list">
              <li className="location-item active">
                <div className="location-icon">📍</div>
                <div>Current Position</div>
              </li>
              <li className="location-item">
                <div className="location-icon">🏠</div>
                <div>Base Station</div>
              </li>
              <li className="location-item">
                <div className="location-icon">🔄</div>
                <div>Checkpoint Alpha</div>
              </li>
              <li className="location-item">
                <div className="location-icon">🏢</div>
                <div>Research Facility</div>
              </li>
              <li className="location-item">
                <div className="location-icon">⚡</div>
                <div>Power Station Delta</div>
              </li>
            </ul>
          </div>

          <div className="nav-section">
            <div className="section-title">Recent Routes</div>
            <ul className="location-list">
              <li className="location-item">
                <div className="location-icon">↔️</div>
                <div>Base Station to Alpha</div>
              </li>
              <li className="location-item">
                <div className="location-icon">↔️</div>
                <div>Alpha to Research</div>
              </li>
            </ul>
          </div>

          <div className="route-info">
            <div className="route-header">
              <div className="route-title">Current Route</div>
              <div className="route-status">Active</div>
            </div>
            <div className="route-details">
              <div className="route-info-row">
                <span className="info-label">Origin:</span>
                <span className="info-value">Current Position</span>
              </div>
              <div className="route-info-row">
                <span className="info-label">Destination:</span>
                <span className="info-value">Base Station</span>
              </div>
              <div className="route-info-row">
                <span className="info-label">Distance:</span>
                <span className="info-value">8.2 km</span>
              </div>
              <div className="route-info-row">
                <span className="info-label">ETA:</span>
                <span className="info-value">12 minutes</span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>
              Modify Route
            </button>
          </div>
        </div>

        <div className="map-container">
          <div ref={mapRef} id="map" />

          <div className="map-controls">
            <button className="map-ctrl-btn">+</button>
            <button className="map-ctrl-btn">-</button>
            <div className="divider" />
            <button className="map-ctrl-btn">⊕</button>
            <button className="map-ctrl-btn">↻</button>
            <div className="divider" />
            <button className="map-ctrl-btn">📸</button>
            <button className="map-ctrl-btn">📝</button>
          </div>

          <div className="layer-toggle">
            <div className="layer-toggle-title">Map Layers</div>
            <div className="layer-option">
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider" />
              </label>
              <span>Terrain</span>
            </div>
            <div className="layer-option">
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider" />
              </label>
              <span>Structures</span>
            </div>
            <div className="layer-option">
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider" />
              </label>
              <span>Routes</span>
            </div>
            <div className="layer-option">
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider" />
              </label>
              <span>Weather Overlay</span>
            </div>
            <div className="layer-option">
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider" />
              </label>
              <span>Heat Signatures</span>
            </div>
          </div>

          <div className="context-menu" id="contextMenu">
            <div className="context-menu-item">
              <span>📍</span>
              <span>Set as Origin</span>
            </div>
            <div className="context-menu-item">
              <span>🏁</span>
              <span>Set as Destination</span>
            </div>
            <div className="context-menu-separator" />
            <div className="context-menu-item">
              <span>📌</span>
              <span>Add Marker</span>
            </div>
            <div className="context-menu-item">
              <span>📝</span>
              <span>Add Note</span>
            </div>
            <div className="context-menu-separator" />
            <div className="context-menu-item">
              <span>ℹ️</span>
              <span>Location Info</span>
            </div>
          </div>
        </div>
      </div>

      <div className="status-bar">
        <div className="coords">
          <span>LAT: 13.6320 N</span> | <span>LONG: 79.5050 W</span> |{' '}
          <span>ALT: 350 m</span>
        </div>
        <div className="compass">
          <span>
            Heading: <strong>NE (45°)</strong>
          </span>
          <span className="compass-icon">➤</span>
        </div>
        <div className="scale-indicator">
          <span>Scale: 1:5000</span>
        </div>
      </div>
    </>
  );
};

export default MapNavigationView;
