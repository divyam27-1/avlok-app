import React from 'react';
import './setpassword.css';
import { useNavigate } from 'react-router-dom';

function SetPassword() {
    const navigate = useNavigate();
 const handleSubmit = () => {
    navigate('/loginReg'); 
  };

  return (
    <div className="setpass-page-container">
      {/* Logos */}
      <img src="src/ui/assets/iittplogo.jpg" alt="IIT Tirupati Logo" className="logo" />
      <img src="src/ui/assets/lg.svg" alt="IIT Tirupati Logo" className="logo2" />

      <div className="login-card">
        <h2 className="title">LOGIN</h2>

        <div className="form-group">
                                                  <img src="src/ui/assets/lock.svg" alt="Password" className="w-5 h-5 ml-4  mr-4" />

          <input type="text" placeholder="New Password" required />
        </div>

        <div className="form-group">
                                                  <img src="src/ui/assets/check.svg" alt="Password" className="w-5 h-5 ml-4  mr-4" />

          <input type="password" placeholder="Confirm Password" required />
        </div>

        <button className="login-button"  onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default SetPassword;
