import React from 'react';
import './setpassword.css';

function SetPassword() {
  return (
    <div className="setpass-page-container">
      {/* Logos */}
      <img src="src/ui/assets/iittplogo.jpg" alt="IIT Tirupati Logo" className="logo" />
      <img src="src/ui/assets/lg.svg" alt="IIT Tirupati Logo" className="logo2" />

      <div className="login-card">
        <h2 className="title">LOGIN</h2>

        <div className="form-group">
          <img src="src/ui/assets/icons/lock.svg" className="minilogo" height="22" width="20" />
          <input type="text" placeholder="New Password" required />
        </div>

        <div className="form-group">
          <img src="src/ui/assets/icons/check.svg" className="minilogo" height="22" width="20" />
          <input type="password" placeholder="Confirm Password" required />
        </div>

        <button className="login-button">Submit</button>
      </div>
    </div>
  );
}

export default SetPassword;
