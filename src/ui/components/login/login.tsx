// src/components/Login.jsx
import './Login.css';

export default function Login() {
  return (
    <div className="background-container">
      {/* Logo */}
      <img src="src/ui/assets/iittplogo.jpg" alt="IIT Tirupati Logo" className="logo" />
      <img src="src/ui/assets/lg.svg" alt="IIT Tirupati Logo 2" className="logo2" />

      {/* Login Card */}
      <div className="login-card">
        <h1 className="title">IIT TIRUPATI</h1>

        <button className="login-button">ADMIN LOGIN</button>
        <button className="login-button">SECURITY LOGIN</button>

        <p className="signup-text">Don’t have an account at?</p>
        <button className="signup-button">Sign up</button>
      </div>
    </div>
  );
}
