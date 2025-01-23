import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import CameraFeed from './pages/CameraFeed';
import MapFeed from './pages/MapFeed';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<CameraFeed></CameraFeed>}></Route>
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