import React from 'react';
import './LoginReg.css'; // Keep your CSS as is

function LoginReg() {
  return (
    <div className="page-container">
      {/* Logos */}
      <img src="src/ui/assets/iittplogo.jpg" alt="IIT Tirupati Logo" className="logo" />
      <img src="src/ui/assets/lg.svg" alt="IIT Tirupati Logo" className="logo2" />

      {/* Login Card */}
      <div className="login-container login-card">
        <h2 className="title">LOGIN</h2>

        <div className="form-group">
          <img src="/icons/envelope.svg" height="22" width="20" className="minilogo" />
          <input type="text" placeholder="Email / Phone Number" required />
        </div>

        <div className="form-group">
          <img src="/icons/lock.svg" height="22" width="20" className="minilogo" />
          <input type="password" placeholder="Password" required />
        </div>

        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>

        <button className="login-button">Login</button>

        <div className="signup-text">Don't have an account?</div>
        <button className="signup-button">Sign Up</button>
      </div>
    </div>
  );
}

export default LoginReg;
