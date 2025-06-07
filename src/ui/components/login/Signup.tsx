import React from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  return (
    <div className="signup-page-container">
      {/* Logos */}
      <img src="src/ui/assets/iittplogo.jpg" alt="IIT Tirupati Logo" className="logo" />
      <img src="src/ui/assets/lg.svg" alt="IIT Tirupati Logo" className="logo2" />

      <div className="login-container">
        <h2>Create Account</h2>
        <div className="form-group">
        <img src="src/ui/assets/user.svg" alt="Password" className="w-5 h-5 ml-4  mr-4" />
          <input type="text" placeholder="Name" required />
        </div>
        <div className="form-group">
      <img src="src/ui/assets/envelope.svg" alt="Password" className="w-5 h-5 ml-4 mr-4" />
          <input type="email" placeholder="Email" required />
        </div>
        <div className="form-group">
                    <img src="src/ui/assets/lock.svg" alt="Password" className="w-5 h-5 ml-4  mr-4" />
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
