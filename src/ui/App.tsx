import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import CameraFeed from './pages/CameraFeed';
import MapFeed from './pages/MapFeed';
import Login from './components/login/login';
import LoginReg from './components/login/LoginReg';
import VerifyOtp from './components/login/VerifyOTP';
import SetPassword from './components/login/SetPassword';
import Signup from './components/login/Signup';
import DroneControlInterface from './components/drone/dronecontrol';
import AuthorityControlPanel from './components/drone/AuthorityControl';
import AlertStatusScreen from './components/drone/alert';
import TelemetryDashboard from './components/drone/telemetry';
import MapNavigationView from './components/drone/MapNav';
function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/mapnav" element={< MapNavigationView/>}/>
        <Route path="/telemetry" element={<TelemetryDashboard/>}/>
      <Route path="/alert" element={<AlertStatusScreen/>}/>
      <Route path="/authority" element={<AuthorityControlPanel/>}/>
      <Route path="/dronecontrol" element={<DroneControlInterface />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/setpassword" element={<SetPassword />} />
      <Route path="/verifyOtp" element={<VerifyOtp />} />
      <Route path="/loginReg" element={<LoginReg />} />
      <Route path='/camera' element={<CameraFeed></CameraFeed>}></Route>
      <Route path='/map' element={<MapFeed></MapFeed>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;

// TODO: Add Routing Feature (Done)
// TODO: Add Drone Information Feature
// TODO: Add path and point feature using leaflet
// TODO: Add Zoom Limit in Open Street API Map (if possible)