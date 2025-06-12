import React from 'react';
import './authority.css';
import { Link, useNavigate } from 'react-router-dom';
const AuthorityControlPanel = () => {
    const navigate = useNavigate()
     
   return (
       
  
    <div className="container">
        <header>
                                                                <button className="user-avatar" onClick={() => navigate('/home')}>&larr;</button>

            <div className="logo">Control Panel</div>
            <div className="user-panel">
                <div className="auth-level">Level 3 Authority</div>
                <div className="avatar">SA</div>
            </div>
        </header>
        <div className="main-content">
            <div className="sidebar">
                <div className="nav-title">Main Navigation</div>
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i>📊</i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link active">
                            <i>🔒</i>
                            <span>Authority Controls</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i>👥</i>
                            <span>User Management</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i>🔧</i>
                            <span>System Controls</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i>📝</i>
                            <span>Logs & Reports</span>
                        </a>
                    </li>
                </ul>

                <div className="nav-title" style={{ marginTop: '30px' }}>System Access</div>
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i>🚀</i>
                            <span>Operations</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i>📡</i>
                            <span>Communications</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i>🛠️</i>
                            <span>Maintenance</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i>⚙️</i>
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="content">
                <div className="section">
                    <div className="section-header">
                        <div className="section-title">Authority Level Management</div>
                        <button className="action-btn primary">+ Add New Rule</button>
                    </div>

                    <div className="access-grid">
                        <div className="access-card">
                            <div className="access-header">
                                <div className="access-title">System Diagnostics</div>
                                <label className="access-toggle">
                                    <input type="checkbox" defaultChecked />
                                    <span className="access-slider"></span>
                                </label>
                            </div>
                            <div className="access-desc">Access to system diagnostic tools and reports</div>
                            <div className="auth-detail">
                                <span>Required Authority:</span>
                                <span className="auth-level-indicator level-1">Level 1</span>
                            </div>
                        </div>

                        <div className="access-card">
                            <div className="access-header">
                                <div className="access-title">Navigation Control</div>
                                <label className="access-toggle">
                                    <input type="checkbox" defaultChecked />
                                    <span className="access-slider"></span>
                                </label>
                            </div>
                            <div className="access-desc">Ability to set and modify navigation parameters</div>
                            <div className="auth-detail">
                                <span>Required Authority:</span>
                                <span className="auth-level-indicator level-2">Level 2</span>
                            </div>
                        </div>

                        <div className="access-card">
                            <div className="access-header">
                                <div className="access-title">System Override</div>
                                <label className="access-toggle">
                                    <input type="checkbox" defaultChecked />
                                    <span className="access-slider"></span>
                                </label>
                            </div>
                            <div className="access-desc">Permission to override automated system decisions</div>
                            <div className="auth-detail">
                                <span>Required Authority:</span>
                                <span className="auth-level-indicator level-3">Level 3</span>
                            </div>
                        </div>

                        <div className="access-card">
                            <div className="access-header">
                                <div className="access-title">Data Export</div>
                                <label className="access-toggle">
                                    <input type="checkbox" defaultChecked />
                                    <span className="access-slider"></span>
                                </label>
                            </div>
                            <div className="access-desc">Permission to export system data and logs</div>
                            <div className="auth-detail">
                                <span>Required Authority:</span>
                                <span className="auth-level-indicator level-1">Level 1</span>
                            </div>
                        </div>

                        <div className="access-card">
                            <div className="access-header">
                                <div className="access-title">User Management</div>
                                <label className="access-toggle">
                                    <input type="checkbox" defaultChecked />
                                    <span className="access-slider"></span>
                                </label>
                            </div>
                            <div className="access-desc">Ability to add, remove and modify system users</div>
                            <div className="auth-detail">
                                <span>Required Authority:</span>
                                <span className="auth-level-indicator level-3">Level 3</span>
                            </div>
                        </div>

                        <div className="access-card">
                            <div className="access-header">
                                <div className="access-title">Emergency Protocols</div>
                                <label className="access-toggle">
                                    <input type="checkbox" defaultChecked />
                                    <span className="access-slider"></span>
                                </label>
                            </div>
                            <div className="access-desc">Access to emergency response systems</div>
                            <div className="auth-detail">
                                <span>Required Authority:</span>
                                <span className="auth-level-indicator level-2">Level 2</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <div className="section-header">
                        <div className="section-title">Authorized Personnel</div>
                        <button className="action-btn primary">+ Add User</button>
                    </div>

                    <table className="user-list">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Role</th>
                                <th>Authority Level</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="user-name">
                                        <div className="user-avatar">SP</div>
                                        <div>
                                            <div>Satish Pati</div>
                                            <div style={{ color: '#5f6368', fontSize: '13px' }}>Satish</div>
                                        </div>
                                    </div>
                                </td>
                                <td>—</td>
                                <td>—</td>
                                <td>—</td>
                                <td>
                                    <div className="action-col">
                                        <button className="action-btn primary">Edit</button>
                                        <button className="action-btn danger">Remove</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
     ) 
    };

export default AuthorityControlPanel;
