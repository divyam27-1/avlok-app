import React, { useState } from 'react';
import './dronecontrol.css';
import { Link } from 'react-router-dom';
const DroneControlInterface = () => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const switchTab = (tabId: string) => {
    setActiveTab(tabId);
  };
  
return(
    <div className="app-container">
      <div className="header">
        <div className="logo">DroneView Control Panel  
        </div>
        <div className="status">
          <span style={{ color: '#2ecc71' }}>● Connected</span>
          <span style={{ marginLeft: '15px' }}>Drone ID: DJI-X2000</span>
        </div>
      </div>
      <div className="nav-tabs">
        <div
          className="tab active  control-button"
          onClick={() => switchTab('monitoring')}
        >
          <button className="control-button">Live Monitoring</button>
        </div>
        <br />
        <br />

        <div className="tab active">
         <Link to="/telemetry" style={{ textDecoration: 'none', color: 'white' }}>
  <button className="control-button">Telemetry Data</button>
</Link>
        </div>
        <br />
        <br />

        <div className="tab active">
          
          <Link to="/dronecontrolinterface" style={{ textDecoration: 'none', color: 'white' }}>
  <button className="control-button">Control Panel</button>
</Link>
        </div>
        <br />
        <br />

        <div className="tab active">

              <Link to="/dronecontrolinterface" style={{ textDecoration: 'none', color: 'white' }}>
  <button className="control-button">Navigation Map</button>
</Link>
        </div>
        <br />
        <br />

        <div className="tab active">
          
             <Link to="/dronecontrolinterface" style={{ textDecoration: 'none', color: 'white' }}>
  <button className="control-button">Alerts & Status</button>
</Link>
        </div>
        <br />
        <br />
      </div>

      {/* Main Monitoring View */}
      <div id="monitoring" className="screen active">
        <h2>Live Video Feeds</h2>
        <div className="video-feeds">
          <div className="primary-feed">
            <div className="feed-label">Primary Camera</div>
            <img
              src="src/ui/assets/vd.webp"
              alt="Primary Camera Feed"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="secondary-feeds">
            <div className="secondary-feed">
              <div className="feed-label">Secondary Camera</div>
              <img
                src="src/ui/assets/vd.webp"
                alt="Secondary Camera Feed"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="secondary-feed">
              <div className="feed-label">Thermal Camera</div>
              <img
                src="src/ui/assets/vd.webp"
                alt="Thermal Camera Feed"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'hue-rotate(180deg) contrast(1.5)',
                }}
              />
            </div>
          </div>
        </div>

        <div className="controls-bar">
          <div>
            <button className="control-button">Switch Main Feed</button>
            <button className="control-button">Take Screenshot</button>
            <button className="control-button">Record</button>
          </div>
          <button className="control-button danger">Emergency Stop</button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Quick Telemetry</h3>
          <div style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>
            <div>
              <span style={{ fontSize: '14px', color: '#7f8c8d' }}>Battery</span>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>72% (28 min)</div>
            </div>
            <div>
              <span style={{ fontSize: '14px', color: '#7f8c8d' }}>Altitude</span>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>120 m</div>
            </div>
            <div>
              <span style={{ fontSize: '14px', color: '#7f8c8d' }}>Speed</span>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>18 km/h</div>
            </div>
            <div>
              <span style={{ fontSize: '14px', color: '#7f8c8d' }}>Status</span>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2ecc71' }}>
                Active Mission
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
};
export default DroneControlInterface;
