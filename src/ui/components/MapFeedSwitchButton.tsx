import React from 'react'
import { useNavigate } from 'react-router-dom'

const MapFeedSwitchButton = () => {
  const navigate = useNavigate();
  return (
      <button type='button' className='absolute z-10 rounded-3xl btn bg-white hover:bg-gray-200 focus:ring-black top-20 left-20 !outline-none border-none focus:ring-0' onClick={function () {
        navigate('/map');
      }}>
      <img src="src/ui/assets/locationIcon.png" alt="" width={60}/>
    </button>
  )
}

export default MapFeedSwitchButton