import React, { useState } from 'react'
import CampusMap from '../components/CampusMap'
import CameraFeedSwitchButton from '../components/CameraFeedSwitchButton'
import DroneInfo from '../components/DroneInfo'
import DroneInformationSidebar from '../components/DroneInformationSidebar'

const MapFeed = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className='relative'>
        <CameraFeedSwitchButton></CameraFeedSwitchButton>
        <DroneInfo onOpen={() => setIsSidebarOpen(true)}></DroneInfo>
        <DroneInformationSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}></DroneInformationSidebar>
        <CampusMap></CampusMap>
    </div>
  )
}

export default MapFeed