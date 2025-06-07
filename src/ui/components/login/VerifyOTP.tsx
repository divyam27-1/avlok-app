import React from 'react';
import './otp.css';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
  return (
    <div className="otp-page-container">
      {/* Logos */}
      <img src="src/ui/assets/iittplogo.jpg" alt="IIT Tirupati Logo" className="logo" />
      <img src="src/ui/assets/lg.svg" alt="IIT Tirupati Logo" className="logo2" />

      <div className="otp-container">
        <h2>VERIFY OTP</h2>
        <p>Enter the OTP sent to your Email</p>

        <div className="form-group">
          <img src="src/ui/assets/lock.svg" alt="OTP" className="w-5 h-5 ml-4 mr-4" />
          <input type="text" placeholder="Enter OTP" required />
        </div>
        <button className="verify-button">Verify</button>
      </div>
    </div>
  );
}

export default VerifyOtp;
