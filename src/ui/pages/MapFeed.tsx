import React, { useState } from 'react'
import CampusMap from '../components/CampusMap'
import CameraFeedSwitchButton from '../components/CameraFeedSwitchButton'
import DroneInfo from '../components/DroneInfo'
import DroneInformationSidebar from '../components/DroneInformationSidebar'

const MapFeed = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dronePosition, setDronePosition] = useState<L.LatLng | null>(null);
  const [droneAltitude, setDroneAltitude] = useState<number>(0); // Optional altitude
  const [droneTargetNode, setDroneTargetNode] = useState<string | null>(null);

  return (
    <div className='relative'>
        <CameraFeedSwitchButton></CameraFeedSwitchButton>
        <DroneInfo onOpen={() => setIsSidebarOpen(true)}></DroneInfo>
        <DroneInformationSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} latitude={dronePosition?.lat || 0}  longitude={dronePosition?.lng || 0} altitude={20} otherParam1={50} otherParam2={75}/>
        <CampusMap dronePosition={dronePosition} setDronePosition={setDronePosition} setDroneAltitude={setDroneAltitude} setDroneTargetNode={setDroneTargetNode}/>
    </div>
  )
}

export default MapFeed