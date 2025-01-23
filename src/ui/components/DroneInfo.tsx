import React from 'react'

interface Props {
  onOpen: () => void,
}

const DroneInfo = ({onOpen} : Props) => {
  return (
      <button type='button' className='absolute z-10 rounded-3xl btn bg-white hover:bg-gray-200 focus:ring-black top-20 right-20 !outline-none border-none focus:ring-0'
      onClick={onOpen}
      >
      <img src="src/ui/assets/droneIcon.png" alt="" width={60}/>
    </button>
  )
}

export default DroneInfo