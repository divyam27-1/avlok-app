import React, { useState } from 'react'
import Webcam from '../components/Webcam'
import MapFeedSwitchButton from '../components/MapFeedSwitchButton'
import DroneInfo from '../components/DroneInfo'
import DroneInformationSidebar from '../components/DroneInformationSidebar'

const CameraFeed = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className='relative'>
        <MapFeedSwitchButton></MapFeedSwitchButton>
        <DroneInfo onOpen={() => setIsSidebarOpen(true)}></DroneInfo>
        <DroneInformationSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}></DroneInformationSidebar>
        <Webcam></Webcam>
    </div>
  )
}

export default CameraFeed