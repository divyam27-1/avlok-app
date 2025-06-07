import React from 'react';
import './signup.css';

function Signup() {
  return (
    <div className="signup-page-container">
      {/* Logos */}
      <img src="src/ui/assets/iittplogo.jpg" alt="IIT Tirupati Logo" className="logo" />
      <img src="src/ui/assets/lg.svg" alt="IIT Tirupati Logo" className="logo2" />

      <div className="login-container">
        <h2>Create Account</h2>

        <div className="form-group">
          <img src="src/ui/assets/icons/user.svg" height="22" width="20" className="minilogo" />
          <input type="text" placeholder="Name" required />
        </div>

        <div className="form-group">
          <img src="src/ui/assets/icons/envelope.svg" height="22" width="20" className="minilogo" />
          <input type="email" placeholder="Email" required />
        </div>

        <div className="form-group">
          <img src="src/ui/assets/icons/lock.svg" height="22" width="20" className="minilogo" />
          <input type="password" placeholder="Password" required />
        </div>

        <div className="account-login">
          <p>Already have an account?</p>
          <button className="verify-button">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
