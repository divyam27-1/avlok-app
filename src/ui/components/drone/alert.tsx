import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AlertStatusScreen = () => {
      const navigate = useNavigate();

  useEffect(() => {
    function updateTime() {
      const now = new Date();

let hours: string = now.getHours() < 10 ? '0' + now.getHours() : now.getHours().toString();
let minutes: string = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes().toString();
let seconds: string = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds().toString();

const timeString = `${hours}:${minutes}:${seconds}`;
console.log(timeString);

      const timeElem = document.getElementById('time');
      if (timeElem) {
        timeElem.textContent = `${hours}:${minutes}:${seconds}`;
      }

      setTimeout(updateTime, 1000);
    }

    updateTime();
document.querySelectorAll('.resolve-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
      const target = event.currentTarget as HTMLElement;
      // ‘closest’ returns Element | null, so cast to HTMLElement
      const alertItem = target.closest('.alert-item') as HTMLElement | null;
      if (alertItem) {
        // Now that alertItem is typed as HTMLElement, .style is available:
        alertItem.style.opacity = '0.5';
        alertItem.style.animation = 'none';

        // Create a new "resolved" message in activity
        const activityList = document.querySelector('.activity-list') as HTMLElement | null;
        if (activityList) {
          const newActivity = document.createElement('div');
          newActivity.className = 'activity-item';

          const now = new Date();
          const hours: string = now.getHours() < 10
            ? '0' + now.getHours()
            : now.getHours().toString();
          const minutes: string = now.getMinutes() < 10
            ? '0' + now.getMinutes()
            : now.getMinutes().toString();
          const seconds: string = now.getSeconds() < 10
            ? '0' + now.getSeconds()
            : now.getSeconds().toString();

          newActivity.innerHTML = `
            <div class="activity-indicator activity-normal"></div>
            <div class="activity-time">${hours}:${minutes}:${seconds}</div>
            <div class="activity-message">
                Alert marked as resolved: ${alertItem.querySelector('.alert-title')?.textContent}
            </div>
          `;

          activityList.insertBefore(newActivity, activityList.firstChild);
        }
      }
    });
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
      const target = event.currentTarget as HTMLElement;
      const activeBtn = document.querySelector('.filter-btn.active') as HTMLElement | null;
      if (activeBtn) {
        activeBtn.classList.remove('active');
      }
      target.classList.add('active');
      // …filter logic…
    });
  });
}, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Orbitron', 'Rajdhani', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
          background-color: #0c0c14;
          color : #ffffff;
          padding :20px;
          position :relative;
        }

        body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff00a0, #00fff9);
          z-index: 1000;
        }

        .container {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        position: relative;

        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #ff00a0;
          margin-bottom: 20px;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #00fff9;
          display: flex;
          align-items: center;
          gap: 10px;
          text-shadow: 0 0 10px rgba(0, 255, 249, 0.7);
          letter-spacing: 2px;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #0c0c14;
          border: 2px solid #00fff9;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 255, 249, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(0, 255, 249, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 255, 249, 0);
          }
        }

        .user-panel {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .system-time {
          font-size: 18px;
          font-family: 'Share Tech Mono', monospace;
          display: flex;
          align-content: end;
          text-align: right;
          flex-direction: column;
          align-items: flex-end;
          color: #00fff9;
        }

        .date {
          font-size: 14px;
          align-content: end;
          text-align: right;
          color: #ff00a0;
        }


        .status-overview {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .status-card {
          background-color: #151528;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 255, 249, 0.1);
          position: relative;
          overflow: hidden;
          border: 1px solid #272742;
        }

        .status-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00fff9, transparent);
        }

        .status-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
        }

        .status-normal::before {
          background-color: #00fff9;
        }

        .status-warning::before {
          background-color: #ffde03;
        }

        .status-alert::before {
          background-color: #ff00a0;
        }

        .status-critical::before {
          background-color: #d400ff;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .status-title {
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .status-indicator {
          padding: 4px 12px;
          border-radius: 2px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .indicator-normal {
          background-color: rgba(0, 255, 249, 0.2);
          color: #00fff9;
          border-left: 2px solid #00fff9;
        }

        .indicator-warning {
          background-color: rgba(255, 222, 3, 0.2);
          color: #ffde03;
          border-left: 2px solid #ffde03;
        }

        .indicator-alert {
          background-color: rgba(255, 0, 160, 0.2);
          color: #ff00a0;
          border-left: 2px solid #ff00a0;
        }

        .indicator-critical {
          background-color: rgba(212, 0, 255, 0.2);
          color: #d400ff;
          border-left: 2px solid #d400ff;
        }

        .status-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .status-value {
          font-size: 28px;
          font-weight: bold;
          font-family: 'Share Tech Mono', monospace;
        }

        .status-desc {
          color: #8e8eaa;
          font-size: 14px;
        }

        .main-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
        }

        .alerts-panel {
          background-color: #151528;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          border: 1px solid #272742;
          position: relative;
          overflow: hidden;
        }

        .alerts-panel::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 40%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ff00a0);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #272742;
        }

        .panel-title {
          font-size: 18px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #00fff9;
        }

        .badge {
  width: fit-content;
  padding: 6px 12px;
          font-size: 14px;
          background-color: #ff00a0;
          color: white;
        }

        .filter-controls {
          display: flex;
          gap: 10px;
        }

        .filter-btn {
          padding: 6px 12px;
          background-color: #1c1c35;
          border: 1px solid #272742;
          border-radius: 2px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .filter-btn:hover {
          background-color: #272742;
          border-color: #00fff9;
          box-shadow: 0 0 10px rgba(0, 255, 249, 0.5);
        }

        .filter-btn.active {
          background-color: #1c1c35;
          border-color: #ff00a0;
          color: #ff00a0;
          box-shadow: 0 0 10px rgba(255, 0, 160, 0.5);
        }

        .alert-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow-y: auto;
          padding-right: 10px;
        }

        .alert-item {
          background-color: #1c1c35;
          border-radius: 3px;
          padding: 15px;
          display: flex;
          gap: 15px;
          position: relative;
          border: 1px solid #272742;
        }

        .alert-warning {
          border-left: 4px solid #ffde03;
        }

        .alert-critical {
          border-left: 4px solid #ff00a0;
          animation: cyberpunkGlow 2s infinite alternate;
        }

        @keyframes cyberpunkGlow {
          from {
            box-shadow: 0 0 5px rgba(255, 0, 160, 0.3);
          }
          to {
            box-shadow: 0 0 15px rgba(255, 0, 160, 0.7);
          }
        }

        .alert-icon {
          width: 40px;
          height: 40px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .icon-warning {
          background-color: rgba(255, 222, 3, 0.1);
          color: #ffde03;
          border: 1px solid rgba(255, 222, 3, 0.3);
        }

        .icon-critical {
          background-color: rgba(255, 0, 160, 0.1);
          color: #ff00a0;
          border: 1px solid rgba(255, 0, 160, 0.3);
        }

        .alert-content {
          flex: 1;
        }

        .alert-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }

        .alert-title {
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .alert-time {
          color: #8e8eaa;
          font-size: 14px;
          font-family: 'Share Tech Mono', monospace;
        }

        .alert-desc {
          color: #ddd;
          margin-bottom: 10px;
        }

        .alert-actions {
          display: flex;
          gap: 10px;
        }

        .alert-btn {
          padding: 5px 10px;
          border-radius: 2px;
          border: none;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .resolve-btn {
          background-color: #1c1c35;
          color: #fff;
          border: 1px solid #00fff9;
        }

        .resolve-btn:hover {
          background-color: #00fff9;
          color: #0c0c14;
          box-shadow: 0 0 10px rgba(0, 255, 249, 0.7);
        }

        .details-btn {
          background-color: transparent;
          border: 1px solid #ff00a0;
          color: #ff00a0;
        }

        .details-btn:hover {
          background-color: rgba(255, 0, 160, 0.1);
          box-shadow: 0 0 10px rgba(255, 0, 160, 0.5);
        }

        .activity-panel {
          background-color: #151528;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          border: 1px solid #272742;
          position: relative;
          overflow: hidden;
        }

        .activity-panel::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 1px;
          background: linear-gradient(90deg, #00fff9, transparent);
        }

        .activity-list {
          flex: 1;
          overflow-y: auto;
          padding-right: 10px;
        }

        .activity-item {
          display: flex;
          gap: 15px;
          padding: 12px 0;
          border-bottom: 1px solid #272742;
        }

        .activity-indicator {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          margin-top: 5px;
          animation: blink 3s infinite alternate;
        }

        .activity-normal {
          background-color: #00fff9;
          box-shadow: 0 0 10px rgba(0, 255, 249, 0.7);
        }

        .activity-warning {
          background-color: #ffde03;
          box-shadow: 0 0 10px rgba(255, 222, 3, 0.7);
        }

        .activity-critical {
          background-color: #ff00a0;
          box-shadow: 0 0 10px rgba(255, 0, 160, 0.7);
        }

        .activity-time {
          color: #8e8eaa;
          font-size: 12px;
          width: 60px;
          text-align: right;
          margin-top: 2px;
          font-family: 'Share Tech Mono', monospace;
        }

        .activity-message {
          flex: 1;
        }

        .system-alerts {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }

        .system-alert {
          background-color: #151528;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          border: 1px solid #272742;
          position: relative;
          overflow: hidden;
        }

        .system-alert::before {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 30%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff00a0);
        }

        .system-alert-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .system-alert-title {
          font-size: 18px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #00fff9;
        }

        .system-alert-icon {
          font-size: 18px;
          color: #ff00a0;
          animation: cyberpunkBlink 1s infinite;
        }

        @keyframes cyberpunkBlink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .system-alert-area {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .system-alert-card {
          background-color: #1c1c35;
          border-radius: 3px;
          padding: 15px;
          position: relative;
          overflow: hidden;
          border: 1px solid #272742;
        }

        .system-alert-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
        }

        .system-warning::before {
          background-color: #ffde03;
        }

        .system-critical::before {
          background-color: #ff00a0;
        }

        .system-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .system-card-title {
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .system-card-status {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 2px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .status-warning {
          background-color: rgba(255, 222, 3, 0.2);
          color: #ffde03;
          border-left: 2px solid #ffde03;
        }

        .status-critical {
          background-color: rgba(255, 0, 160, 0.2);
          color: #ff00a0;
          border-left: 2px solid #ff00a0;
        }

        .system-card-desc {
          color: #ddd;
          margin-bottom: 10px;
        }

        .system-card-footer {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #8e8eaa;
          font-family: 'Share Tech Mono', monospace;
        }

        .progress-bar {
          height: 6px;
          background-color: #1c1c35;
          border-radius: 0;
          overflow: hidden;
          margin: 10px 0;
          position: relative;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.05) 10px,
            rgba(255, 255, 255, 0.05) 12px
          );
        }

        .progress-fill {
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, #00fff9, #ff00a0);
          position: relative;
          z-index: 1;
          transition: width 0.5s ease;
        }

        /* Add these font imports at the top of your CSS file */
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');

        /* Additional cyberpunk elements */
        .neon-text {
          color: #00fff9;
          text-shadow: 0 0 5px rgba(0, 255, 249, 0.7), 0 0 10px rgba(0, 255, 249, 0.5);
        }

        .neon-text-pink {
          color: #ff00a0;
          text-shadow: 0 0 5px rgba(255, 0, 160, 0.7), 0 0 10px rgba(255, 0, 160, 0.5);
        }

        .glitch {
          position: relative;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }

        .glitch::before {
          color: #ff00a0;
          z-index: -1;
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }

        .glitch::after {
          color: #00fff9;
          z-index: -2;
          animation: glitch-anim2 3s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-anim2 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(2px, -2px);
          }
          40% {
            transform: translate(2px, 2px);
          }
          60% {
            transform: translate(-2px, -2px);
          }
          80% {
            transform: translate(-2px, 2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .cyberpunk-grid-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:
            linear-gradient(rgba(12, 12, 20, 0.97), rgba(12, 12, 20, 0.97)),
            repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 255, 249, 0.03) 1px, rgba(0, 255, 249, 0.03) 2px),
            repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0, 255, 249, 0.03) 1px, rgba(0, 255, 249, 0.03) 2px);
          pointer-events: none;
          z-index: -1;
        }

        .scan-line {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom,
            transparent,
            transparent 50%,
            rgba(0, 255, 249, 0.02) 50%,
            rgba(0, 255, 249, 0.02));
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 999;
          opacity: 0.2;
        }

        /* Next button styling */
        .next-btn {
          background-color: transparent;
          color: #00fff9;
          border: 1px solid #00fff9;
          padding: 8px 20px;
          font-family: 'Orbitron', sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }

        .next-btn:hover {
          background-color: rgba(0, 255, 249, 0.1);
          box-shadow: 0 0 15px rgba(0, 255, 249, 0.5);
        }

        .next-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00fff9, transparent);
          animation: scan-line 2s linear infinite;
        }

        @keyframes scan-line {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* Keyboard shortcuts section */
        .keyboard-shortcuts {
          color: #ff00a0;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-family: 'Orbitron', sans-serif;
          font-weight: bold;
          font-size: 20px;
          position: relative;
          margin-top: 30px;
          padding-bottom: 5px;
          text-shadow: 0 0 10px rgba(255, 0, 160, 0.5);
        }

        .keyboard-shortcuts::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, #ff00a0, transparent);
        }
      `}</style>

      <div className="container">
        <header>
                                                                          <button className="user-avatar" onClick={() => navigate('/home')}>&larr;</button>
          <div className="logo">
            <div className="logo-icon">!</div>
            <span>Alert Center</span>
          </div>
          <div className="user-panel">
            <div className="system-time">
              <div id="time"></div>
              <div className="date">April 11, 2025</div>
            </div>
          </div>
        </header>

        <div className="status-overview">
          <div className="status-card status-normal">
            <div className="status-header">
              <div className="status-title">System Status</div>
              <div className="status-indicator indicator-normal">Normal</div>
            </div>
            <div className="status-details">
              <div className="status-value">93%</div>
              <div className="status-desc">All systems operational</div>
            </div>
          </div>

          <div className="status-card status-warning">
            <div className="status-header">
              <div className="status-title">Connectivity</div>
              <div className="status-indicator indicator-warning">Warning</div>
            </div>
            <div className="status-details">
              <div className="status-value">78%</div>
              <div className="status-desc">Intermittent connectivity issues</div>
            </div>
          </div>

          <div className="status-card status-alert">
            <div className="status-header">
              <div className="status-title">Active Alerts</div>
              <div className="status-indicator indicator-alert">Alert</div>
            </div>
            <div className="status-details">
              <div className="status-value">3</div>
              <div className="status-desc">Critical issues require attention</div>
            </div>
          </div>

          <div className="status-card status-critical">
            <div className="status-header">
              <div className="status-title">Security</div>
              <div className="status-indicator indicator-critical">Critical</div>
            </div>
            <div className="status-details">
              <div className="status-value">1</div>
              <div className="status-desc">Security breach detected</div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="alerts-panel">
            <div className="panel-header">
              <div className="panel-title">
                Current Alerts
                <span className="badge">3</span>
              </div>
              <div className="filter-controls">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Critical</button>
                <button className="filter-btn">Warning</button>
                <button className="filter-btn">Resolved</button>
              </div>
            </div>

            <div className="alert-list">
              <div className="alert-item alert-critical">
                <div className="alert-icon icon-critical">!</div>
                <div className="alert-content">
                  <div className="alert-header">
                    <div className="alert-title">Security Breach Detected</div>
                    <div className="alert-time">12:30:45</div>
                  </div>
                  <div className="alert-desc">
                    Unauthorized access attempt detected in the primary security system. Multiple failed login attempts from unknown IP.
                  </div>
                  <div className="alert-actions">
                    <button className="alert-btn resolve-btn">Resolve</button>
                    <button className="alert-btn details-btn">Details</button>
                  </div>
                </div>
              </div>

              <div className="alert-item alert-critical">
                <div className="alert-icon icon-critical">!</div>
                <div className="alert-content">
                  <div className="alert-header">
                    <div className="alert-title">Engine Temperature Exceeds Threshold</div>
                    <div className="alert-time">12:15:22</div>
                  </div>
                  <div className="alert-desc">
                    Main engine temperature has exceeded critical threshold (120°C). Automatic cooling system engaged but response is slow.
                  </div>
                  <div className="alert-actions">
                    <button className="alert-btn resolve-btn">Resolve</button>
                    <button className="alert-btn details-btn">Details</button>
                  </div>
                </div>
              </div>

              <div className="alert-item alert-warning">
                <div className="alert-icon icon-warning">⚠️</div>
                <div className="alert-content">
                  <div className="alert-header">
                    <div className="alert-title">Connectivity Issues</div>
                    <div className="alert-time">11:42:10</div>
                  </div>
                  <div className="alert-desc">
                    Intermittent connectivity issues detected with satellite uplink. Signal strength fluctuations observed.
                  </div>
                  <div className="alert-actions">
                    <button className="alert-btn resolve-btn">Resolve</button>
                    <button className="alert-btn details-btn">Details</button>
                  </div>
                </div>
              </div>

              <div className="alert-item alert-warning">
                <div className="alert-icon icon-warning">⚠️</div>
                <div className="alert-content">
                  <div className="alert-header">
                    <div className="alert-title">Low Fuel Warning</div>
                    <div className="alert-time">10:23:45</div>
                  </div>
                  <div className="alert-desc">
                    Fuel level below 25%. Estimated remaining operation time: 4 hours, 12 minutes.
                  </div>
                  <div className="alert-actions">
                    <button className="alert-btn resolve-btn">Resolve</button>
                    <button className="alert-btn details-btn">Details</button>
                  </div>
                </div>
              </div>

              <div className="alert-item alert-warning">
                <div className="alert-icon icon-warning">⚠️</div>
                <div className="alert-content">
                  <div className="alert-header">
                    <div className="alert-title">System Update Required</div>
                    <div className="alert-time">09:15:30</div>
                  </div>
                  <div className="alert-desc">
                    Critical security update available. System performance may be affected until update is applied.
                  </div>
                  <div className="alert-actions">
                    <button className="alert-btn resolve-btn">Resolve</button>
                    <button className="alert-btn details-btn">Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="activity-panel">
            <div className="panel-header">
              <div className="panel-title">System Activity</div>
            </div>

            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-indicator activity-critical"></div>
                <div className="activity-time">12:30:45</div>
                <div className="activity-message">
                  Security breach detected: Multiple failed login attempts
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-indicator activity-critical"></div>
                <div className="activity-time">12:15:22</div>
                <div className="activity-message">
                  Engine temperature critical: 120°C (Threshold: 110°C)
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-indicator activity-warning"></div>
                <div className="activity-time">12:10:33</div>
                <div className="activity-message">
                  Automatic cooling system engaged
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-indicator activity-warning"></div>
                <div className="activity-time">11:42:10</div>
                <div className="activity-message">
                  Satellite connection unstable: Signal fluctuating
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-indicator activity-normal"></div>
                <div className="activity-time">11:30:00</div>
                <div className="activity-message">
                  Routine system scan completed: No threats detected
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-indicator activity-warning"></div>
                <div className="activity-time">10:23:45</div>
                <div className="activity-message">
                  Fuel level warning: Below 25% threshold
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-indicator activity-normal"></div>
                <div className="activity-time">10:15:12</div>
                <div className="activity-message">
                  Navigation update: Route optimized for efficiency
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-indicator activity-normal"></div>
                <div className="activity-time">10:02:30</div>
                <div className="activity-message">
                  User authenticated: John Doe (Administrator)
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-indicator activity-warning"></div>
                <div className="activity-time">09:15:30</div>
                <div className="activity-message">
                  Update notification: Critical security patch available
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-indicator activity-normal"></div>
                <div className="activity-time">09:00:00</div>
                <div className="activity-message">
                  Daily system diagnostic initiated
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-indicator activity-normal"></div>
                <div className="activity-time">08:45:22</div>
                <div className="activity-message">
                  Backup completed: All systems data archived
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="system-alerts">
          <div className="system-alert">
            <div className="system-alert-header">
              <div className="system-alert-title">
                <span className="system-alert-icon">⚠️</span>
                Critical Systems Status
              </div>
            </div>

            <div className="system-alert-area">
              <div className="system-alert-card system-critical">
                <div className="system-card-header">
                  <div className="system-card-title">Security System</div>
                  <div className="system-card-status status-critical">Critical</div>
                </div>
                <div className="system-card-desc">
                  Multiple unauthorized access attempts detected. System firewalls holding but under sustained attack.
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '35%', backgroundColor: '#ff3636' }}></div>
                </div>
                <div className="system-card-footer">
                  <span>Containment: 35%</span>
                  <span>Time detected: 23 min ago</span>
                </div>
              </div>

              <div className="system-alert-card system-critical">
                <div className="system-card-header">
                  <div className="system-card-title">Engine Cooling</div>
                  <div className="system-card-status status-critical">Critical</div>
                </div>
                <div className="system-card-desc">
                  Main engine temperature exceeding operational limits. Automatic cooling system operating at maximum capacity.
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '60%', backgroundColor: '#ff3636' }}></div>
                </div>
                <div className="system-card-footer">
                  <span>Temperature reduction: 60%</span>
                  <span>Time detected: 27 min ago</span>
                </div>
              </div>

              <div className="system-alert-card system-warning">
                <div className="system-card-header">
                  <div className="system-card-title">Connectivity</div>
                  <div className="system-card-status status-warning">Warning</div>
                </div>
                <div className="system-card-desc">
                  Satellite uplink experiencing intermittent issues. Communication may be affected during operations.
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '78%', backgroundColor: '#ff9800' }}></div>
                </div>
                <div className="system-card-footer">
                  <span>Signal strength: 78%</span>
                  <span>Time detected: 60 min ago</span>
                </div>
              </div>

              <div className="system-alert-card system-warning">
                <div className="system-card-header">
                  <div className="system-card-title">Fuel System</div>
                  <div className="system-card-status status-warning">Warning</div>
                </div>
                <div className="system-card-desc">
                  Fuel levels below recommended threshold. Refueling required within operational period.
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '22%', backgroundColor: '#ff9800' }}></div>
                </div>
                <div className="system-card-footer">
                  <span>Remaining fuel: 22%</span>
                  <span>Time detected: 128 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cyberpunk-grid-overlay"></div>
      <div className="scan-line"></div>
    </>
  );
};

export default AlertStatusScreen;
