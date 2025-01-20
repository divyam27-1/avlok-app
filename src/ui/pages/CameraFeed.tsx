import React from 'react'
import Webcam from '../components/Webcam'
import MapFeedSwitchButton from '../components/MapFeedSwitchButton'

const CameraFeed = () => {
  return (
    <div className='relative'>
        <MapFeedSwitchButton></MapFeedSwitchButton>
        <Webcam></Webcam>
    </div>
  )
}

export default CameraFeed