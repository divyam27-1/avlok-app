import React from 'react'
import Webcam from '../components/Webcam'
import MapFeedSwitchButton from '../components/MapFeedSwitchButton'
import DroneInfo from '../components/DroneInfo'

const CameraFeed = () => {
  return (
    <div className='relative'>
        <MapFeedSwitchButton></MapFeedSwitchButton>
        <DroneInfo></DroneInfo>
        <Webcam></Webcam>
    </div>
  )
}

export default CameraFeed