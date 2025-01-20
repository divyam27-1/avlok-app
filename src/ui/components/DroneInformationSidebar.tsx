import React from 'react'

interface Props {
    isOpen: boolean,
    onClose: () => void,
}

const DroneInformationSidebar = ({isOpen, onClose} : Props) => {
  return (
    <>
    <div
    className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform z-10 ${
      isOpen ? "translate-x-0" : "translate-x-full"
    } transition-transform duration-300`}
  >
    <h2 className='text-xl pt-6 font-bold px-2'>Drone Information</h2>
    <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ×
        </button>
    <div className='p-6'>
        <div className='py-3'>
            <h3 className='text-xl italic'>Latitude</h3>
        <p>45.3</p>
        </div>
        <div className='py-3'>
            <h3 className='text-xl italic'>Longitude</h3>
        <p>21.3</p>
        </div><div className='py-3'>
            <h3 className='text-xl italic'>Altitude</h3>
        <p>20.0</p>
        </div><div className='py-3'>
            <h3 className='text-xl italic'>Other Parameter 1</h3>
        <p>21.3</p>
        </div><div className='py-3'>
            <h3 className='text-xl italic'>Other Parameter 2</h3>
        <p>21.3</p>
        </div>
    </div>
    </div>
    {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
      )}
    </>
    
  )
}

export default DroneInformationSidebar