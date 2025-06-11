
import './LoginReg.css'; // Keep your CSS as is
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function LoginReg() {
      const navigate = useNavigate();
        const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault(); // prevent default anchor behavior
  navigate('/setpassword');
};

  const handleLogin = () => {
    if (username === 'satishpati' && password === 'satish@123') {
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <div className="background-container">
      <img src="src/ui/assets/iittplogo.jpg" alt="IIT Tirupati Logo" className="logo" />
      <img src="src/ui/assets/lg.svg" alt="IIT Tirupati Logo" className="logo2" />

      <div className="login-container login-card">
        <h2 className="title">LOGIN</h2>
        <div className="form-group">
                  <img src="src/ui/assets/user.svg" alt="Password" className="w-5 h-5 ml-4  mr-4" />
<input
            type="text"
            placeholder="Email / Phone Number"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />        </div>
        <div className="form-group">
                <img src="src/ui/assets/envelope.svg" alt="Password" className="w-5 h-5 ml-4  mr-4" />
<input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />        </div>
        <div className="forgot-password">
          <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
        </div>
        <button className="login-button"  onClick={handleLogin}>Login</button>
        <div className="signup-text">Don't have an account?</div>
        <button className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}
export default LoginReg;
