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
    <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-white"
        >
          ×
        </button>
    <div className='p-6'>

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