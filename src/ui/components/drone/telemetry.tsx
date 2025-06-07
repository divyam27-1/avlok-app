import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TelemetryDashboard: React.FC = () => {
  const performanceChartRef = useRef<HTMLCanvasElement>(null);
  const networkChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (performanceChartRef.current) {
      const performanceCtx = performanceChartRef.current.getContext('2d')!;
      const performanceChart = new Chart(performanceCtx, {
        type: 'line',
        data: {
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
          datasets: [
            {
              label: 'CPU Usage (%)',
              data: [35, 42, 67, 58, 49, 53, 42, 40],
              backgroundColor: 'rgba(94, 114, 228, 0.2)',
              borderColor: 'rgba(94, 114, 228, 1)',
              borderWidth: 2,
              tension: 0.4,
            },
            {
              label: 'Memory Usage (%)',
              data: [62, 58, 69, 72, 67, 65, 63, 67],
              backgroundColor: 'rgba(0, 214, 125, 0.2)',
              borderColor: 'rgba(0, 214, 125, 1)',
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#ffffff',
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.05)',
              },
              ticks: {
                color: '#8a8a9b',
              },
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.05)',
              },
              ticks: {
                color: '#8a8a9b',
              },
            },
          },
        },
      });

      // 2b. Cleanup function for performanceChart
      return () => {
        performanceChart.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (networkChartRef.current) {
      const networkCtx = networkChartRef.current.getContext('2d')!;
      const networkChart = new Chart(networkCtx, {
        type: 'bar',
        data: {
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
          datasets: [
            {
              label: 'Upload (MB/s)',
              data: [4.2, 3.8, 1.5, 6.8, 7.2, 5.3, 4.9, 3.4],
              backgroundColor: 'rgba(255, 75, 96, 0.7)',
              borderColor: 'rgba(255, 75, 96, 1)',
              borderWidth: 1,
            },
            {
              label: 'Download (MB/s)',
              data: [8.3, 7.6, 3.2, 11.5, 12.4, 9.8, 8.7, 6.2],
              backgroundColor: 'rgba(255, 182, 40, 0.7)',
              borderColor: 'rgba(255, 182, 40, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#ffffff',
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.05)',
              },
              ticks: {
                color: '#8a8a9b',
              },
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.05)',
              },
              ticks: {
                color: '#8a8a9b',
              },
            },
          },
        },
      });

      return () => {
        networkChart.destroy();
      };
    }
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Rajdhani', 'Orbitron', 'Segoe UI', sans-serif;
        }

        body {
          background-color: #0e0e18;
          color: #ffffff;
          background-image: linear-gradient(45deg, #0e0e18 0%, #131327 100%);
        }

        .container {
          width: 95%;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ff2a6d;
          box-shadow: 0 0 15px rgba(255, 42, 109, 0.3);
          border-radius: 2px;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #05d9e8;
          margin-bottom: 20px;
        }

        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #05d9e8;
          text-shadow: 0 0 10px rgba(5, 217, 232, 0.7);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .user-info {
          display: flex;
          align-items: center;
          margin-right: 20px;
          gap: 10px;
        }

        .avatar {
          width: 45px;
          height: 45px;
          background-color: #ff2a6d;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(255, 42, 109, 0.7);
        }

        .dashboard {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px;
        }

        .card {
          background-color: #131327;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          border: 1px solid #05d9e8;
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #05d9e8, #ff2a6d);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #05d9e8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .toolbar {
          display: flex;
          gap: 10px;
        }

        .toolbar button {
          background-color: #131327;
          border: 1px solid #05d9e8;
          color: #05d9e8;
          padding: 5px 12px;
          border-radius: 2px;
          cursor: pointer;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .toolbar button:hover {
          background-color: #05d9e8;
          color: #131327;
          box-shadow: 0 0 10px rgba(5, 217, 232, 0.7);
        }

        .chart-container {
          height: 300px;
          position: relative;
          border: 1px dashed #ff2a6d;
          border-radius: 2px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 15px;
        }

        .stat-card {
          background-color: #131327;
          padding: 15px;
          border-radius: 2px;
          text-align: center;
          border: 1px solid #05d9e8;
          position: relative;
          overflow: hidden;
        }

        .stat-value {
          font-size: 28px;
          font-weight: bold;
          margin: 10px 0;
          color: #05d9e8;
          text-shadow: 0 0 5px rgba(5, 217, 232, 0.7);
        }

        .stat-label {
          font-size: 14px;
          color: #ff2a6d;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }

        .data-table th,
        .data-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #05d9e8;
        }

        .data-table th {
          color: #ff2a6d;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .status {
          padding: 4px 10px;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .status-normal {
          background-color: #05d9e8;
          color: #131327;
          box-shadow: 0 0 5px rgba(5, 217, 232, 0.7);
        }

        .status-warning {
          background-color: #ffd300;
          color: #131327;
          box-shadow: 0 0 5px rgba(255, 211, 0, 0.7);
        }

        .status-alert {
          background-color: #ff2a6d;
          color: #131327;
          box-shadow: 0 0 5px rgba(255, 42, 109, 0.7);
        }

        .navigation {
          display: flex;
          margin-bottom: 20px;
        }

        .nav-item {
          padding: 10px 15px;
          color: #888899;
          cursor: pointer;
          margin-right: 15px;
          border-bottom: 2px solid transparent;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .nav-item.active {
          color: #05d9e8;
          border-bottom: 2px solid #ff2a6d;
          text-shadow: 0 0 5px rgba(5, 217, 232, 0.7);
        }

        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 #ff2a6d, -0.05em -0.025em 0 #05d9e8;
          }
          25% {
            text-shadow: -0.05em -0.025em 0 #ff2a6d, 0.025em 0.025em 0 #05d9e8;
          }
          50% {
            text-shadow: 0.025em 0.05em 0 #ff2a6d, 0 -0.05em 0 #05d9e8;
          }
          75% {
            text-shadow: -0.025em -0.025em 0 #ff2a6d, -0.025em -0.05em 0 #05d9e8;
          }
          100% {
            text-shadow: -0.025em 0 0 #ff2a6d, 0.025em -0.025em 0 #05d9e8;
          }
        }

        .logo:hover {
          animation: glitch 0.5s infinite;
        }

        .user-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          background-color: rgba(5, 217, 232, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #05d9e8;
          font-weight: bold;
          border: 1px solid #05d9e8;
        }

        /* Scan line effect */
        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.1) 50%);
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.15;
        }
      `}</style>

      <div className="container">
        <header>
          <div className="logo">Telemetry Dashboard</div>
          <div className="user-info">
            <span></span>
            <div className="user-avatar">SP</div>
          </div>
        </header>

        <div className="navigation">
          <div className="nav-item active">Overview</div>
          <div className="nav-item">Systems</div>
          <div className="nav-item">Performance</div>
          <div className="nav-item">Historical Data</div>
          <div className="nav-item">Settings</div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">CPU Usage</div>
            <div className="stat-value">42%</div>
            <div>4 Cores Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Memory</div>
            <div className="stat-value">67%</div>
            <div>16 GB Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Network</div>
            <div className="stat-value">12.4 MB/s</div>
            <div>893 GB Monthly</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Disk Space</div>
            <div className="stat-value">78%</div>
            <div>1.2 TB Used</div>
          </div>
        </div>

        <div className="dashboard">
          <div className="card">
            <div className="card-header">
              <div className="card-title">System Performance</div>
              <div className="toolbar">
                <button>Day</button>
                <button>Week</button>
                <button>Month</button>
              </div>
            </div>
            <div className="chart-container">
              <canvas ref={performanceChartRef} />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Network Activity</div>
              <div className="toolbar">
                <button>Export</button>
                <button>Refresh</button>
              </div>
            </div>
            <div className="chart-container">
              <canvas ref={networkChartRef} />
            </div>
          </div>

          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div className="card-header">
              <div className="card-title">Active Sensors</div>
              <div className="toolbar">
                <button>Filter</button>
                <button>Sort</button>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sensor ID</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Latest Reading</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SNS-0042</td>
                  <td>Main Engine</td>
                  <td>Temperature</td>
                  <td>82.3°C</td>
                  <td>
                    <span className="status status-normal">Normal</span>
                  </td>
                </tr>
                <tr>
                  <td>SNS-0078</td>
                  <td>Cooling System</td>
                  <td>Pressure</td>
                  <td>43.7 PSI</td>
                  <td>
                    <span className="status status-warning">Warning</span>
                  </td>
                </tr>
                <tr>
                  <td>SNS-0103</td>
                  <td>Navigation</td>
                  <td>GPS</td>
                  <td>41.8781° N, 87.6298° W</td>
                  <td>
                    <span className="status status-normal">Normal</span>
                  </td>
                </tr>
                <tr>
                  <td>SNS-0126</td>
                  <td>Fuel Tank</td>
                  <td>Level</td>
                  <td>72.4%</td>
                  <td>
                    <span className="status status-normal">Normal</span>
                  </td>
                </tr>
                <tr>
                  <td>SNS-0132</td>
                  <td>Main Cabin</td>
                  <td>Air Quality</td>
                  <td>89 AQI</td>
                  <td>
                    <span className="status status-alert">Alert</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TelemetryDashboard;
