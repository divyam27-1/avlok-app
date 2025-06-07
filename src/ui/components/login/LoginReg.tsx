// src/components/Login.jsx
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
  return (
    <div className="background-container">
      <img src="src/ui/assets/iittplogo.jpg" alt="IIT Tirupati Logo" className="logo" />
      <img src="src/ui/assets/lg.svg" alt="IIT Tirupati Logo 2" className="logo2" />

      <div className="login-card">
        <h1 className="title">IIT TIRUPATI</h1>

        <button className="login-button"  onClick={() => navigate('/loginReg')}>ADMIN LOGIN </button>
        <button className="login-button" onClick={() => navigate('/loginReg')}>SECURITY LOGIN</button>

        <p className="signup-text">Don’t have an account at?</p>
        <button className="signup-button">Sign up</button>
      </div>
    </div>
  );
}
