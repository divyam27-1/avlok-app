import React from 'react'
import CampusMap from '../components/CampusMap'
import CameraFeedSwitchButton from '../components/CameraFeedSwitchButton'
import DroneInfo from '../components/DroneInfo'

const MapFeed = () => {
  return (
    <div className='relative'>
        <CameraFeedSwitchButton></CameraFeedSwitchButton>
        <DroneInfo></DroneInfo>
        <CampusMap></CampusMap>
    </div>
  )
}

export default MapFeed